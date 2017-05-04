var mongoose=require("mongoose");
var UserModel=require("../models/user");

var Schema=mongoose.Schema;
var CommentSchema=new Schema({
	commentor:String,           //评论者
	replyCommentor:String,      //点击回复的那个评论者
	content:String,
	commentDate:{
		type:Date,
		default:new Date(),
	},
	praiseNum:Number,
	opposeNum:Number
});
var MovieSchema=new Schema({
	name:String,
    movieSrc:String,
    titleSrc:String,
    catagory:String,   //视频分类
    mark:String,       //视频标记
    praiseNum:Number,
    visitedNum:Number,
    opposeNum:Number,
    comment:[CommentSchema],
    movieDuration:String,
    uploadDate:{
    	type:Date,
    	default:new Date()
    },
    uploadUser:{
    	type:Schema.Types.ObjectId,
    	ref:"user"
    },
    description:String,
    remark:String
});

MovieSchema.pre("save",function(next){
    this.praiseNum=this.praiseNum?this.praiseNum:0;
    this.opposeNum=this.opposeNum?this.opposeNum:0;
    this.visitedNum=this.visitedNum?this.visitedNum:0;
    this.titleSrc=this.titleSrc?this.titleSrc:"/images/articleHeader.png";
    next();
});

CommentSchema.pre("save",function(next){
    this.praiseNum=this.praiseNum?this.praiseNum:0;
    this.opposeNum=this.opposeNum?this.opposeNum:0;
});

module.exports=MovieSchema;