var http = require('http');
var mongo = require('mongodb').MongoClient,
	client = require('socket.io').listen(8080).sockets;
http.createServer(function (req, res) {
		res.writeHead(200,{'content-type':'text/html'});
		res.write("http server successfully connected");
		res.end();

}).listen(9000);
mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
	if(err) throw err;
	client.on('connection', function(socket){
		var col = db.collection('messages'),
			sendStatus = function(s){
				socket.emit('status',s);
			};
			//all msg
			col.find().limit(100).sort({_id: 1}).toArray(function(err, res){
				if(err) throw err;
				socket.emit('output',  res);
			});
		//wait for connection
		console.log('Someone has connected.!!');

		socket.on('input',function(data){
			//console.log(data);
			var name = data.name,
				message = data.message,
				whitespacePattern = /^\s*$/;
				if(whitespacePattern.test(name) || whitespacePattern.test(message)){
					sendStatus("name and msg is required");
				}else{
					// db.collection('messages').insert({ name: name, message: message},function(){
					// 	console.log("inserted!!!");
					// });
					col.insert({ name: name, message: message}, function(){
						console.log("inserted!!!");
						//emit letest msg
						client.emit('output',[data]);

					sendStatus({
						message: "message send",
						clear: true
					});
					});
				}

			
		});
	});
});

