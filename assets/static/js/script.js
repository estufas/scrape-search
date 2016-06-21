$(document).ready(function(){
  $('#loadArticles').on('click', function(e){
    e.preventDefault();
    $.ajax({
      url : "/url",
      dataType: "json",
      success : function(data){
        console.log(data.link);
        $.each(data.link, function(i,url){
          var pTag = $('<p/>');
          var aTag = $('<a/>', {
              href : url,
              html : data.headlines[i]
          });
          pTag.append(aTag);
          $('#theLinks').append(pTag);
        });
      }
    });
  });

  $('.delete-btn').click(function(e) {
    e.preventDefault();
    var id = $(this).data('post-id');
    var submissionContent = $(this).parent('.well');
    $.ajax({
      url: '/posts',
      method: 'DELETE',
      data: {id: id}
    }).done(function(data) {
      // console.log('the data is', data);
      if (data.msg === 'success') {
        submissionContent.slideUp(1000, function() {
          submissionContent.remove();
        });
      }
    })
  });

  $('.put-form').on('submit', function(e){
    e.preventDefault();
    var myUrl = $(this).attr('action');
    var myData = $(this).serialize()
    $.ajax({
        method:'PUT',
        url:myUrl,
        data:myData,
        success: function() {
          window.location = '/posts'
        },
        error: function(err) {}
    });
});

});