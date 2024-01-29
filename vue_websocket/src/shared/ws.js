const webSocketService = () => {
  const socket = new WebSocket("ws://localhost:3000");

  function sendMessage(data) {
    socket.send(JSON.stringify(data));
  }

  function onMessage(callback) {
    socket.onmessage = (e) => {
      const parsedMessage = JSON.parse(e.data);
      callback(parsedMessage);
    };
  }

  return {
    socket,
    sendMessage,
    onMessage,
  };
};

export default webSocketService;
