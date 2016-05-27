

var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description; 
	});

	var addCommentFromInputBox = function () {
		var $new_toDo;

		if ($(".comment-input input").val() !== ""){
				$new_toDo = $(".comment-input input").val();
				$(".comment-input input").hide(); 
				toDos.push($new_toDo);
				$(".comment-input input").fadeIn(); 
				$(".comment-input input").val(""); 
		}
	}

	$(".tabs span").toArray().forEach(function(element) {

		var $element = $(element),
			$content; 
		$element.on("click", function(){
			//all tabs inactive
			$(".tabs span").removeClass('active');

			//chosen tab active
			$element.addClass('active');

			//empty main contain so it can re-created
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				console.log("FIRST TAB CLICKED!");
				$content = $("<ul>"); 

				toDos.forEach(function(item) {
					$content.prepend($("<li>").text(item));
				});

				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(2)")) {
				console.log("SECOND TAB CLICKED!");
				$content = $("<ul>");

				toDos.forEach(function(item) {
					$content.append($("<li>").text(item));
				});

				$("main .content").append($content); 
			}else if ($element.parent().is(":nth-child(3)")) {
				console.log("THIRD TAB CLICKED!"); 

				$content = $("<section>").addClass("comment-input"); 
				$content.append("<p>Add Your Comment:</p>");
				$content.append("<input type="+"text"+"><button>+</button>");

				$("main .content").append($content); 

				$(".comment-input button").on("click", function(event) {
					addCommentFromInputBox();  
				});

				$(".comment-input input").on("keypress", function(event) {
					if (event.keyCode == 13) {
						addCommentFromInputBox();  
					}
				});
			}

			return false; 
		});
	});

	$(".tabs a:nth-child(1) span").trigger("click");
}

$(document).ready( function() {
	$.getJSON("http://localhost:8000/todos.json", function(toDoObjects) {
			main(toDoObjects);
	});
}); 