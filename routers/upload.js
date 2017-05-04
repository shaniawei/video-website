var express=require("express");
var formidable=require("formidable");
var fs=require("fs");
var util=require("../methods/public");

var MovieModel=require("../models/movie");

var router=express.Router();

router.get("/upload",function(req,res){
   var user=req.session.user;
   if(user){
   	 var title=user.username+"--上传";
     res.render("upload",{user:user,title:title});
   }else{
   	 res.render("loginorregister",{flag:1});  //跳转到登陆页面
   }
});

router.post("/uploading",function(req,res){
    var form=new formidable.IncomingForm();
    //console.log(__dirname); E:\jsnode\Blog\routers  
    var dir=__dirname;
    dir=dir.substring(0,dir.lastIndexOf("\\"));
    form.uploadDir=dir+"\\public\\"+"upload";
    form.keepExtensions=true;
    var newName;
    form.parse(req,function(err,fields,files){
        var oldPath=files["movie"].path;       //这里其实还可以优化，因为没有上传题图的时候，会产生一个0kb的文件
        var oldName=files["movie"].name;
        var date=new Date();
        var dateTime=date.getTime().toString();
        newName=oldName.substring(0,oldName.lastIndexOf("."))+dateTime+oldName.substr(oldName.lastIndexOf(".")); //重命名文件，在原来文件名的基础上加一个时间
        var newPath=oldPath.replace(oldPath.substr(oldPath.lastIndexOf("\\")+1),newName);
        fs.rename(oldPath,newPath,function(){
            //
        });
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log(bytesExpected+"mbj");
    	var percent=(bytesReceived/bytesExpected).toFixed(2);
        req.session.percent=percent;
        //console.log(1);
    	//res.json({percent:percent})；//在这里返回会导致重写header错误
        //注意：要监听end事件，等到上传结束时才进行返回操作，是为了避免重新写headers的错误：
    });
    form.on("end",function(){
        var movieSrc="/upload/"+newName;
         res.json({movieSrc:movieSrc});
    });
    form.on('aborted', function() {

    });
    form.on('error', function(err) {
    	
    });
});

router.post("/getProgress",function(req,res){
    var percent=req.session.percent||0;
    res.json({percent:percent});
});
//req,picName,pathname,callback
router.post("/saveMovieInfo",function(req,res){
    util.dealMultipartFormData(req,"uploadFile","videoImages",function(fields,files,newName){
         var movieName=fields.movieName;         
         var movieSrc=fields.movieSrc;
         var description=fields.description;
         var catagory=fields.catogory;
         var movieTags=fields.movieTags;
         var movieDuration=util.formateNumber(parseInt(fields.movieDuration));
         var titleSrc="";
         if(files["uploadFile"].name){
            titleSrc="/videoImages/"+newName;
         }
         var movie=new MovieModel({name:movieName,movieSrc:movieSrc,titleSrc:titleSrc,
            catagory:catagory,mark:movieTags,description:description,
            movieDuration:movieDuration,uploadUser:req.session.user._id});
         movie.save(function(err){
             console.log("save success");
             res.redirect("/");
         });
    });
});

module.exports=router;