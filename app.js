var express =require("express");
var app=express();
var server = require('http').createServer(app);
var io = require("socket.io").listen(server);
app.set("view engine","ejs");

var users=[];
var connections=[];

app.get("/",function(req,res){
  res.render("index");
})

app.listen(process.env.port || 3000,function(){
  console.log("server started on port 3000");
});

io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log(connections.length+"sockets connected");

  //disconnect
  connections.splice(connections.indexOf(socket),1);
  console.log(connections.length+"sockets connected");

});
console.log("is this working");
