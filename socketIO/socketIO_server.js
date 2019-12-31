const {chatModel}=require("../db/models")

module.exports=function(server){
    const io=require("socket.io")(server)
    io.on("connection",function(socket){
        socket.on("sendmsg",function({from,to,content}){
            console.log("receive message from client",{from,to,content})
            const create_time=Date.now()
            const chat_id=[from,to].sort().join("_")
            new chatModel({from,to,content,create_time,chat_id}).save(function(err,sendMsg){
                io.emit("receiveMsg",sendMsg)
                console.log("send message to client",sendMsg)
            })
        })
    })
}