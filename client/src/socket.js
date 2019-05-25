import io from 'socket.io-client';

export default function() {
  //const socket = io('http://localhost:3001/');
  const socket = io();

  function addChatMessageHandler(callback) {
    socket.on('chat message', callback);
  }

  function removeChatMessageHandler() {
    socket.off('chat message');
  }

  function getChatrooms(callback) {
    socket.emit('chatroom list', null, callback);
  }

  function enterChatroom(chatroomName) {
    socket.emit('enter chatroom', chatroomName);
  }

  function exitChatroom(chatroomName) {
    socket.emit('exit chatroom', chatroomName);
  }

  //chatroom emit message
  function emitChatMessage(messageData) {
    socket.emit('chat message', messageData);
  }

  function addChatroomListListener(callback) {
    socket.on('chatroom list', callback);
  }

  function removeChatroomListListener() {
    socket.off('chatroom list');
  }

  function createChatroom(chatroomKey, chatroomName) {
    socket.emit('create chatroom', { chatroomKey, chatroomName });
  }

  socket.on('error', function(err) {
    console.log('Socket error: ' + err);
  });

  return {
    emitChatMessage,
    addChatMessageHandler,
    removeChatMessageHandler,

    //chatrooms
    getChatrooms,
    enterChatroom,
    exitChatroom,
    addChatroomListListener,
    removeChatroomListListener,

    createChatroom
  };
}
