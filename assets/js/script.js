// TO-DO LIST FOR FRONT-END
// add data-name attribute to picture button elements that includes a searchable name
// make sure the 3 picture button elements have the same class that is not used elsewhere (".picture-button")
// make sure the search bar input is a "text type input" and has id of "#searchBarInput" and search bar button has id of "#searchBarButton"
// make sure the trending items drop down menu element has id of "#trendingItemsInput"
// make sure the yes/no buttons on modals have ids of "#modal1Yes" and "#modal1No" with the applicable modal number
// make sure the yes/no buttons on modals have classes of ".modal-1-button" with the applicable modal number
// make sure the page containers have ids of "#frontPageContainer" and "modal1Container" with titles and modal numbers as applicable
// make sure style.css has classes for .show {display: block;} and .hide {display: none;}
// make sure the modal 3 submit button has id of "#modal3Button"
// make sure the modal 3 input is text type and has id of "#modal3Input"

// sample objects for storing and retrieving store location choices

// storeLocation = {
//     "name": "XXX",
//     "address": "XXX",
//     "number": "####",
//     ?
// }


// front matter
// starting script (trendingItems) is run to run API call to retrieve and render trending items to trending items drop down menu
// user input (picture button, search bar, or trending items) will store search item in searchItem variable (global) and run locationProcess function to begin the modal progression to pick a store location
    // if store location is preloaded from local storage or browser location data, proceed to modal 1 and associated click event listeners
    // if store location is not preloaded, proceed to modal 3 and associated click event listeners
// modal 1 click event listener
    // if yes, proceed to modal 2 - make this your favorite store by running display(modal-2)
    // if no, proceed to modal 3 - enter location information by running display(modal-3)
// modal 2 click event listener
    // if yes, update local storage with storeLocation object and proceed to results page by running resultsPage()
    // if no, proceed to results page by running resultsPage()
// modal 3 click event listener
    // retrieve user location information, run API call to retrieve closest store locations, 
        // if results are available, render them and proceed to modal 4 by running display(modal-4)
        // if results are not available, render online only message and proceed to modal 4 by running display(modal-4)
// modal 4 click event listener
    // if store locations are not available, proceed is clicked and proceed to results page by running resultsPage()
    // if store locations are available, the applicable store information from the button click is stored in storeLocation object and proceed to results page by running resultsPage()
// results page is displayed by running display(results) and applicable store location/Google Maps insert/search item information is displayed based on store location or online-only status

// establish variables
var searchItem = "";
var storeLocation = {};
var storeLocationSearch = {};

// functions

// performs API call to Walmart Trending Items Endpoint, creates html elements for drop-down menu
function trendingItems() {
    // API call to retrieve top ten trending items
    // loop to create html elements
    // append html elements to page
}
// runs on user input from front page (item to search for) to progress through modals and obtain location information
function locationProcess() {
    // (Step 0) - front page
    // check local storage for existing data
    // if local storage is present proceed to modal 1 - ask if you want to use this location
    // if local storage is not present, attempt to obtain location from browser
    // if location obtained from browser, run API call to obtain closest store location
    // if a store location is returned from API call, proceed to modal 1 - ask if you want to use this location
    // if a store location is not returned from API call, proceed to modal 3 - input city and state or zip code
    // if location is not obtained from either method, proceed to modal 3 - input city and state or zip code
}
// displays front page, results page, or applicable modal based on input by updating the show/hide classes for the applicable container elements
function display(page) {
    switch (page) {
        case "front":
            // show front page, hide results page, modal 1, 2, 3, 4
            $("#frontPageContainer").attr("class", "XXXX show");
            $("#resultsPageContainer").attr("class", "XXXX hide");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");        
            break;
        case "results":
            // show results page, hide front page, modal 1, 2, 3, 4
            $("#frontPageContainer").attr("class", "XXXX hide");
            $("#resultsPageContainer").attr("class", "XXXX show");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");        
            break;
        case "modal-1":
            // show modal 1, hide front & results pages, modal 2, 3, 4
            $("#frontPageContainer").attr("class", "XXXX hide");
            $("#resultsPageContainer").attr("class", "XXXX hide");
            $("#modal1Container").attr("class", "XXXX show");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");        
            break;
        case "modal-2":
            // show modal 2, hide front & results pages, modal 1, 3, 4
            $("#frontPageContainer").attr("class", "XXXX hide");
            $("#resultsPageContainer").attr("class", "XXXX hide");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX show");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX hide");        
            break;
        case "modal-3":
            // show modal 3, hide front & results pages, modal 1, 2, 4
            $("#frontPageContainer").attr("class", "XXXX hide");
            $("#resultsPageContainer").attr("class", "XXXX hide");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX show");
            $("#modal2Container").attr("class", "XXXX hide");        
            break;
        case "modal-4":
            // show modal 4, hide front & results pages, modal 1, 2, 3
            $("#frontPageContainer").attr("class", "XXXX hide");
            $("#resultsPageContainer").attr("class", "XXXX hide");
            $("#modal1Container").attr("class", "XXXX hide");
            $("#modal3Container").attr("class", "XXXX hide");
            $("#modal4Container").attr("class", "XXXX hide");
            $("#modal2Container").attr("class", "XXXX show");        
            break;
        
    }
}
// performs API call to retrieve applicable item information and renders results page
function resultsPage() {
    // displays results page
    display("results");
    // if storeLocation is NOT "online", run API call using searchItem, storeLocation to retrieve results information
        // create html elements and append them to search items container
        // run Google Maps API and update Google Maps insert (including updating container class with "show")
        // create and append html elements for storeLocation to storeLocation container    
    // if storeLocation is "online", run API call using searchItem and online only settings to retrieve results information
        // create html elements and apppend them to search items container
        // update storeLocation container with online only message and hide Google Maps insert (including updating container class with "hide")
}

