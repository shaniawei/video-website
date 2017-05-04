$(document).ready(function(){
	$(".before-upload-choose-div-center").click(function(e){
        $(".upload-movie-file").change(function(){
        	$(".before-upload-center").css("display","none");
        	var val=$(this).val();
        	val=val.substring(val.lastIndexOf("/")+1,val.lastIndexOf("."));
        	$(".movie-title").val(val);
            $(".after-upload").css("display","block");
        	$(".upload-movie-form").ajaxSubmit({
        		url:"/uploading",
        		method:"POST",
        		success:function(data,reqText,jqXHR){
                   $(".movie-src").val(data.movieSrc);
                   $(".video-for-duration").attr("src",data.movieSrc);
        		}
        	});
        	getUploadProgress();
        }).trigger("click");
        e.stopPropagation();
	});
	$(".after-upload-third-center").click(function(e){
	  var txt=$(".after-upload-second-left-catogory-content").text();
	  $("input[name=catogory]").val(txt);
	  txt=[];
	  $(".article-tags-contentDiv").find(".tag-block").map(function(){
	  	txt.push($(this).text());
	  });
	  $("input[name=movieTags]").val(txt.join(","));
    var videoDom=$(".video-for-duration")[0];
	  if($("input[name=movieSrc]").val()&&videoDom.duration&&videoDom.duration>0){
      $("input[name=movieDuration]").val(videoDom.duration);
	  	$(".save-movie-info-form").submit();//这里还没有验证input输入框的有效性
	  }else{
	  	alert("输入不合法");
	  }
      e.stopPropagation();
	});
	function getUploadProgress(){
		$.ajax({
			url:"/getProgress",
			method:"POST",
		    success:function(data,reqText,jqXHR){
		    	   data.percent=parseInt(data.percent);
                   var percent=(data.percent*100).toString()+"%";
                   var width=parseInt($(".upload-progress-bar").width())*(data.percent);
                   console.log(width);
                   if(width>(parseInt($(".upload-progress-bar").width())/2)){
                   	 $(".upload-progress-percentage").css("color","#fff");
                   }
                   $(".upload-progress-percentage").text(percent);
                   $(".upload-progress-bar-progress").css("width",width);
                   if((data.percent*100)<100){
                   	 setTimeout(getUploadProgress,0);
                   }
		    }
		});
	}
});