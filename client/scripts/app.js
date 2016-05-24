// var server = require('../server/basic-server.js');
// console.log('server.serverUrl', server.serverUrl);

// YOUR CODE HERE:
var app = {};
// app.server = 'https://api.parse.com/1/classes/chatterbox';
app.server = 'http://127.0.0.1:3000';
// app.server = server.serverUrl;
//does nothing so far
app.init = function  () {
  //add click functionality to username to add as friend
  $('#chats').on('click', app.addFriend);
  $('#send').on('submit', app.handleSubmit);
  app.refresh();
};
//asdf

//send uses POST to send a message in a string
app.send = function  (message) {
  console.log('send is running');
  //use jQuery ajax to POST to parse server
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    //type
    type: 'POST',
    //this is the message passed in a a parameter turned to a "JSON?" string
    data: JSON.stringify(message),
    //type of data sent
    contentType: 'application/json',
    //success function
    success: function (data) {
      console.log('data', data);
      console.log('chatterbox: Message sent');
      },
    //error function
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
    }
  });
};


//fetch sends a GET request
app.fetch = function () {
  // VERSION WITH .AJAX
  // return $.ajax({
  //   url: 'https://api.parse.com/1/classes/chatterbox',
  //   type: 'GET',
  //   data: 'order=-createdAt',
  //   // data: 'where={"createdAt":{"$gt":"2016-01-26T03:50:00.428Z"}}',
  //   // contentType: 'application/json',
  //   success: function(data) {
  //     console.log('chatterbox: GET received');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to GET');
  //   }
  // });

  // VERSION USING JQUERY'S .GET
  $.get(app.server/*, 'order=-createdAt'*/, function(data) {
    app.clearMessages();
    for (var i = 0; i < data.results.length; i++) {
      app.addMessage(data.results[i]);
    }
  });
};

//clearMessages should remove messages from the DOM
app.clearMessages = function () {
  $('#chats').empty();
}

//addMessage should add message to the DOM chats is the id of a div in the specrunner.html
app.addMessage = function (message) {
  var $row = $("<tr></tr>");
  var $chatsTable = $('#chats');
  //look at this Do we have to make 2 td elements?
  var $td1 = $("<td></td>");
  $td1.addClass('username').text(message.username);
  var $td2 = $("<td></td>");
  $td2.addClass('text').text(message.text);
  $row.append($td1);
  $row.append($td2);
  $chatsTable.append($row);


  //$('#chats').prepend("<tr>" +/*<td class= 'username'></td><td class= 'text'></td>*/"</tr>").text(message.text);
};

app.createMessage = function (username, text, roomname) {
  return {
    'username': username,
    'text': text,
    'roomname': roomname
  };
};

//addRoom adds a room to the DOM roomSelect is the id of a selector in the specrunner.html
app.addRoom = function (roomName) {
  $('#roomSelect').append("<option>" + roomName + "</option>");
};

//addFriend add upon clicking their user name
app.addFriend = function () {
  //will add a friend here
  console.log('addFriend was called');
};

app.handleSubmit = function () {
  event.preventDefault();
  // save the value to a variable
  var textSubmitted = $('#message').val();
  // reset the text box to be empty now that it's been saved
  $('#message').val('');
  // we will figure out how to get the username in the next step
  var newMessage = app.createMessage('RuthandMario', textSubmitted, '4chan');
  // use our send method on the new message we created
  app.send(newMessage);
};

app.refresh = function() {
  console.log("refresh was called");
  app.fetch();
  setTimeout(app.refresh, 5000);
};

$(document).ready(app.init);



var message = {
  username: 'RuthandMario',
  text: 'setInterval(function() { alert(message); }, 500)',
  roomname: '4chan'
};
