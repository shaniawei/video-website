var express=require("express");

var UserModel=require("../models/user.js");

var router=express.Router();

router.get("/loginorregister/:flag",function(req,res){
     if(req.params.flag==="login"){
     	res.render("loginorregister",{flag:1});
     }else{
     	res.render("loginorregister",{flag:0});
     }
});


router.post("/validateUsername",function(req,res){
	var username=req.body.val;
    UserModel.find({username:username},function(err,users){
        if(users&&users.length>0){
        	res.json({flag:1});   //表示存在该用户名
        }else{
        	res.json({flag:0});
        }
    });
});

router.post("/registerSuccess",function(req,res){
     var username=req.body.username;
     var password=req.body.password;
     var email=req.body.email;
     if(username&&password&&email){
     	var user=new UserModel({username:username,password:password,email:email});
     	user.save(function(err){
          if(err){
          	console.log("user save failed,at router.post(/registerSuccess)");
          }else{
          	res.render("loginorregister",{flag:1});
          }
     	});
     }else{
     	res.render("loginorregister",{flag:0});
     }
});

router.post("/loginSuccess",function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    UserModel.findOne({username:username,password:password},function(err,user){
       console.log(user);
       if(user){
       	 req.session.user=user;
       	 var title="喵喵视频--首页"
       	 res.redirect("/");
       }else{
       	 res.render("loginorregister",{flag:0});
       }
    });
});

module.exports=router;