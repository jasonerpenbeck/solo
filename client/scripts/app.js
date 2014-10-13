var app = {};
app.defaultRoom = 'default';
app.roomChoice = app.defaultRoom;
app.server = 'https://api.parse.com/1/classes/chatterbox';
app.friends = [];
app.username = 'Anon';

app.init = function () {

  $('#main').on('click','a.username',function(e) {
    e.preventDefault();
    app.addFriend();
  });

  $('input.submit').on('click',function(e) {
    e.preventDefault();
    app.handleSubmit();
  });

  $('#addRoom').on('click',function(e) {
    e.preventDefault();
    var $roomNameValue = $('#addRoomName').val();
    app.addRoom($roomNameValue);
  });

  $('#roomList').on('click','li',function(e) {
    e.preventDefault();
    var roomValue = $('this').text();
    app.roomChoice = roomValue;
    app.fetch(app.addMessages,roomValue);
  });

  $('#chats').on('click', 'a.username', function(e) {
    e.preventDefault();
    e.stopPropagation();
    app.addFriend($(this).text());
  });
  // Retrieve most recent messages every 30 seconds
  app.fetch(app.addMessages);

  setInterval(function() {
    app.clearMessages();

    // need to pass room value if there is one
    app.fetch(app.addMessages,app.roomChoice);
  }, 30000);
};

app.send = function (message, callback) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      callback(message);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function (callback,room) {
  var parameters = '{}';

  if(room !== undefined) {
    parameters = 'where='+JSON.stringify({'roomname': room});
  }

  $.ajax({
    url: this.server + '?order=-createdAt&limit=50', // we fetch the most recent 50 messages for now
    data: parameters,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      callback(data.results)
    },
    error: function(xhr, status, errorThrown) {
      console.log('Sorry, but we could not fetch any messages.');
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessages = function(results) {
  app.clearMessages();

  for(var i =0; i < results.length; i++) {
    app.addMessage(results[i]);
  }
};

app.addMessage = function(message) {
  var $chats = $('#chats');
  var $message = $('<div/>');
  var $user = $('<a/>', {
    href: '#',
    html: _.escape(message.username)
  });

  $user.addClass('username');

  if(app.friends.indexOf(message.username) !== -1) {
    $message.addClass('friend');
  }

  $message.append($user)
    .append(' (' + $.timeago(message.createdAt) + ') ' + _.escape(message.text));

  $chats.append($message);
};

app.displayMessage = function(message) {
  var $chats = $('#chats');
  var $message = $('<div/>');
  var $user = $('<a/>', {
    href: '#',
    html: _.escape(message.username)
  });

  $user.addClass('username');

  if(app.friends.indexOf(message.username) !== -1) {
    $message.addClass('friend');
  }

  $message.append($user)
    .append('(just now)' + _.escape(message.text));

  $chats.prepend($message);
}

app.addRoom = function(room) {
/*
  var $option = $('<option>' + room + '</option>');
  $option.attr('value',room);
*/
  console.log("Adding Room");
  var $li = $('<li>' + room);
  $li.text(room);
  console.log($li);
  $('#roomList').append($li);
};

app.addFriend = function(friend) {
  if(app.friends.indexOf(friend) === -1) {
    app.friends.push(friend);
  }
};

app.handleSubmit = function() {
  var message = {};
  // TODO: do these need to be escaped?
  message.username = app.username || 'Anonymous';
  message.text = $('#message').val();
  message.roomname = app.roomChoice;

  app.send(message,app.displayMessage);
  // app.fetch(app.addMessages,app.roomChoice);
};
