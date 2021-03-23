const express = require('express');
const app = express();


const httpServer = require('http').createServer(app);
const options = {
  cors: {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
}

const io = require('socket.io')(httpServer);

app.use(express.static('public'))

io.on("connection", socket => {
  socket.on('message', data => {
    console.log(data);
    io.emit('message', data)
  })
  console.log("new connection", socket.id)
  setInterval(() => {
    socket.emit("FromAPI", "Welcome to Matt's Message Board")
  }, 1000)
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

})
const PORT = process.env.PORT || 3000


const random = socket => {
  socket.emit('random', "hello boiiiii")
}



httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});