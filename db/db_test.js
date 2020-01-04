const mongoose=require("mongoose")
//mongoose.connect("mongodb://localhost:27017/jobs")
const md5=require("blueimp-md5")
const conn=mongoose.connection
conn.on("connected",function(){
    console.log("success!!")
})

const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true},
    header:{type:String}
})

const userModel=mongoose.model("user",userSchema)

function testSave(){
    const userdata=new userModel({username:"yanchen",password:md5("123"),type:"haveaRoom"})
    userdata.save(function(err,user){
        console.log("save",err,user)
    })
}

function testFind(){
    userModel.find(function(err,doc){
        console.log("testFind",err,doc)
    })

    userModel.findOne({_id:"5dfda321621d1c16600a2bd5"},function(err,doc){
        console.log("findOne",err,doc);
    })
}

function testUpdate(){
    userModel.findByIdAndUpdate({_id:"5dfda321621d1c16600a2bd5"},{"type":"needaRoom"},function(err,doc){
        console.log("update",err,doc)
    })
}

function testRemove(){
    userModel.remove({_id:"5dfda321621d1c16600a2bd5"},function(err,doc){
        console.log("remove",err,doc)
    })
}

testRemove()