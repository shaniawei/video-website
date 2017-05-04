var mongoose=require("mongoose");
var MovieSchema=require("../schemas/movie");

var MovieModel=mongoose.model("movie",MovieSchema);

module.exports=MovieModel;