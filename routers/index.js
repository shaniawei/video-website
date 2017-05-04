var express=require("express");

var util=require("../methods/public");
var MovieModel=require("../models/movie");

var router=express.Router();

router.get("/",function(req,res){
   var user="";
   var title="喵喵视频--首页";
   if(req.session.user){
     user=req.session.user;
   }

   MovieModel.find({}).populate(["uploadUser"]).limit(10).sort("-uploadDate").exec(function(err,ms){
        var movies=ms||"";
        movies.forEach(function(movie){
           movie.formateDate=util.formateDate(movie.uploadDate);
        });
        res.render("index",{user:user,title:title,movies:movies});
   });
});

module.exports=router;