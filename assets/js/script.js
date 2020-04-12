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
// all buttons have class = ".buttons"
// front page "Next" button id = "#next"
// front page "Previous" button id = "#previous"
// front page background image element has id = "#backgroundImage"
// front page background image element has "data-index" attribute with starting value of 0 (number data type)
// front page "Terms to Know" button id = "termsModalOpenButton"
// terms modal "Close" button id = "termsModalCloseButton"
// modal 1 "Get Started" button id = "#modal1GetStartedButton"
// modal 2 "Space" and "Earth" buttons ids = "#modal2SpaceButton" and "#modal2EarthButton"
// modal 3 "Yes" and "No" buttons ids = "#modal3YesButton" and "#modal3NoButton"
// modal 4 "Submit" button id = "#modal4SubmitButton"
// modal 4 text input id = "#modal4Input"
// modal 5 "Yes" and "No" ids = "#modal5YesButton" and "#modal5NoButton"
// results modal "Events", "Weather", and "Search Again" buttons ids = "#resultsModalEventsButton", "#resultsModalWeatherButton", and "#resultsModalSearchAgainButton"
// event results modal "Close" button id = "#eventResultsModalCloseButton"
// weather results modal "Close" button id = "#weatherResultsModalClose Button"
// modal 3 div containing user location string has id = "#modal3UserLocation"
// event results modal div containing event results has id = "#eventResultsContainer"

// WISHLIST
// Research and incorporate Spotify API, playlists, and buttons

// TO-DO LIST
// obtain Spotify API key
// update classes in display() function
// add API calls for NASA pictures
// update queryURLs for NASA picture API calls
// update html elements in eventSearch() function
// add API call for NASA Earth events
// update html elements in NASA Earth events API call
// add API call for OpenWeather
// update html elements for OpenWeather API call
// update modal 3 html element with location in getLocation() function
// find API to call for city/state from lat/lon
// add city/state API call
// update modal 3 html element with location in city/state API call
// add code in click event for retrieving and updating image urls from storage object
// update modal 3 html element with location in click event
// Incorporate Spotify playlist and control functionality into front page elements

// NASA Account ID: d3651b40-8bb0-47c2-ab26-2df8b2b1e269

// FRONT MATTER

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
// On loading page, update background images in storage, display background image on front page and display modal 1 (welcome) by running initializePage() function

// (2) Available at all times 
// Front Page - "Previous" and "Next" buttons will change to next or previous background image
// Front Page - "Terms to Know" button will display the terms modal
// Terms Modal - "Close" button will close the terms modal and return to the last active modal prior to opening the terms modal. This is tracked by the activeWindow variable that is updated by the display() function

// (3) Dynamic elements
// Modal 1 (welcome) - on "Get Started" button click, display modal 2 (event selection)
// Modal 2 (event selection) - user clicks space or event buttons, updates eventType variable to "space" or "earth" based on button click, and runs getLocation() function to begin process for determining location
    // getLocation() function 
    // checks local storage for saved location
        // if saved location is available, updates userLocation variable and modal 3 (location confirmation) with save location, displays modal 3 (location confirmation)
        // if saved location is not available, attempts to retrieve location information from browser
            // if browser location is available, runs API call to ??????????????????????????

            // to retrieve city and state (or outside US equivalent), updates userLocation variable and modal 3 (location confirmation) with location, displays modal 3 (location confirmation)
            // if browser location is not available, displays modal 4 (enter location)
// Modal 3 (location confirmation) - displays location information
    // if "Yes" button is clicked 
        // if location was retrieved from local storage, run eventSearch() function
        // if location was NOT retrieved from local storage, display modal 5 (store location)
    // if "No" button is clicked, display modal 4 (enter location)
// Modal 4 (enter location) - on "Submit" button click, store user text input in searchLocation display modal, update modal 3 (location confirmation) with location information, display modal 3 (location confirmation) 
// Modal 5 (store location)
    // if "Yes" button is clicked load userLocation into local storage, run eventSearch() function, display results modal
    // if "No" button is clicked, run eventSearch() function, display results modal
