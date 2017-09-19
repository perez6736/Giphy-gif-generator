var gifs = ["Dogs", "Cats", "Surprise", "Funny"]; //this array will be the buttons. 

//helper functions ------------------------------------------------------------

function renderButtons() { //this will make the buttons appear on the HTML

	$("#buttons-view").empty();

	for (var i = 0; i < gifs.length; i++) {
		var a = $("<button>");		
		a.addClass("gif");		
		a.attr("data-name", gifs[i]);		
		a.text(gifs[i]);
		$("#buttons-view").append(a);
	}
}

// this will make it so any new input will become a button and put the new button on the HTML
function addGifButton(event){ 
	event.preventDefault();// stops page from refreshing 
    var gif = $("#gif-input").val().trim(); //get the user input and trim spaces
    gifs.push(gif); // add to array
    renderButtons(); // must re render the list opf buttons
}

function aJax(URL, METHOD, CALLBACK){ //creating a ajax method so i can only call this once
	$.ajax({
		url: URL,
		method: METHOD
	}).done(CALLBACK);
}



// code starts here ------------------------------------------------

$("#add-gif").on("click", addGifButton);

renderButtons();