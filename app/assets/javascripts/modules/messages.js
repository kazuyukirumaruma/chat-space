	
$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Chat-main__message-list__info" data-message-id=${message.id}>
            <div class="Chat-main__message-list__info__message-name">
              ${message.user_name}
            </div>
            <div class="Chat-main__message-list__info__qreated-at">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__message-list__text-message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>`
      return html;
    } else {
      let html =
      `<div class="Chat-main__message-list__info" data-message-id=${message.id}>
          <div class="Chat-main__message-list__info__message-name">
            ${message.user_name}
          </div>
          <div class="Chat-main__message-list__info__qreated-at">
            ${message.created_at}
          </div>
        </div>
        <div class="Chat-main__message-list__text-message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);      
      $('Form')[0].reset();
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
     alert("メッセージ送信に失敗しました");
   })
   .always(function() {
    $('.message-btn').prop('disabled', false);
   })
  });
});