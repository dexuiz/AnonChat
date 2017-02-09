var express =require("express");
var app=express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
app.set("view engine","ejs");

var connections=[];

app.get("/",function(req,res){
  res.render("index");
})

io.on('connection',function(socket){

  socket.on("nickname",function(name){
    console.log(name);
    connections.push({username:name,socket:socket});
    console.log(connections.length);
  })

  socket.on("chat message",function(msg){
    console.log("message"+msg);
    io.emit("chat message",msg);
  });

  socket.on("disconnect",function(){
    connections.splice(connections.indexOf(socket),1);
    console.log(connections.length+"users connected",connections);
    });
  });

server.listen(process.env.port || 3000,function(){
  console.log("server started on port 3000");
});
