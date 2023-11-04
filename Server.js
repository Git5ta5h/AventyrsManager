const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Replace with your React app's URL
    methods: ['GET', 'POST'],
  },
});

app.use(cors()); // Enable CORS for all routes

io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle events from clients
  socket.on('notification', (data) => {
    console.log('Received notification:', data);

    // Broadcast the notification to all connected clients
    io.emit('notification', data);
  });

  socket.on('updateItemsPrompt', () => {
    io.emit('updateItemsPrompt');
    console.log('Update Items Prompt Received and sent');
  });


  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

});




const port = process.env.PORT || 5175;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});