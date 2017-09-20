var gifs = ["Dog", "Cat", "Surprise", "Funny"]; //this array will be the buttons. 
var giphyBaseUrl = "https://api.giphy.com/v1/gifs/search";
var APIkey = "nDLLdhwCN42tVLQMGumeixniRSkgpv1l";
var gifArray;


//helper functions ------------------------------------------------------------

function renderButtons() { //this will make the buttons appear on the HTML
	$(".gif-button").detach();
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

    //nice to have - check if button already exists and dont allow blank entries 
}

function aJax(URL, METHOD, CALLBACK){ //creating a ajax method so i can only call this once
	$.ajax({
		url: URL,
		method: METHOD
	}).done(CALLBACK);
}

function displayGifs(gifImg, index){ // add the ratings 
	//create a div
	var imgContainer = $("<div>"); 
	//create an img tag 
	var imgTag = $("<img>"); 
	//gif the src the img url 
	imgTag.attr("src", gifImg);
	//give the image tag an attr of still so we know if its playing or not later.  
	imgTag.attr("data-isplaying", "still");
	//give the container a class
	imgContainer.addClass("image-container"); 
	// give the contianer tag an attr of the index it was in the array 
	imgContainer.attr("data-indexed", index); 
	//append the container to the gif view
	$("#gif-view").append(imgContainer); 
	//append the imgtag to the container div
	imgContainer.append(imgTag);
	
}

function getStillGifs(response){
	gifArray = response.data; //data is the array in the object returned from giphy 
	console.log(response);
	$(".image-container").detach(); //clear the gifview div before adding stuff to it
	for(i=0; i<gifArray.length; i++){ //loop through each index of data or each gif
		// get the still image of the gif and display it giving an attribute of the index it was in the array. 
		displayGifs(gifArray[i].images.original_still.url, i);

		// TODO - need to get the rating for the gifs. 
	}
}

function getDataType(){
	var gifType = ($(this).attr("data-name")); //get data name from button
	// make the url with the data type 
	var queryURL = giphyBaseUrl+"?q="+gifType+"&limit=10&api_key="+APIkey;
	//ajax call. 
	aJax(queryURL, "GET", getStillGifs);
}

function playGif(){
	var childImgTag = $(this).children(); // this is the actual img tag in the div
	var imgIndex = $(this).attr("data-indexed"); //this is where in the response object we know the gif is in 

	if(childImgTag.attr("data-isplaying") == "still"){ // if its not playing 
		childImgTag.attr("src", gifArray[imgIndex].images.original.url); //set the src to the moving gif
		childImgTag.attr("data-isplaying", "playing");	//set the attribute to playing 
	}
	else{
		childImgTag.attr("src", gifArray[imgIndex].images.original_still.url); //else its prob playing so we set the src to the still img
		childImgTag.attr("data-isplaying", "still"); //set the attribute to still. 
		console.log("still");
		
	}
}

// code starts here ------------------------------------------------



renderButtons();

$(document).on("click", "#add-gif", addGifButton); //click handler for adding buttons 
$(document).on("click", ".gif-button", getDataType); // click handler for getting the images 
$(document).on("click", ".image-container", playGif); // click handler for playing the gifs 
 