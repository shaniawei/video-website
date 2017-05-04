/**
 * video player
 * 2016/10/5 14:30
 */
var express=require("express");
var path=require("path");
var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
var session=require("express-session");

var mongodb=require("./mongoose");
var index=require("./routers/index");
var register=require("./routers/register");
var upload=require("./routers/upload");
var detail=require("./routers/detail");
var user=require("./routers/user");
var history=require("./routers/history");
var userUpload=require("./routers/user-upload");
var userHistory=require("./routers/user-history");

var test=require("./routers/test");

var app=express();

app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.engine("ejs",require("ejs-mate"));
app.locals._layoutFile="layout.ejs";

app.use(express.static(path.join(__dirname,"/public")));   //静态文件的存放路径，
app.use(cookieParser());                                 //客户端cookie的自动解析，req.cookies,res.cookie(name,value,{expires:""});
app.use(bodyParser.urlencoded({extended:false}));        //解析表单提交的数据，在req.body中  
app.use(bodyParser.json());                              //解析json类型的数据，在req.body中
app.use(session({                                        //回话，在req.session中
	secret:"miaomiao",
	resave:false,
	saveUninitialized:false,
	cookie:{httpOnly:true}    
}));

mongodb.connectToMongoDB();        //module.exports=obj;require这个模块后可以直接使用obj，exports.obj=obj,要调用obj才能使用obj对象,也就是说使用require加载进来的是exports对象
app.listen(1337,"127.0.0.1",function(){
	console.log("server is running on 127.0.0.1:1337");
});

app.use("/",index);
app.use("/",register);
app.use("/",upload);
app.use("/",detail);
app.use("/",user);
app.use("/",history);
app.use("/",userUpload);
app.use("/",userHistory);
app.use("/",test);