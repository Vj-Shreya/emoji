// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    const formattedMsg = replaceKeywordsWithEmojis(msg);

    io.emit('chat message', formattedMsg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

function replaceKeywordsWithEmojis(msg) {
  const keywordMap = {
    'react':'⚛️',
    'happy': '😄',
    'woah': '😮',
    'hey':'👋🏻',
    'lol':'😂',
    'like': '❤️',
    'congradulations':'🎉',
    // Add more keywords and corresponding emojis here
  };

  for (const keyword in keywordMap) {
    if (msg.includes(keyword)) {
      const emoji = keywordMap[keyword];
      msg = msg.replace(new RegExp(keyword, 'gi'), emoji);
    }
  }

  return msg;
}

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
