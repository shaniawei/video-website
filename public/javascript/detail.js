$(function(){
   $(window).load(function(){
   	  var userid=$(".container").data("userid");
   	  var movieid=$(".container").data("movieid");
   	  if(userid&&movieid){
   	  	$.ajax({
   	  		method:"POST",
   	  		url:"/saveHistory",
   	  		data:{userid:userid,movieid:movieid}
   	  	});
   	  }
   });
   
});