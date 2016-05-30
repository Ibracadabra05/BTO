var express = require("express"),
	http = require("http"),
	app; 

app = express(); 

app.use(express.static(__dirname + "/client")); 

http.createServer(app).listen(3000);

