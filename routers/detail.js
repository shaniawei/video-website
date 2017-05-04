var express=require("express");

var util=require("../methods/public");
var MovieModel=require("../models/movie");

var router=express.Router();

router.get("/detail/:movie_id",function(req,res){
    MovieModel.findOne({_id:req.params.movie_id}).populate(["uploadUser"])
    .exec(function(err,movie){
    	//找出一些和这个电影关联的movies，然后显示在推荐列表，这里关联的定义在mark
        var visitedNum=movie.visitedNum+1;
        MovieModel.update({_id:req.params.movie_id},{$set:{visitedNum:visitedNum}},function(){
    	MovieModel.find({}).populate(["uploadUser"]).exec(function(err,ms){
        movie.visitedNum=visitedNum;
        var user="";
        if(req.session.user){
            user=req.session.user;
        }
    	var recommendMovie=[];
    	var mark=movie.mark;
        var title=movie.name;
        movie.formateDate=util.formateDate(movie.uploadDate);
        mark=mark.split(",");
        for(var i=0;i<ms.length;i++){
            for(var j=0;j<mark.length;j++){
                //console.log(typeof ms[i]._id);注意，
                //推荐视频中需要除去当前播放的视频，因此要比较键的值，
                //但是要注意键是Schema.Types.ObjectId是对象类型的，因此不能直接相等比较，
               if(ms[i]._id.toString()==movie._id.toString()){
                 break;    
               }
                if(ms[i].mark.indexOf(mark[j])>-1){
                    ms[i].formateDate=util.formateDate(ms[i].uploadDate);
                    recommendMovie.push(ms[i]);
                    break;
                }
            }
        }
        res.render("detail",{movie:movie,recommendMovie:recommendMovie,title:title,user:user});
       });
    });
  });
});

module.exports=router;