// TO-DO LIST FOR FRONT-END
// add data-name attribute to picture button elements that includes a searchable name
// make sure the 3 picture button elements have the same class that is not used elsewhere (".picture-button")
// make sure the search bar input is a "text type input" and has id of "#searchBarInput" and search bar button has id of "#searchBarButton"




// front matter
// description and flow

// establish variables

var frontPageSearchBarInputElement = $("#frontPageSearchBarInput");
var frontPageSeachButtonElement = $("#frontPageSearchButton")
var pictureButtonElement01 = $("#pictureButton01");
var pictureButtonElement02 = $("#pictureButton02");
var pictureButtonElement03 = $("#pictureButton03");
var trendingItemsInputElement = $("trendingItemsInput");




// functions


// performs API call to Walmart Trending Items Endpoint, creates html elements for drop-down menu
function trendingItems() {
    // API call to retrieve top ten trending items
    // loop to create html elements
    // append html elements to page
}


// runs on user input from front page (item to search for) to progress through modals and obtain location information
function locationProcess(searchItem) {
    // (Step 0) - front page
    // check local storage for existing data
    // if local storage is present proceed to modal 1 - ask if you want to use this location
    // if local storage is not present, attempt to obtain location from browser
    // if location obtained from browser, run API call to obtain closest store location
    // if a store location is returned from API call, proceed to modal 1 - ask if you want to use this location
    // if a store location is not returned from API call, proceed to modal 3 - input city and state or zip code
    // if location is not obtained from either method, proceed to modal 3 - input city and state or zip code

    // (Step 1) modal 1 - ask if you want to use this location
    // Present location information from local storage or API call return based on browser geolocation information
    // If "yes" (want to use this location) is pressed, proceed to modal 2 - do you want to make this a favorite store
    // if "no" is pressed, proceed to modal 3 - input city and state or zip code

    // (Step 2) modal 2 - do you want to make this a favorite store
    // if "yes" is pressed, add to local storage and proceed to results page
    // if "no" is pressed, proceed to results page

    // (Step 3) modal 3 - input city and state or zip code
    // on "submit" button click, trim data, validate that it meets "city and state" or "zip code" requirements for API call, identify as "city and state" or "zip code", if requirements are not met, display error message and reset
    // if data requirements are met, run API call to return 5 closest store locations and proceed to modal 2 - do you want to make this a favorite store location
    // if data requirements are met but store locations are not available, proceed to modal 4 - choose location

    // (Step 4) modal 4 - choose location
    // if store locations are available from API call, generate html elements for store location information and "pick this location" buttons
    // if store locations are not available, display "no locations available in your area, proceed to online ordering information" message and generate "proceed" button
    // on "pick this location" click, obtain store information, run API call for item availability at that location and proceed to results page
    // on "proceed" click, run API call for online-only item availability and proceed to results page

    // (Step 5) results page
    // create item information html elements and append to item container
    // if store location is available, update store location information in store location container
    // if store location is not available, display online-only message in store location container
    // if store location is available, run Google Maps API to update Google Maps insert
    // if store location is not available, hide Google Maps insert
}

// event listeners
// front page - "click" for 3 picture button elements (select by class), "click" for search bar button (select by id), "on change" for trending items drop-down (select by id) may need to be added to document since options will be generated

// front page - click event listener for the 3 picture buttons
$(document).on("click", ".picture-button", function(event) {
    // obtain data-name attribute from clicked item
    var searchItem = $(event.target).attr("data-name");
    // run function to obtain location and item information, proceed through modals to results page
    locationProcess(searchItem);
});
// front page - click event listener for search bar
$("#searchBarButton").on("click", function(event) {
    // obtain user input from search bar text input
    var searchItem = $("#searchBarInput").val().trim();
    // data validation to prevent searching for blank entries
    if (searchItem === "") {
        return;
    }
    else {
        locationProcess(searchItem);
    }
});


// modal 1 - "click" for yes button (select by id), "click" for no button (select by id)
// modal 2 - "click" for yes and no button (select by id or class), use if statement to add to local storage or not
// modal 3 - "click" for submit button (select by id)
// modal 4 - "click" for pick this location button (select by class) will need to be added to document since it is generated, "click" for proceed button (select by id) will need to be added to document since it is generated

// starting script
// generate trending items (run trendingItems())




// OTHER ITEMS
// hamburger menu and navbar considerations - idea is to dynamically build menu options based on where the user is at in the process (is this doable and how?)
// API calls for Walmart endpoints, research Google Maps API, Lowes API if can't get Google Maps to work
// local storage function - what data to store and how