var express=require("express");
var HistoryModel=require("../models/history");
var MovieModel=require("../models/movie");
var router=express.Router();

router.get("/test",function(req,res){
	  HistoryModel.find({}).populate(["userid","movieid"]).exec(function(err,docs){
             console.log(docs+"mbj");
             res.render("test",{});
	  });
});

module.exports=router