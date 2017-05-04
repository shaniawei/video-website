var mongoose=require("mongoose");
var UserModel=require("../models/user");
var MovieSchema=require("../models/movie");

var Schema=mongoose.Schema;

var HistorySchema=new Schema({
	userid:{
      type:Schema.Types.ObjectId,
      ref:"user"
	},
	movieid:{
		type:Schema.Types.ObjectId,
		ref:"movie"
	},
	watchDate:{
		type:Date,
		default:new Date()
	},
	remark:String
});

module.exports=HistorySchema;


