$(document).ready(function(){
  $(".col-history-table tbody tr").hover(function(){
        $(this).find(".delete-sprites-common").addClass("delete-sprites");
  },function(){
    $(this).find(".delete-sprites-common").removeClass("delete-sprites");
  });
});