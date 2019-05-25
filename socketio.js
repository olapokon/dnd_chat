const chatroomList = {
  a8171404823y4uqweihwjdf1243: {
    name: 'dokimastiko',
    userList: []
  }
};

function leaveChatroom(io, socket, chatroomToLeave) {
  socket.leave(chatroomToLeave);
  //remove from users list if a room exists ------- error TypeError: Cannot read property 'indexOf' of undefined kapoia stigmh prin mpei to if
  if (chatroomList[chatroomToLeave]) {
    console.log(socket.request.user.username + ' left ' + chatroomList[chatroomToLeave].name);
    const index = chatroomList[chatroomToLeave].userList.indexOf(socket.request.user.username);
    chatroomList[chatroomToLeave].userList.splice(index, 1);
    //delete chatroom if empty
    if (chatroomList[chatroomToLeave].userList.length === 0) delete chatroomList[chatroomToLeave];
  }

  //emit updated list
  io.emit('chatroom list', chatroomList);
  socket.broadcast.to(chatroomToLeave).emit('chat message', {
    username: socket.request.user.username,
    type: 'chat notification',
    message: 'has left the chatroom.'
  });
}

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log(socket.request.user.username + ' has connected, socket id: ' + socket.id);

    let currentChatroom = '';

    socket.on('chatroom list', function(_, callback) {
      return callback(null, chatroomList);
    });

    socket.on('enter chatroom', function(chatroomKey) {
      console.log(socket.request.user.username + ' entered ' + chatroomList[chatroomKey].name);
      if (currentChatroom && chatroomKey !== currentChatroom) {
        //if already in a room, leave current chatroom before joining new one
        leaveChatroom(io, socket, currentChatroom);
      }
      socket.join(chatroomKey);
      currentChatroom = chatroomKey;

      //add user to the users list for the new chatroom
      if (!chatroomList[chatroomKey].userList.includes(socket.request.user.username)) {
        chatroomList[chatroomKey].userList.push(socket.request.user.username);
      }
      //emit updated list
      io.emit('chatroom list', chatroomList);

      //an yparxei to dwmatio sth lista, add user to userlist
      //an oxi, create neo chatroom sth lista
      //emit join ktl
      socket.broadcast.to(currentChatroom).emit('chat message', {
        username: socket.request.user.username,
        type: 'chat notification',
        message: 'has joined the chatroom.'
      });
    });

    //send message to users in the same chatroom
    socket.on('chat message', function(messageData) {
      console.log(`Message from ${socket.request.user.username}:`);
      console.log(messageData);
      const { type, chatroomName, message } = messageData;
      io.to(currentChatroom).emit('chat message', {
        username: socket.request.user.username,
        type,
        message: message
      });
    });

    socket.on('exit chatroom', function(chatroomKey) {
      leaveChatroom(io, socket, chatroomKey);
      currentChatroom = '';
    });

    socket.on('create chatroom', function(chatroomInfo) {
      const { chatroomKey, chatroomName } = chatroomInfo;
      chatroomList[chatroomKey] = {
        name: chatroomName,
        userList: []
      };
      //emit updated list
      io.emit('chatroom list', chatroomList);
      console.log(
        `-----creating new chatroom: ${chatroomName} ----- chatroom key: ${chatroomKey}-----`
      );
    });

    socket.on('disconnect', function() {
      console.log(socket.request.user.username + ' has disconnected, socket id: ' + socket.id);

      if (currentChatroom) {
        //if in a room, leave current chatroom before disconnect
        leaveChatroom(io, socket, currentChatroom);
      }
    });
  });
};
