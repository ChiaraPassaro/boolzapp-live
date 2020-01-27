$(document).ready(function () {
  $('.icon-send').click(function () {
    sendMessage();
  });

  $('.send-message').keypress(function(event) {
    if(event.which == 13) {
      sendMessage();
    }
  });

  $('.contact-search input').keyup(function () {
    var text = $('.contact-search input').val().toLowerCase();

    $('.contact-element').each(function () {
      var contactName = $(this).find('.contact-name').text().toLowerCase();
      if(contactName.includes(text) == true) {
        // console.log('incluso');
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});


// ------------- FUNZIONI -------------//

// funzione che invia messaggio utente
function sendMessage() {
  var textMessage = $('input.send-message').val();

  if(textMessage.length != 0) {
    var newMessage = $('.template .message').clone();
    console.log(newMessage);

    newMessage.find('.message-text').text(textMessage);

    var data = new Date();
    var hours = addZero(data.getHours());
    var minutes = addZero(data.getMinutes());
    var time = hours +':'+ minutes;

    newMessage.find('.message-time').text(time);
    newMessage.addClass('sent');
    $('.col-right-messages.active').append(newMessage);
    scrollMessage();
    setTimeout(sendResponse, 1000);
    $('input.send-message').val('');
  }
}

// funzione che manda risposta
function sendResponse() {
  var messageResponse = $('.template .message').clone();
  messageResponse.find('.message-text').text('ok');
  var data = new Date();
  var hours = addZero(data.getHours());
  var minutes = addZero(data.getMinutes());
  var time = hours +':'+ minutes;
  messageResponse.find('.message-time').text(time);
  messageResponse.addClass('received');
  $('.col-right-messages.active').append(messageResponse);
  scrollMessage();
}

// funzione che scrolla
function scrollMessage() {
   // altezza elemento conversazione attiva
    var heightContainer = $('.col-right-messages.active').height();
    console.log(heightContainer);
    // spostiamo scroll container di tutte le conversazioni
    $('.messages-wrapper').scrollTop(heightContainer);
}

// Funzione che aggiunge zero
function addZero(number) {
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}
