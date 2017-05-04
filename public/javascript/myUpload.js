$(function(){
    $(".delete-sprites-common").click(function(e){
       var $this=$(this);
       var movieid=$(this).data("movieid");
       if(!movieid){    //没有删除权限
         return;
       }
       $(this).parents("tr").css("display","none");
       $.ajax({
       	url:"/uploadDelete",
       	method:"POST",
       	data:{movieid:movieid},
       	success:function(data,resText,jqXHR){
       		if(data.status==="fail"){
       			alert("删除失败!");
                $this.parents("tr").css("display","none");
       		}
       	}
       });
       e.stopPropagation();
    });
});