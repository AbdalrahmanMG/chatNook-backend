const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let chats = []

const addChat = (chatId, socketId)=>{
    !chats.some(chat=> chat.chatId === chatId) && chats.push({chatId, socketId})
}

const removeChat = (socketId)=>{
    chats = chats.filter(chat=> chat.socketId === socketId)
}

const getChat = (chatId)=>{
    return chats.find(chat=>chat.chatId === chatId)
}

io.on("connection", (socket) => {
  socket.on("addChat", (chatId)=>{
    addChat(chatId, socket.id)
    io.emit('getChat', chats)
  })

  socket.on("disconnect", () => {
    removeChat(socket.id)
    io.emit('getChats', chats)
  });
});

module.exports = { app, io, httpServer };
