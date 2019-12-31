
module.exports = function (server){
    const io=require("socket.io")(server)
    io.on("connection",function (socket){
        console.log("already linked with client")
        socket.on("sendmsg",function (data){
          console.log("receve message from client",data)
          data=data.toUpperCase()
          socket.emit("receivemsg",data)
          console.log("sent message to client",data)
        })
    })
}