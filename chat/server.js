var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];
server.listen(3000);
console.log("server running.......");

// var mongo = require('mongodb').MongoClient,
// 	client = require('socket.io');
// 	if(client.listen(8080).socket){
// 		console.log("work");
// 	}else{
// 		console.log("not");
// 	}