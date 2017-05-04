$(function(){
   var timer=0;
   $(".common-div").on("click",function(e){
   	   $(this).addClass("common-div-border-blue").find("input").focus();
       e.stopPropagation();
   });
   $(".common-div input").blur(function(){
   	   $(this).parent(".common-div").removeClass("common-div-border-blue");
   });
   $(".username").keyup(function(){
      var $this=$(this);
       if(timer){
       	clearTimeout(timer);
        timer=0;
       }else{
       timer=setTimeout(function(){
       var val=$this.val();
       if(val==""||val==undefined){
       	  $this.next().text("输入不能为空").removeClass("tips-span");;
          timer=0;
       	  return;
       }
       $.ajax({
       	method:"POST",
       	url:"/validateUsername",
       	data:{val:val},
       	success:function(data,resText,jqXHR){
            var flag=$("form").data("flag");
            if(data.flag==1){    //表面数据库中存在此用户
                if(flag==0){  
                  $this.next().text("用户名已存在").removeClass("tips-span");
                }else{
                  $this.next().text("输入正确").addClass("tips-span");
                }
            }else{
            	  if(flag==0){
                  $this.next().text("输入正确").addClass("tips-span");
                }else{
                  $this.next().text("用户名不存在").removeClass("tips-span");
                }
            }
       	}
       });
       timer=0;
       	},500);
       }
   });

   $(".register-div").click(function(e){
   	  if(e.target.className.indexOf("register-div")>-1){
   	  	//这里要判断用户名，密码，email是否正确输入
   	  	$(".register-form").submit();
   	  }
   });

});