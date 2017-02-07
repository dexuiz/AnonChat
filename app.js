var express =require("express");
var app=express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
app.set("view engine","ejs");

var users=[];
var connections=[];

app.get("/",function(req,res){
  res.render("index");
})

io.on('connection',function(socket){
  connections.push(socket);
  console.log(connections.length+"users connected");

  socket.on("chat message",function(msg){
    console.log("message"+msg);
    io.emit("chat message",msg);
  });



  socket.on("disconnect",function(){
    connections.splice(connections.indexOf(socket),1);
    console.log(connections.length+"users connected");
    });
  });

server.listen(process.env.port || 3000,function(){
  console.log("server started on port 3000");
});
