var express = require('express');
var router = express.Router();
const {userModel,chatModel}=require("../db/models")
const md5=require("blueimp-md5")

/* GET home page. */
// router.post('/register', function(req, res, next) {
//   const {username,password}=req.body;
//   if(username=="admin"){
//     res.send({code:1,msg:"username already exists"})
//   }else{
//     res.send({code:0,data:{id:"abc",username,password}})
//   }
// });

router.post("/register",function(req,res){
  const {username,password,type}=req.body;
  userModel.findOne({username},function(err,doc){
    if(doc){
      res.send({code:1,msg:"username already exists"})
    }else{
      const userdata=new userModel({username,password:md5(password),type})
      userdata.save(function(err,user){
        res.cookie("userid",user._id,{maxAge:1000*60*60*24})
        const data={username,type,_id:user._id}
        res.send({code:0,data})
      })
    }
  })
})

router.post("/login",function(req,res){
  const {username,password}=req.body
  userModel.findOne({username,password:md5(password)},function(err,doc){
    if(!doc){
      res.send({code:1,msg:"username or password incorrect"})
    }else{
      res.cookie("userid",doc._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:doc})
    }
  })
})

router.post("/update",function(req,res){
  const {userid}=req.cookies
  const newData=req.body
  if(!userid){
    res.send({code:1,msg:"Please login again"})
  }else{
    userModel.findByIdAndUpdate({_id:userid}, newData,function(err,oldData){
      if(oldData){
        user=Object.assign(oldData,newData)
        res.send({code:0,data:user})
      }else{
        res.clearCookie("userid")
        res.send({code:1,msg:"Please login"})
      }
    })
  }
})

router.get("/user",function(req,res){
  const {userid}=req.cookies
  if(!userid){
    res.send({code:1,msg:"Please login again"})
  }else{
    userModel.findOne({_id:userid},function(err,doc){
      res.send({code:0,data:doc})
    })
  }
})

router.get("/userlist",function(req,res){
  const {type}=req.query
  userModel.find({type},function(err,doc){
    res.send({code:0,data:doc})
  })
})

router.get("/chatlist",function(req,res){

  userModel.find(function(err,doc){
    const users={}
    doc.forEach(user=>{
      users[user._id]={username:user.username,header:user.header}})
    const curUser=req.cookies.userid
    chatModel.find({"$or":[{from:curUser},{to:curUser}]},function(err,chatMsgs){
    res.send({code:0,data:{users,chatMsgs}})
    })
  })

})

router.post("/readmsg",function(req,res){
  const to=req.cookies.userid
  const from=req.body.from
  chatModel.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
    res.send({code:0,data:doc.nModified})
  })
})



module.exports = router;