// eventSearch() function - based on eventType variable, runs API calls to NASA and OpenWeather API endpoints, creates, updates, and appends html elements in event results and weather results modals, and displays results modal
// Results Modal - displays Events, Weather, and Search Again buttons
    // if Events button is clicked, display event results modal
    // if Weather button is clicked, display weather results modal
    // if Search Again button is clicked, display modal 1
    // if the "Close" buttons on the event results or weather results modals, the results modal is displayed

// (4) Other
// display() function - uses a switch statement to hide and show html container elements by dynamically updating the elements' class with the .hide or .show class as applicable

// VARIABLES

// used in calls to NASA APIs
var apiKeyNASA = "pK24NVUjUgtTgxaMB4IPco4R3xOsBhptCgFQPPSG";
// used in calls to OpenWeather APIs
var apiKeyWeather = "5f9f4afbfb142ac29ca47b2737de474a";
// used in calls to Spotify APIs
var apiKeySpotify = "";
// used in display() function and terms modal "Close" button click event to track last active window
var activeWindow = "";
// used to determine whether to search for space events or earth events
var eventType = "";
// used to store user's location for event and weather API calls
var userLocation = "";
// used to store background images to minimize number of API calls
var backgroundImageObject = {};

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
function initializePage() {
    // establishes variable with today's day value as a number
    var a = new Date().getDate();
    // if local storage is NOT available, initializes backgroundImageObject object
    if (localStorage.getItem("backgroundImageObject") === null) {
        backgroundImageObject = {
            "date" : "yesterday",
            "images" : {}
        };
    }
    // if local storage is available, stores local storage in backgroundImageObject
    else {
        backgroundImageObject = JSON.parse(localStorage.getItem("backgroundImageObject"));
    }
    // check to see if backgroundImageObject is up to date by comparing "date" property with variable a
    if (a != backgroundImageObject.date) {
        // call NASA APOD endpoint to get new images and store them in backgroundImageObject
        var queryURLNASAAPOD = "https://api.nasa.gov/planetary/apod?api_key=" + apiKeyNASA;
        $.ajax({
            url: queryURLNASAAPOD,
            method: "GET"
        }).then(function(response) {





        });
        // call NASA EPIC endpoint to get new images and store them in backgroundImageObject
        var queryURLNASAEPIC = "https://api.nasa.gov/EPIC/api/natural/images?api_key=" + apiKeyNASA; 
        $.ajax({
            url: queryURLNASAEPIC,
            method: "GET"
        }).then(function(response) {





        });
        // update "date" property
        backgroundImageObject.date = a;
    }
    // display modal 1 (welcome)
    display("modal-1");
}
// retrieves weather and event information and renders to applicable modal
function eventSearch() {
    if (eventType === "space") {
        // run call to NASA SSD/CNEOS endpoint, update event results modal with information
        var queryURLNASASSD = "";
        $.ajax({
            url: queryURLNASASSD,
            method: "GET"
        }).then(function(response) {
            // clear existing information in event results modal 
            $("#eventResultsContainer").empty();
            // create event results modal html elements, update with information, append





            // display results modal
            display("results");
        });
    }
    else if (eventType === "earth") {
        // run call to NASA Earth Observatory Natural Events Tracker endpoint, update event results modal with information
        var queryURLNASAEONET = "";
        $.ajax({
            url: queryURLNASAEONET,
            method: "GET"
        }).then(function(response) {
            // clear existing information in event results modal
            $("#eventResultsContainer").empty();
            // create event results modal html elements, update with information, append




            // display results modal
            display("results");
        });
    }
    // run call to OpenWeather ????? endpoint, update weather results modal with information
    var queryURLWeatherOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKeyWeather;
    
    var queryURLWeatherCurrentCity = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKeyWeather;

    var queryURLWeatherCurrentZIP = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&appid=" apiKeyWeather;
    
    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function(response) {
        // clear existing information in weather results modal




        // create weather results modal html elements, update with information, append




    });
}
// retrieves location information
function getLocation() {
    // checks local storage for saved location
    if (localStorage.getItem("userLocation") != null) {
        // if saved location is available, retrieve from local storage
        userLocation = localStorage.getItem("userLocation");
        // update modal 3 (location confirmation)
        $("#modal3UserLocation").text(userLocation);
        // display modal 3 (location confirmation)
        display("modal-3");
    }
    else {
        // saved location is NOT available, attempt to retrieve location from browser
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        function success(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            // API call to OpenWeather Current to obtain city name
            var queryURLWeatherCurrentLatLon = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKeyWeather;        
            $.ajax({
                url: queryURLWeatherCurrentLatLon,
                method: "GET"
            }).then(function(response) {
                // update userLocation
                userLocation = response.name;
                localStorage.setItem("userLocation", userLocation);
                // update modal 3 (confirm location) with location information
                $("#modal3UserLocation").text(userLocation);
                // display modal (confirm location)
                display("modal-3");
            });
        }
        function error(err) {
            // if browser location is not available, displays modal 4 (enter location)
            display("modal-4");
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }
}

// EVENT LISTENERS

$(document).on("click", ".buttons", function(event) {
    var targetID = $(event.target).attr("id");
    console.log("Button Click - ", targetID);
    // front page "Next" and "Previous" button click
    if (targetID === "next" || targetID === "previous") {
        //retrieve data-index property from background image element
        var indexNumber = $("#backgroundImage").attr("data-index");
        // if "Next" button is clicked, increment the data-index
        if (targetID === "next") {
            // if indexNumber is at the last entry, reset to the first entry
            if (indexNumber === 10) {
                indexNumber = 0;
            }
        else {
            // if indexNumber is NOT at the last entry, increment to next entry
            indexNumber++;
            }
        }
        // otherwise the "Previous" button was clicked, decrement the data-index
        else if (targetID === "previous") {
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
    }    
    // front page "Terms to Know" button click
    else if (targetID === "termsModalOpenButton") {
        // displays terms modal
        display("terms");
    }    
    // terms modal "Close" button click
    else if (targetID === "#ermsModalCloseButton") {
        //displays the modal that was active prior to opening the terms modal
        display(activeWindow);
    }
    // modal 1 (welcome) "Get Started" button click
    else if (targetID === "modal1GetStartedButton") {
        // displays modal 2
        display("modal-2");
    }
    // modal 2 (event selection) "Earth" or "Space" button click
    else if (targetID === "modal2SpaceButton") {
        eventType = "space";
        getLocation();
    }
    else if (targetID === "modal2EarthButton") {
        eventType = "earth";
        getLocation();
    }
    // modal 3 (confirm location) "Yes" button click
    else if (targetID === "modal3YesButton") {
        // if user location was stored location, proceed to event search
        if (userLocation === localStorage.getItem("userLocation")) {
            eventSearch();
        }
        // otherwise proceed to modal 5 (store location)
        else {
            display("modal-5");
        }
    }
    // modal 3 (confirm location) "No" button click
    else if (targetID === "modal3NoButton") {
        // proceed to modal 4 (enter location)
        display("modal-4");
    }
    // modal 4 (enter location) "Submit" button click
    else if (targetID === "modal4SubmitButton") {
        // retrieves user input from text input
        var userInput = $("#modal4Input").val().trim();
        // data validation to prevent empty search
        if ($("#modal4Input").val().trim()  === "") {
            return;
        }
        else {
            // store user input in userLocation
            userLocation = $("#modal4Input").val().trim();
            // update modal 3 (location confirmation) with location information
            $("#modal3UserLocation").text(userLocation);
            // display modal 3 (location confirmation)
            display("modal-3");
        }
    }
    // modal 5 (store location) "Yes" button click
    else if (targetID === "modal5YesButton") {
        // store location in local storage
        localStorage.setItem("userLocation", userLocation);
        // run event search
        eventSearch();
    }
    // modal 5 (store location) "No" button click
    else if (targetID === "modal5NoButton") {
        // run event search
        eventSearch();
    }
    // results modal "Events" button click
    else if (targetID === "resultsModalEventsButton") {
        // display event results modal
        display("event-results");
    }
    // results modal "Weather" button click
    else if (targetID === "resultsModalWeatherButton") {
        // display weather results modal
        display("weather-results");
    }
    // results modal "Search Again" button click
    else if (targetID === "resultsModalSearchAgainButton") {
        // display modal 1
        display("modal-1");
    }
    // event results modal "Close" button click
    else if (targetID === "eventResultsModalCloseButton") {
        // display results modal
        display("results");
    }
    // weather results modal "Close" button click
    else if (targetID === "weatherResultsModalCloseButton") {
        // display results modal
        display("results");
    }
});
// STARTING SCRIPT
initializePage();