var express=require("express");
var HistoryModel=require("../models/history");
var UserModel=require("../models/user");
var util=require("../methods/public");

var router=express.Router();

//查询用户的播放记录
router.get("/authors/history/:author_id",function(req,res){
     HistoryModel.find({userid:req.params.author_id}).populate(["userid","movieid"]).exec(function(err,hm){
          //得到的hm结果是一个类数组
          var user=util.findCurrentUser(req);
          if(hm&&hm.length>0&&hm[0].movieid){
          hm.forEach(function(h){
              h.formateDate=util.formateDate(h.watchDate);
          });
          var visitedUser=hm[0].userid;
          util.addFlag(user,visitedUser);
          var title=visitedUser.username+"--用户中心";
          res.render("history",{user:user,author:visitedUser,historyMovie:hm,title:title});
       }else{
          //说明该用户还没有播放过
          UserModel.findOne({_id:req.params.author_id},function(err,u){
              util.addFlag(user,u);
              var title=u.username+"--用户中心";
              res.render("history",{user:user,author:u,historyMovie:[],title:title});
          });
       }
     });
});

module.exports=router