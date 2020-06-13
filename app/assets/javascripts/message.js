$(function(){
  function buildHTML(message){
    if (message.image) {
      let html =
        `<div class="MessageBox">
          <div class="MessageInfo">
            <div class="MessageInfo__name">
              ${message.user_name}
            </div>
            <div class="MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="MessageContent">
            <p class="MessageContent__text">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html
    } else {
      let html =
        `<div class="MessageBox">
          <div class="MessageInfo">
            <div class="MessageInfo__name">
              ${message.user_name}
            </div>
            <div class="MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="MessageContent">
            <p class="MessageContent__text">
              ${message.content}
            </p>
          </div>
        </div>`
      return html
    }
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false,
    })
    .done(function(message) {
      let html = buildHTML(message)
      $('.Mainchat__chatSpace').append(html)
      $('.Mainchat__chatSpace').animate({ scrollTop: $('.Mainchat__chatSpace')[0].scrollHeight});
      $('.Form')[0].reset()
      $('.Form__submit').prop("disabled", false)
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました')
    })
  })
});
