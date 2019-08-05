const chatroomList = {
  a8171404823y4uqweihwjdf1243: {
    key: 'a8171404823y4uqweihwjdf1243',
    name: 'dokimastiko',
    userList: []
  }
};

function leaveChatroom(io, socket, chatroomToLeave) {
  socket.leave(chatroomToLeave);
  if (chatroomList[chatroomToLeave]) {
    console.log(socket.request.user.username + ' left ' + chatroomList[chatroomToLeave].name);
    const index = chatroomList[chatroomToLeave].userList.indexOf(socket.request.user.username);
    chatroomList[chatroomToLeave].userList.splice(index, 1);
    //delete chatroom if empty
    if (chatroomList[chatroomToLeave].userList.length === 0) delete chatroomList[chatroomToLeave];
  }

  //emit updated list
  io.to(chatroomToLeave).emit('chatroom data', chatroomToLeave); /////////=========================================================
  socket.broadcast.to(chatroomToLeave).emit('chat message', {
    username: socket.request.user.username,
    type: 'chat notification',
    message: 'has left the chatroom.'
  });
}

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log(socket.request.user.username + ' has connected, socket id: ' + socket.id);
    // io.to().emit('chatroom data', chatroomList);

    let currentChatroom = '';

    socket.on('enter chatroom', function(chatroomKey) {
      console.log(socket.request.user.username + ' entered ' + chatroomList[chatroomKey].name);
      console.log(chatroomList[chatroomKey]);
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
      io.to(currentChatroom).emit('chatroom data', chatroomList[currentChatroom]); /////////=========================================================
      console.log('sending chatroom data');
      console.log(chatroomList[currentChatroom]);

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
      // console.log(`Message from ${socket.request.user.username}:`);
      // console.log(messageData);
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
        key: chatroomKey,
        name: chatroomName,
        userList: []
      };
      //emit updated list
      io.to(chatroomKey).emit('chatroom data', chatroomKey); /////////=========================================================
      console.log(
        `-----creating new chatroom: ${chatroomName} ----- chatroom key: ${chatroomKey}-----`
      );
      console.log('active chatrooms: ');
      console.log(chatroomList);
      console.log(
        '--------------------------------------------------------------------------------------'
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
