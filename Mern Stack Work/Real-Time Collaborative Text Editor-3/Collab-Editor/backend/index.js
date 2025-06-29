const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"]
  }
});

let sharedText = "";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("load_text", sharedText);

  socket.on("update_text", (text) => {
    sharedText = text;
    socket.broadcast.emit("update_text", text);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
