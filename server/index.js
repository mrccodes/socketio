const app = requre('express');
const httpServer = require('http').createServer(app);
const options = {
  path: "/matts-drawing-app/",

};
const io = require('socket.io')(httpServer, options);

io.on("connection", socket => {
  console.log("Ello mate?")
})

httpServer.listen(3000);