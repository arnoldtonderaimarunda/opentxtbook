$(document).ready(function(){
  var url="js/experts.json";
    $.getJSON(url, function(response) {
        var statusHTML = '<ul style="list-style-type: none;" class="status">';
        $.each(response,function (index){
          if(this.available === true) {
                statusHTML += '<li class="in"></li>';
          }else{
                statusHTML += '<li class="out"></li>';
          }
          statusHTML += '<li><small>' + this.reason + '</small></li>';
        });
          statusHTML += '</ul>';
          $('#expertStatus').html(statusHTML);
    });
});
