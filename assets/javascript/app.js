var gifs = ["Dog", "Cat", "Surprise", "Funny"]; //this array will be the buttons. 
var giphyBaseUrl = "https://api.giphy.com/v1/gifs/search";
var APIkey = "nDLLdhwCN42tVLQMGumeixniRSkgpv1l";


//helper functions ------------------------------------------------------------

function renderButtons() { //this will make the buttons appear on the HTML
	$("#buttons-view").empty();
	for (var i = 0; i < gifs.length; i++) { //loop through array 
		var a = $("<button>");		// create a button element 
		a.addClass("gif-button");		//give the element a class
		a.attr("data-name", gifs[i]);		//give the attr data-name = to the value of the index in the array
		a.text(gifs[i]); //put the text in the button 
		$("#buttons-view").append(a); // append the button to the element with id buttonsview 
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

function displayGifs(gifImg, index){
	var imgContainer = $("<div>");
	var imgTag = $("<img>"); //create an img tag 
	imgTag.attr("src", gifImg) //gif the src the img url 
	imgContainer.addClass("image-container"); //give the container a class
	imgContainer.attr("data-indexed", index); // give the contianer tag an attr of the index it was in the array 
	$("#gif-view").append(imgContainer); //append the container to the gif view
	imgContainer.append(imgTag);
	
}

function getGifs(response){
	var gifArray = response.data; //data is the array in the object returned from giphy 
	for(i=0; i<gifArray.length; i++){ //loop through each index of data or each gif
		// get the still image of the gif and display it giving an attribute of the index it was in the array. 
		displayGifs(gifArray[i].images.original_still.url, i);
	}
}

function getDataType(){
	
	var gifType = ($(this).attr("data-name")); //get data name from button
	// make the url with the data type 
	var queryURL = giphyBaseUrl+"?q="+gifType+"&limit=10&api_key="+APIkey;
	//ajax call. 
	aJax(queryURL, "GET", getGifs);
}

function playGif(){
	console.log("hello");
}

// code starts here ------------------------------------------------



renderButtons();

$("#add-gif").on("click", addGifButton);

$(".gif-button").on("click", getDataType);
 

 // this doesnt work----why?
$(".image-container").on("click", playGif);