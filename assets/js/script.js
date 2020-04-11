// TO-DO LIST FOR FRONT-END
// modal 1 container id = "#modal1Container"
// modal 2 container id = "#modal2Container"
// modal 3 container id = "#modal3Container"
// modal 4 container id = "#modal4Container"
// modal 5 container id = "#modal5Container"
// results modal container id = "#resultsModalContainer"
// event results modal container id = "#eventResultsModalContainer"
// weather results modal container id = "#weatherResultsModalContainer"
// terms container id = "#termsModalContainer"
// front page "Next" and "Previous" button class = ".background-image-button"
// front page "Next" button id = "#next"
// front page "Previous" button id = "#previous"
// front page background image element has id = "#backgroundImage"
// front page background image element has "data-index" attribute with starting value of 0 (number data type)
// front page "Terms to Know" button id = "termsOpenButton"
// terms modal "Close" button id = "termsCloseButton"
// modal 1 "Get Started" button id = "#modal1GetStartedButton"






// OTHER ITEMS


// NASA Account ID: d3651b40-8bb0-47c2-ab26-2df8b2b1e269

// LIST OF APIS AND ENDPOINTS
// NASA - Astronomy Picture of the Day (APOD) - used for background images on front page
// NASA - Earth Polychromatic Imaging Camera (EPIC) - used for background images on front page
// NASA - Earth Observatory Natural Event Tracker - used for earth-based events search
// NASA - SSD/CNEOS (and more) - used for space-based events search
// Open Weather Map - used for weather information
// Spotify - used for space-themed background music


// LIST OF HTML MODALS/PAGES
// front page - contains background image, terms button, previous and next buttons
// modal 1 - welcome - displays welcome message and get started button
// modal 2 - event selection - displays message and space and earth buttons
// modal 3 - location confirmation - displays pulled location and yes/no buttons
// modal 4 - enter location - displays message, text input, and submit button
// modal 5 - store location - displays message and yes/no buttons
// results modal - displays buttons for displaying event results, weather results, and return to home/search again
// event results modal - displays events and associated information
// weather results modal - displays weather information for today and next 7 days
// terms modal - displays terms to know information

// SCRIPT FLOW DESCRIPTION
// (1) Starting script on loading page
// On loading page, retrieve front page background image from backgroundImage() function and display modal 1 (welcome)
// (2) Available at all times 
// Front Page - 3 buttons (previous, next, terms to know), previous and next buttons will advance to next or previous background image, terms to know button will display the terms modal
// (3) Dynamic elements
// Modal 1 (welcome) - on "Get Started" button click, display Modal 2 (event selection)
// Modal 2 (event selection) - user clicks space or event buttons, updates eventType variable based on button click, displays modal 3 to 






// VARIABLES
var apiKeyNASA = "pK24NVUjUgtTgxaMB4IPco4R3xOsBhptCgFQPPSG";
var apiKeyWeather = "5f9f4afbfb142ac29ca47b2737de474a";
var apiKeySpotify = "";
var activeWindow = "";

// FUNCTIONS

// displays modals based on input by updating the show/hide classes for the applicable container elements
function display(page) {
    switch (page) {
        case "modal-1":
            // show: modal 1
            // hide: modals 2, 3, 4, 5, results, event results, weather results, terms
            $("#modal1Container").attr("class", "XXXX show");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "modal-1";
            break;
        case "modal-2":
            // show: modal 2
            // hide: modals 1, 3, 4, 5, results, event results, weather results, terms
            $("#modal2Container").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "modal-2";
            break;
        case "modal-3":
            // show: modal 3
            // hide: modals 1, 2, 4, 5, results, event results, weather results, terms
            $("#modal3Container").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "modal-3";
            break;
        case "modal-4":
            // show: modal 4
            // hide: modals 1, 2, 3, 5, results, event results, weather results, terms
            $("#modal4Container").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "modal-4";
            break;    
        case "modal-5":
            // show: modal 5
            // hide: modals 1, 2, 3, 4, results, event results, weather results, terms
            $("#modal5Container").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "modal-5";
            break;    
        case "results":
            // show: results modal
            // hide: modals 1, 2, 3, 4, 5, event results, weather results, terms
            $("#resultsModalContainer").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "results";
            break;   
        case "event-results":
            // show: event results modal
            // hide: modals 1, 2, 3, 4, 5, results, weather results, terms
            $("#eventResultsModalContainer").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "event-results";
            break;
        case "weather-results":
            // show: weather results modal
            // hide: modals 1, 2, 3, 4, 5, results, event results, terms
            $("#weatherResultsModalContainer").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#termsModalContainer").attr("class", "XXXX hide");
            activeWindow = "weather-results";
            break;   
        case "terms":
            // show: terms modal
            // hide: modals 1, 2, 3, 4, 5, results, event results, weather results
            $("#termsModalContainer").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal5Container").attr("class", "XXXX hide");
            $("#resultsModalContainer").attr("class", "XXXX hide");
            $("#eventResultsModalContainer").attr("class", "XXXX hide");
            $("#weatherResultsModalContainer").attr("class", "XXXX hide");
            break;    
    }
}
// retrieves background image information from local storage, refreshes images using call to NASA APOD and EPIC endpoints (if applicable), updates local storage (if applicable), and displays modal 1 (welcome).
function backgroundImage() {










}

// EVENT LISTENERS

// front page "Next" and "Previous" button click
$(document).on("click", ".background-image-button", function(event) {
    //retrieve data-index property from background image element
    var indexNumber = $("#backgroundImage").attr("data-index");
    // if "Next" button is clicked, increment the data-index
    if ($(event.target).attr("id") === "next") {
        // if indexNumber is at the last entry, reset to the first entry
        if (indexNumber === 10) {
            indexNumber = 0;
        }
        // if indexNumber is NOT at the last entry, increment to next entry
        else {
            indexNumber++;
        }
    }
    // otherwise the "Previous" button was clicked, decrement the data-index
    else {
        // if indexNumber is at the first entry, reset to the last entry
        if (indexNumber === 0) {
            indexNumber = 10;
        }
        // if indexNumber is NOT at the first entry, decrement to previous entry
        else {
            indexNumber--;
        }
    }
    // retrieve the new picture url
        




    // update the background image element





    // update the background image element data-index attribute
    $("#backgroundImage").attr("data-index", indexNumber);
});
// front page "Terms to Know" button click
$(document).on("click", "#termsOpenButton", function(event) {
    // displays terms modal
    display("terms");
});
// terms modal "Close" button click
$(document).on("click", "#termsCloseButton", function(event) {
    //displays the modal that was active prior to opening the terms modal
    display(activeWindow);
});
// modal 1 (welcome) "Get Started" button click
$(document).on("click", "#modal1GetStartedButton", function(event) {
    // displays modal 2
    display("modal-2");
});

// 


// STARTING SCRIPT