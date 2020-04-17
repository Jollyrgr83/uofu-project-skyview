// FRONT MATTER

// LIST OF APIS AND ENDPOINTS
// NASA - Astronomy Picture of the Day (APOD) - used for background images on front page
// NASA - Earth Observatory Natural Event Tracker - used for earth-based events search
// NASA - Space Weather Database of Notifications, Knowledge, Information (DONKI) - used for space-based events search
// Open Weather Map - used for weather information

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
            // if browser location is available, runs call to OpenWeather Current endpoint to obtain city name, updates userLocation variable and modal 3 (location confirmation) with location, displays modal 3 (location confirmation)
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
// render functions - create, update, and append html elements for weather, space, and earth events

// VARIABLES

// used in calls to NASA APIs
var apiKeyNASA = "pK24NVUjUgtTgxaMB4IPco4R3xOsBhptCgFQPPSG";
// used in calls to OpenWeather APIs
var apiKeyWeather = "5f9f4afbfb142ac29ca47b2737de474a";
// used in display() function and terms modal "Close" button click event to track last active window
var activeWindow = "";
// used to determine whether to search for space events or earth events
var eventType = "";
// used to store user's location for event and weather API calls
var userLocation = "";
// used to store background images to minimize number of API calls
var backgroundImageObject = {};
// used to translate NASA DONKI titles
var DONKI = {
    "CME" : "Coronal Mass Ejection",
    "GST" : "Geomagnetic Storm",
    "IPS" : "Interplanetary Shock",
    "FLR" : "Solar Flare",
    "SEP" : "Solar Energetic Particle",
    "MPC" : "Magnetopause Crossing",
    "RBE" : "Radiation Belt Enhancement",
    "HSS" : "Hight Speed Stream",
};
// used to display day in weather forecast
var dayNames = {
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday",
    7 : "Sunday"
};

// FUNCTIONS

