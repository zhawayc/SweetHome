const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/jobs")
const conn=mongoose.connection
conn.on("connected",function(){
    console.log("success!!")
})

const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true},
    header:{type:String},
    info:{type:String},
    post:{type:String},
    company:{type:String},
    salary:{type:String}
})

userModel=mongoose.model("user",userSchema)
exports.userModel=userModel

const chatSchema=mongoose.Schema({
    from:{type:String,required:true},
    to:{type:String,required:true},
    chat_id:{type:String,required:true},
    content:{type:String,required:true},
    read:{type:Boolean,default:false},
    create_time:{type:Number}
})
chatModel=mongoose.model("chat",chatSchema)
exports.chatModel=chatModel