// event listeners

// front page - click event listener for the 3 picture buttons
$(document).on("click", ".picture-button", function(event) {
    // obtain data-name attribute from clicked item
    var searchItem = $(event.target).attr("data-name");
    // run function to obtain location and item information, proceed to modals
    locationProcess();
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
        // run function to obtain location and item information, proceed to modals
        locationProcess();
    }
});
// front page - change event listener for trending items drop down menu
$("#trendingItemsInput").change(function(event) {
    // obtain selected option from trending items drop down menu
    var searchItem = $("trendingItemsInput").val();
    // run function to obtain location and item information, proceed to modals
    locationProcess();
});
// modal 1 - click event for yes/no button (do you want to use this location)
$(document).on("click", ".modal-1-button", function(event) {
    // if yes, and it is already the favorite store, proceed to results page
    if ($(event.target).attr("id") === "modal1Yes" && JSON.parse(localStorage.getItem("storeLocation")) === storeLocation) {
        // proceed to results page
        resultsPage();
    }
    // if yes and it is not the favorite store, proceed to modal 2
    else if ($(event.target).attr("id") === "modal1Yes") {
        // proceed to modal 2 (do you want to make this your favorite store)
        display("modal-2");
    }
    // if no, proceed to modal 3
    else {
        // proceed to modal 3 (enter location information)
        display("modal-3");
    }
});
// modal 2 - click event for yes button (make this my favorite store)
$(document).on("click", ".modal-2-button", function(event) {
    // if click "yes" - update storeLocation object in local storage
    if ($(event.target).attr("id") === "modal2Yes") {
        localStorage.setItem("storeLocation", JSON.stringify(storeLocation));
    }
    // if click "yes" or "no" - proceed to results page
    resultsPage();
});
// modal 3 - click event for submit button (enter location information)
$(document).on("click", "#modal3Button", function(event) {
    var locationInput = $("#modal3Input").val().trim();
    // data validation to ensure no blank entries
    if (locationInput === "") {
        return;
    }
    else {
        // run API call using locationInput to retrieve information
        // if results are available, assign up to top 5 results in storeLocationSearch object, and render html elements to display store location information and associated select this store buttons in modal 4 (make sure the buttons have class ".modal-4-buttons" and unique ids)
        // if results are not available, assign "online" to storeLocation object, render online message and proceed button in modal 4 (make sure the buttons have class ".modal-4-button" and proceed has id "#modal4ProceedButton")

        // display modal 4
        display("modal-4");
    }
});
// modal 4 - click event for select this location button or proceed button
$(document).on("click", ".modal-4-button", function(event) {
    // if proceed button is clicked, proceed to results page
    if ($(event.target).attr("id") === "modal4ProceedButton") {
        resultsPage();
    }
    // if a select this store button is clicked, assign the location to the storeLocation object and proceed to modal 2 (make this my favorite store)
    else {
        // assign selected location to storeLocation object

        // proceed to modal 2
        display("modal-2");
    }
});
// starting script
// generate trending items (run trendingItems())

// OTHER ITEMS
// hamburger menu and navbar considerations - idea is to dynamically build menu options based on where the user is at in the process (is this doable and how?)