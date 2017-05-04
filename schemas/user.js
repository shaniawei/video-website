var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var UserSchema=new Schema({
	username:String,
	password:String,
	email:String,
	sex:String,
    expert:String,   //擅长什么
    summary:String,  //对自己的概括
    city:String,
    school:String,
    profession:String,
    job:String,
    company:String,
	imgSrc:String,
	remark:String,
	registerDate:{
		type:Date,
		default:new Date()
	}
});

UserSchema.pre("save",function(next){
    this.imgSrc?this.imgSrc:this.imgSrc="/images/defaultImgSrc.png";
    next();
});   //在执行save操作之前执行此方法，一定要记得调用next方法，否则不会调用save方法了

module.exports=UserSchema;
