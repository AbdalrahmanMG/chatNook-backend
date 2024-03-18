const {createServer} = require('http')
const {Server} = require('socket.io')
const express= require('express')

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer,{
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})

const getRecieverIdSocket = (recieverId)=>{
    return userSocketMap[recieverId]
}

const userSocketMap = {}

io.on("connection", (socket)=>{
    console.log("user is connected", socket.id);
    const userId = socket.handshake.query.userId
    if (userId != "undefined"){
        return userSocketMap[userId] = socket.id
    }

    io.emit("getOnlineUsers"), object.keys(userSocketMap)

    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", object.keys(userSocketMap))
    })

})


module.exports = {getRecieverIdSocket, app, io, httpServer}