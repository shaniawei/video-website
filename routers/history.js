var express=require("express");
var HistoryModel=require("../models/history");

var router=express.Router();

//用户看了某一个片之后要保存他的浏览记录，以便给他推荐电影
router.post("/saveHistory",function(req,res){
    var userid=req.body.userid;
    var movieid=req.body.movieid;
    HistoryModel.findOne({userid:userid,movieid:movieid},function(err,h){
        if(err){
        	console.log(err.msg);
        	return;
        }
        if(h&&h._id){
           HistoryModel.update({_id:h._id},{$set:{watchDate:new Date()}},function(){
           	  res.json({});
           });
        }else{
           var history=new HistoryModel({userid:userid,movieid:movieid});
           history.save(function(){
           	  res.json({});
           });
        }
    });
});

module.exports=router;