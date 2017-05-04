var mongoose=require("mongoose");
var HistorySchema=require("../schemas/history");

var HistoryModel=mongoose.model("history",HistorySchema);

module.exports=HistoryModel;

