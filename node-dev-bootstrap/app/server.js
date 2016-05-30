var express = require("express"),
	http = require("http"),
	app = express(),
	toDos = [

		{
			description: "Finish building this site",
			tags: ["webdev", "work"]
		},

		{
			description: "Make up some new ToDos",
			tags: ["writing", "work"]
		},

		{
			description: "Prep for Monday's class",
			tags: ["work", "studying"]
		},

		{
			description: "Answer emails",
			tags: ["work"]
		},

		{
			description: "Finish reading books",
			tags: ["webdev", "work"]
		}
	];

app.use(express.static(__dirname + "/client"));

app.use(express.urlencoded()); 

http.createServer(app).listen(3000); 

app.get("/todos.json", function(req, res) {
	res.json(toDos); 
});

app.post("/todos", function(req, res) {
	var newToDo = req.body; 
	toDos.push(newToDo); 
	console.log(newToDo);
	res.json({"message": "You posted to the server!"}); 
});

