/*
========================================
Giphy generator  
========================================
*/
/* Api Key: MtFK3oiyO646BF0rwXNVoGWvB1CvHTqf */

$(document).ready(function(){

/*
========================================
GLOBAL VARIABLES 
========================================
*/

    var topics = ["OP ART",
                  "XPONENTIALDESIGN", 
                  "ROBERT HRUSKA", 
                  "TRIPPYOGI",  
                  "VIRTUTE",
                  "@CONNORBELL", 
                  "@PARTYONMARZ", 
                  "@SHONK"];

/*
========================================
Display Designer Info 
========================================
*/


function displayDesignerInfo() {

    // Grabbing and storing the data-designer property value from the button
    var designer = $(this).attr("data-name");
     // Constructing a queryURL using the designer's usernamer or style of art
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=?" +
    designer + "&api_key=MtFK3oiyO646BF0rwXNVoGWvB1CvHTqf&limit=10";  
    console.log(queryURL); 
    
    $.ajax({                     // AJAX request with the queryURL
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response); 

        var results = response.data;    // Stores data from the AJAX request 
        for (var i = 0; i < results.length; i++){   // Loops the result items

         var designerDiv = $("<div class='designer' style='float: left'>");  // Creates a div to hold the designer
        var designerImage = $("<img class='col-6 gifs img-responsive' style='max-width: 100%'>");  // Creates an element to hold the image 
        designerImage.attr("src", results[i].images.fixed_height.url); // Sets the src attribute of the image to a property pulled off the result item
        
        designerDiv.append(designerImage);   // Appends the image

         var rating = $('<p class="text">').text("Rating: " + results[i].rating);   //Creates an element to hold the rating  

         designerDiv.append(rating);  // Displays the rating data 

         var usernameP = $('<p class="text">').text("Username: " + results[i].username);// Stores the username

         designerDiv.append(usernameP); // Displays the username 

         $('#designer-view').after(designerDiv)  // Adds new desinger above the previous designers 
        }
});
} 
/*
========================================
Render Buttons
========================================
*/

    function renderButtons() {
   
        $("#buttons-view").empty();  // Deleting the buttons prior to adding new buttons

        for (var i = 0; i < topics.length; i++) {  // Loops through the topics array
            console.log(topics.length); 
            var d = $("<button class='btn-block topics'>");             // creates new buttons 
            d.addClass("designer-btn");       // Adds a class to each button
            d.attr("data-name", topics[i]);  // Adds a data-attribute
            d.text(topics[i]);              // Provides the initial  }button text
        
            $("#buttons-view").append(d);  // Adds the button to the buttons-view div
        }
    }

        $("#get-inspired").on("click", function(event) {
            $("#get-inspired").empty(); 
            event.preventDefault();
        
            var des = $("#designer-input").val().trim();
            topics.push(des); // Adds designer from the textbox to our array
            renderButtons();
        });
    

      // Addes a click event listener to all elements with a class of "designer-btn"
      $(document).on("click", ".designer-btn", displayDesignerInfo);

      // Calls the renderButtons function to display the intial buttons
      renderButtons();

/*
========================================
Pause gifs
========================================
*/

}); 