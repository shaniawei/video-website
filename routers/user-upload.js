var express=require("express");
var UserModel=require("../models/user");
var MovieModel=require("../models/movie");
var util=require("../methods/public");

var router=express.Router();

//用户上传的电影信息
router.get("/authors/upload/:author_id",function(req,res){
    MovieModel.find({uploadUser:req.params.author_id}).sort("-uploadDate").populate(["uploadUser"]).exec(function(err,ms){
    	var visitedUser={};   //被访问的用户
    	var user="";
    	var title="";
    	if(req.session.user){
            user=req.session.user;
    	}
        if(ms.length<=0){
             //表示这个用户还没有上传过电影
             UserModel.findOne({_id:req.params.author_id},function(err,u){
             	visitedUser=u;
                if(user._id&&user._id.toString()==req.params.author_id){
            	     visitedUser.selfFlag="yes";
                }else{
            	     visitedUser.selfFlag="no";
                }
                title=visitedUser.username+"--用户中心";
                res.render("myUpload",{user:user,author:visitedUser,movies:ms,title:title});
             });
        }else{
            //表名此用户已经上传过电影了
            visitedUser=ms[0].uploadUser;
            ms.forEach(function(m){
                m.formateDate=util.formateDate(m.uploadDate);
            });
            if(user._id&&user._id.toString()==req.params.author_id){
            	visitedUser.selfFlag="yes";
            }else{
            	visitedUser.selfFlag="no";
            }
            title=visitedUser.username+"--用户中心";
            res.render("myUpload",{user:user,author:visitedUser,movies:ms,title:title});
        }
    });
});

//用户删除上传的电影信息
router.post("/uploadDelete",function(req,res){
    var movieid=req.body.movieid;
    MovieModel.remove({_id:movieid},function(err,m){
       if(err){
        res.json({status:"fail"});
       }else{
        res.json({status:"success"});
       }
    });
});



module.exports=router;