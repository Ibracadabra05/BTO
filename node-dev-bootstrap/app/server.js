var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express();
	// toDos = [

	// 	{
	// 		description: "Finish building this site",
	// 		tags: ["webdev", "work"]
	// 	},

	// 	{
	// 		description: "Make up some new ToDos",
	// 		tags: ["writing", "work"]
	// 	},

	// 	{
	// 		description: "Prep for Monday's class",
	// 		tags: ["work", "studying"]
	// 	},

	// 	{
	// 		description: "Answer emails",
	// 		tags: ["work"]
	// 	},

	// 	{
	// 		description: "Finish reading books",
	// 		tags: ["webdev", "work"]
	// 	}
	// ];

app.use(express.static(__dirname + "/client"));

app.use(express.urlencoded()); 

mongoose.connect('mongodb://localhost/BTO');

var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

http.createServer(app).listen(3000); 

app.get("/todos.json", function(req, res) {
	ToDo.find({}, function(err, toDos) {
		if (err !== null) {
			console.log("ERROR: " + err);
			return; 
		}

		res.json(toDos); 
	});
});

app.post("/todos", function(req, res) {
	var newToDo = new ToDo ({"description": req.body.description, 
							 "tags": req.body.tags}); 
	
	newToDo.save(function(err, resultat) {
		if (err !== null) {
			console.log("ERROR: " + err); 
			res.send("There has been an error! Database not updated."); 
		} else {
			ToDo.find({}, function(err, resultat) {
				if (err !== null) {
					res.send("New object was not saved!");
				} 
				res.json(resultat); 
			});
		}
	});
});

