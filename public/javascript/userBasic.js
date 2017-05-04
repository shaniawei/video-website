$(document).ready(function(){
	$(".right-center li").hover(function(){
    var $span=$(this).find("span").eq(0);
    var className=$span.attr("class");
    var str=className.substring(0,className.indexOf("-"));
    $span.addClass(str+"-sprites-hover");
    $(this).find("span").eq(1).addClass("right-center-span");
 },function(){
 	var $span=$(this).find("span").eq(0);
    var className=$span.attr("class");
    $span.removeClass(className.split(" ")[1]);
    $(this).find("span").eq(1).removeClass("right-center-span");
 });
});