// displays modals based on input by updating the show/hide classes for the applicable container elements
function display(page) {
    var inputModalClassName = "uk-position-large uk-position-top-center"
    var resultsModalClassName = "uk-position-large uk-position-top-center"
    switch (page) {
        case "modal-1":
            // show: modal 1
            // hide: modals 2, 3, 4, 5, results, event results, weather results, terms
            $("#modal1Container").attr("class", inputModalClassName + " show");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "modal-1";
            break;
        case "modal-2":
            // show: modal 2
            // hide: modals 1, 3, 4, 5, results, event results, weather results, terms
            $("#modal2Container").attr("class", inputModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "modal-2";
            break;
        case "modal-3":
            // show: modal 3
            // hide: modals 1, 2, 4, 5, results, event results, weather results, terms
            $("#modal3Container").attr("class", inputModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "modal-3";
            break;
        case "modal-4":
            // show: modal 4
            // hide: modals 1, 2, 3, 5, results, event results, weather results, terms
            $("#modal4Container").attr("class", inputModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "modal-4";
            break;    
        case "modal-5":
            // show: modal 5
            // hide: modals 1, 2, 3, 4, results, event results, weather results, terms
            $("#modal5Container").attr("class", inputModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "modal-5";
            break;    
        case "results":
            // show: results modal
            // hide: modals 1, 2, 3, 4, 5, event results, weather results, terms
            $("#resultsModalContainer").attr("class", resultsModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "results";
            break;   
        case "event-results":
            // show: event results modal
            // hide: modals 1, 2, 3, 4, 5, results, weather results, terms
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "event-results";
            break;
        case "weather-results":
            // show: weather results modal
            // hide: modals 1, 2, 3, 4, 5, results, event results, terms
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#termsModalContainer").attr("class", inputModalClassName + " hide");
            activeWindow = "weather-results";
            break;   
        case "terms":
            // show: terms modal
            // hide: modals 1, 2, 3, 4, 5, results, event results, weather results
            $("#termsModalContainer").attr("class", inputModalClassName + " show");
            $("#modal1Container").attr("class", inputModalClassName + " hide");
            $("#modal2Container").attr("class", inputModalClassName + " hide");
            $("#modal3Container").attr("class", inputModalClassName + " hide");
            $("#modal4Container").attr("class", inputModalClassName + " hide");
            $("#modal5Container").attr("class", inputModalClassName + " hide");
            $("#resultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#eventResultsModalContainer").attr("class", resultsModalClassName + " hide");
            $("#weatherResultsModalContainer").attr("class", resultsModalClassName + " hide");
            break;    
    }
}
// retrieves background image information from local storage, refreshes images using call to NASA APOD and EPIC endpoints (if applicable), updates local storage (if applicable), and displays modal 1 (welcome).
function initializePage() {
    // build date as "YYYY-MM-DD" string (used in call to NASA APOD endpoint)
    var a = new Date();
    var yearString = a.getFullYear().toString();
    var monthString = (a.getMonth() + 1).toString();
    if (monthString.length === 1) {
        monthString = "0" + monthString;
    }
    var dayString = a.getDate().toString();
    // if local storage is NOT available, initializes backgroundImageObject object
    if (localStorage.getItem("backgroundImageObject") === null) {
        backgroundImageObject = {
            "date" : "yesterday",
            "APOD-images" : [],
            "APOD-titles" : [],
        };
    }
    // if local storage is available, stores local storage in backgroundImageObject
    else {
        backgroundImageObject = JSON.parse(localStorage.getItem("backgroundImageObject"));
    }
    // check to see if backgroundImageObject is up to date by comparing "date" property with variable a
    if (dayString != backgroundImageObject.date) {
        // if not updated today, call NASA APOD endpoint to get images for last 5 days and store them in backgroundImageObject
        for (let i = 0; i < 10; i++) {
            if (a.getDate() - i > 0) {
                var newDayString = (a.getDate() - i).toString();
                if (newDayString.length === 1) {
                    newDayString = "0" + newDayString;
                }
                var newDateString = yearString + "-" + monthString + "-" + newDayString;
                var queryURLNASAAPOD = "https://api.nasa.gov/planetary/apod?date=" + newDateString + "&api_key=" + apiKeyNASA;
                $.ajax({
                    url: queryURLNASAAPOD,
                    method: "GET"
                }).then(function(response) {
                    backgroundImageObject["APOD-images"][i] = response.url;
                    backgroundImageObject["APOD-titles"][i] = response.title;
                    if (i === 0) {
                        // update background image on page load
                        $("#backgroundImage").attr("src", backgroundImageObject["APOD-images"][0]);
                        // update background image element alt attribute
                        $("#backgroundImage").attr("alt", backgroundImageObject["APOD-titles"][0]);
                        // update background image element data-index attribute
                        $("#backgroundImage").attr("data-index", 0);
                    }
                });
            }
        }
        // update "date" property in backgroundImageObject
        backgroundImageObject.date = dayString;
    }
    else {
        // update background image on page load
        $("#backgroundImage").attr("src", backgroundImageObject["APOD-images"][0]);
        // update background image element alt attribute
        $("#backgroundImage").attr("alt", backgroundImageObject["APOD-titles"][0]);
        // update background image element data-index attribute
        $("#backgroundImage").attr("data-index", 0);
    }
    // display modal 1 (welcome)
    display("modal-1");
}
// retrieves weather and event information and renders to applicable modal
function eventSearch() {
    if (eventType === "space") {
        // run call to NASA SSD/CNEOS endpoint, update event results modal with information
        var queryURLNASADONKI = "https://api.nasa.gov/DONKI/notifications?api_key=" + apiKeyNASA;
        $.ajax({
            url: queryURLNASADONKI,
            method: "GET"
        }).then(function(response) {
            localStorage.setItem("spaceEventsObject", JSON.stringify(response));
            renderSpaceEvents(response, 0);
            // display results modal
            display("results");
        });
    }
    else if (eventType === "earth") {
        // run call to NASA Earth Observatory Natural Events Tracker endpoint, update event results modal with information
        var queryURLNASAEONET = "https://eonet.sci.gsfc.nasa.gov/api/v3/events";
        $.ajax({
            url: queryURLNASAEONET,
            method: "GET"
        }).then(function(response) {
            localStorage.setItem("earthEventsObject", JSON.stringify(response));
            renderEarthEvents(response, 0);
            // display results modal
            display("results");
        });
    }
    // update weather results modal with information
    if (localStorage.getItem("userLat") === null) {
        // if lat/lon are NOT available in local storage, run call to OpenWeather Current endpoint to obtain lat and lon
        var queryURLWeatherCurrentCity = "https://api.openweathermap.org/data/2.5/weather?q=" + userLocation + "&appid=" + apiKeyWeather;
        $.ajax({
            url: queryURLWeatherCurrentCity,
            method: "GET"
        }).then(function(response) {
            lat = response.coord.lat;
            lon = response.coord.lon;
            // update local storage with lat/lon
            localStorage.setItem("userLat", lat);
            localStorage.setItem("userLon", lon);
            // run call to OpenWeather One Call endpoint to obtain weather information
            var queryURLWeatherOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKeyWeather;        
            $.ajax({
                url: queryURLWeatherOneCall,
                method: "GET"
            }).then(function(response) {
                renderWeather(response);
            });
        });
    }
    else {
        // if lat/lon are available in local storage, run call to OpenWeather One Call endpoint to obtain weather information
        var lat = localStorage.getItem("userLat");
        var lon = localStorage.getItem("userLon");
        var queryURLWeatherOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKeyWeather;        
            $.ajax({
                url: queryURLWeatherOneCall,
                method: "GET"
            }).then(function(response) {
                renderWeather(response);
            });
    }
}
// renders weather information
function renderWeather(response) {
    // clear existing information in weather results modal
    $("#weatherResultsContainer").empty();
    // create and update html elements
    var weekdayNum = (new Date()).getDay();
    for (let i = 0; i < response.daily.length; i++) {
        // convert temperature to Fahrenheit
        var temp = (((response.daily[i].temp.max) - 273.15) * (9 / 5) + 32).toFixed(0);
        var iconID = response.daily[i].weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + iconID + "@2x.png";
        var description = response.daily[i].weather[0].description;
        var iconAlt = response.daily[i].weather[0].main;
        // resets weekdayNum if it goes past 7 (number of key values in dayNames object)
        if (weekdayNum + i > 7) {
            weekdayNum = weekdayNum - 7;
        }
        // obtains dayname string from dayNames object
        var weekdayString = dayNames[weekdayNum + i];
        // create html elements
        var tempElement = $("<div>");
        var iconElement = $("<img>");
        var descElement = $("<div>");
        var dayElement = $("<div>");
        var weatherContainerElement = $("<div>");
        // update attributes
        tempElement.text(temp + "°F");
        iconElement.attr("src", iconURL);
        iconElement.attr("alt", iconAlt);
        descElement.text(description);
        dayElement.text(weekdayString);
        weatherContainerElement.attr("class", "big-box col-sm-2");
        // append html elements to weather results modal
        
        weatherContainerElement.append(dayElement);
        weatherContainerElement.append(tempElement);
        weatherContainerElement.append(iconElement);
        weatherContainerElement.append(descElement);

        $("#weatherResultsContainer").append(weatherContainerElement);
    }
}
// render earth events information
function renderEarthEvents(response, earthIndexNumber) {
    // clear existing information in event results modal
    $("#eventResultsContainer").empty();
    // update data-index attribute
    $("#eventResultsContainer").attr("data-index", earthIndexNumber);
    // create and update html elements    
    var eventTitle = response.events[earthIndexNumber].title;
    var eventLon = response.events[earthIndexNumber].geometry[0].coordinates[0];
    var eventLat = response.events[earthIndexNumber].geometry[0].coordinates[1];
    var googleEarthURL = "https://earth.google.com/web/search/" + eventLat + "," + eventLon + "/";
    // create html elements
    var titleElement = $("<div>");
    var urlContainer = $("<div>");
    var urlElement = $("<a>");
    // update attributes
    titleElement.text(eventTitle);
    urlElement.attr("href", googleEarthURL);
    urlElement.attr("target", "_blank");
    urlElement.text(googleEarthURL);
    //append elements
    $("#eventResultsContainer").append(titleElement);
    $("#eventResultsContainer").append(urlElement);
}
// render space events information
function renderSpaceEvents(response, spaceIndexNumber) {
    // clear existing information in event results modal 
    $("#eventResultsContainer").empty();
    // update data-index attribute
    $("#eventResultsContainer").attr("data-index", spaceIndexNumber);
    // create event results modal html elements, update with information, append
    var messageTitle = response[spaceIndexNumber].messageType;
    var messageURL = response[spaceIndexNumber].messageURL;
    var messageBody = response[spaceIndexNumber].messageBody;
    // if message title is an acronym, reassign full title from DONKI object
    if (DONKI[messageTitle]) {
        messageTitle = DONKI[messageTitle];
    }
    // parse message into components and remove IDs, Notes, and Disclaimers
    var messageElement = $("<div>");
    var messageBodyArray = messageBody.split("##");
    for (let j = 0; j < messageBodyArray.length; j++) {
        if (messageBodyArray[j].indexOf("Message ID:") === -1 && messageBodyArray[j].indexOf("Disclaimer:") === -1 && messageBodyArray[j].indexOf("Notes:") === -1) {
            var divElement = $("<div>");
            divElement.text(messageBodyArray[j]);
            divElement.attr("class", "box");
            messageElement.append(divElement);
        }
    }
    // create html elements
    var titleElement = $("<div>");
    var urlContainer = $("<div>");
    var urlElement = $("<a>");
    // update html elements
    titleElement.text(messageTitle);
    urlElement.attr("href", messageURL);
    urlElement.attr("target", "_blank");
    urlElement.text(messageURL);
    // append html elements
    var containerElement = $("<div>");
    containerElement.attr("class", "box");
    containerElement.append(titleElement);
    containerElement.append(urlElement);
    containerElement.append(messageElement);
    $("#eventResultsContainer").append(containerElement);
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
            // update local storage with lat/lon
            localStorage.setItem("userLat", lat);
            localStorage.setItem("userLon", lon);
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
            if (indexNumber >= backgroundImageObject["APOD-images"].length - 1) {
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
            if (indexNumber <= 0) {
                indexNumber = backgroundImageObject["APOD-images"].length - 1;
            }
            // if indexNumber is NOT at the first entry, decrement to previous entry
            else {
                indexNumber--;
            }
        }
        // update the background image element
        $("#backgroundImage").attr("src", backgroundImageObject["APOD-images"][indexNumber]);
        // update the background image element alt attribute
        $("#backgroundImage").attr("alt", backgroundImageObject["APOD-titles"][indexNumber]);
        // update the background image element data-index attribute
        $("#backgroundImage").attr("data-index", indexNumber);
    }    
    // front page "Terms to Know" button click
    else if (targetID === "termsModalOpenButton") {
        // displays terms modal
        display("terms");
    }    
    // terms modal "Close" button click
    else if (targetID === "termsModalCloseButton") {
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
    else if (targetID === "eventsPreviousButton") {
        if (eventType === "earth") {
            var earthEventsObject = JSON.parse(localStorage.getItem("earthEventsObject")); 
            var earthIndexNumber = $("#eventResultsContainer").attr("data-index");
            if (earthIndexNumber <= 0) {
                earthIndexNumber = earthEventsObject.events.length - 1;
            }
            else {
                earthIndexNumber--;
            }
            renderEarthEvents(earthEventsObject, earthIndexNumber);
        }
        else {
            var spaceEventsObject = JSON.parse(localStorage.getItem("spaceEventsObject"));
            var spaceIndexNumber = $("#eventResultsContainer").attr("data-index");
            if (spaceIndexNumber <= 0) {
                spaceIndexNumber = spaceEventsObject.length - 1;
            }
            else {
                spaceIndexNumber--;
            }
            renderSpaceEvents(spaceEventsObject, spaceIndexNumber);
        }
    }
    else if (targetID === "eventsNextButton") {
        if (eventType === "earth") {
            var earthEventsObject = JSON.parse(localStorage.getItem("earthEventsObject")); 
            var earthIndexNumber = $("#eventResultsContainer").attr("data-index");
            if (earthIndexNumber >= earthEventsObject.events.length - 1) {
                earthIndexNumber = 0;
            }
            else {
                earthIndexNumber++;
            }
            renderEarthEvents(earthEventsObject, earthIndexNumber);
        }
        else {
            var spaceEventsObject = JSON.parse(localStorage.getItem("spaceEventsObject"));
            var spaceIndexNumber = $("#eventResultsContainer").attr("data-index");
            if (spaceIndexNumber >= spaceEventsObject.length - 1) {
                console.log("length", spaceEventsObject.length);
                spaceIndexNumber = 0;
            }
            else {
                spaceIndexNumber++;
            }
            renderSpaceEvents(spaceEventsObject, spaceIndexNumber);     
        }
    }
});
// STARTING SCRIPT
initializePage();