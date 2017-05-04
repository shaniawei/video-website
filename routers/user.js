var express=require("express");
var UserModel=require("../models/user");
var MovieModel=require("../models/movie");
var HistoryModel=require("../models/history");
var util=require("../methods/public");

var router=express.Router();

//用户主页,根据用户的历史记录来推荐视频
router.get("/authors/:author_id",function(req,res){
    HistoryModel.find({userid:req.params.author_id}).populate(["movieid","userid"]).exec(function(err,us){
        var user=util.findCurrentUser(req);    
        var visitedUser="";
        var title="";  //就算在HistoryModel中找不到req.params.author_id，us也不为空，可能是用了populate的原因
        if(us&&us.length>0&&us[0].movieid){
            //表明该用户有播放的历史记录
            var str="";
            var strid="";
            var movies=[];
            us.forEach(function(temp){
               str+=temp.movieid.mark+",";
               strid=temp.movieid._id.toString()+",";
            });
            str=str.substring(0,str.length-1);
            str=str.split(",");
            MovieModel.find({}).limit(10).sort("-uploadDate").exec(function(err,mm){
                 for(var i=0;i<mm.length;i++){
                     for(var j=0;j<str.length;j++){
                        if(strid.indexOf(mm[i]._id.toString())>-1){
                           //说明这个视频用户已经看过
                           break;
                        }
                        if(mm[i]._id.toString().indexOf(str[j])>-1){
                            mm[i].formateDate=util.formateDate(mm[i].uploadDate);
                            movies.push(mm[i]);
                        }
                     }
                 }
                visitedUser=us[0].userid;
                util.addFlag(user,visitedUser);
                title=visitedUser.username+"--用户中心";
                res.render("user",{author:visitedUser,user:user,title:title,movies:movies});
            });
        }else{
            //无播放距离，推荐最新的视频给该用户
            MovieModel.find({}).limit(4).sort("-uploadDate").populate(["uploadUser"]).exec(function(err,ms){
                 ms.forEach(function(m){
                    m.formateDate=util.formateDate(m.uploadDate);
                    if(m.uploadUser._id.toString()==req.params.author_id){
                        visitedUser=m.uploadUser;
                    }
                 });
                 if(visitedUser){ 
                     util.addFlag(user,visitedUser);
                     title=visitedUser.username+"--用户中心"
                     res.render("user",{author:visitedUser,user:user,title:title,movies:ms});
                 }else{
                     UserModel.findOne({_id:req.params.author_id},function(err,u){
                          visitedUser=u;
                          util.addFlag(user,visitedUser);
                          title=visitedUser.username+"--用户中心";
                          res.render("user",{author:visitedUser,user:user,title:title,movies:ms});
                     });
                 }
            });
        }
    });
});

//修改个人资料
router.post("/author/fix",function(req,res){    
	var username=req.body.username;
	var obj={};
    for(var key in req.body){
    	if(key=="username"){continue;}
    	obj[key]=req.body[key];
    }
    UserModel.update({username:username},{$set:obj},function(err,doc){
        if(err){
        	res.redirect("/error");
        }else{
        	res.json({});
        }
    });
});

router.get("/mainpage",function(req,res){
    if(req.session.user){
        res.redirect("/authors/"+req.session.user._id);
    }else{
        res.redirect("/loginorregister/login");
    }
});

router.get("/exit",function(req,res){
    req.session.user="";  //退出只需要清除session就行了
    res.redirect("/");
});

router.post("/imgChange/authors/:author_id",function(req,res){
    util.dealMultipartFormData(req,"imgChange","authorImages",function(fields,files,newName){
          var img="";
          if(files["imgChange"].name.length>0){
             img="/authorImages/"+newName;
             UserModel.update({_id:req.params.author_id},{$set:{img:img}},function(err,doc){
                 res.json({imgPath:img});
             });
          }else{
            res.json({imgPath:img});
          }
    });
});
module.exports=router;