// General Functions ==================================================================================================
    function getShowtimes(){
        //pull list of theaters based on user location, return
        //pull list of showtimes from theaters, return in showtimes variable (as an object?)
    }


// Button Click Functions ==============================================================================================
$("#login").on("click", function() {
    console.log("login");
});

$("#submit-landmark").on("click", function(event) {
    event.preventDefault();
    userLatitude = '';
    userLongitude = '';
    console.log("Search by Landmark")
});

$("#submit-zip").on("click", function(event) {
    event.preventDefault();
    zipCode = $("#inputzip").value;
        //if (zipCode.length == 5) {
            
        //}
        //else {
        //    $("#inputzip").attr("placeholder", "Please enter a valid 5-digit Zip Code");
        //};
    console.log("Search by Zip")
});

$("#use-location").on("click", function(event) {
    event.preventDefault();
    console.log("Search using my location");
    navigator.geolocation.getCurrentPosition(granted, denied);

    function granted(position) {
        let userLatitude = position.coords.latitude;
        let userLongitude = position.coords.longitude;

        console.log(`Position is ${userLatitude} x ${userLongitude}`)
    }

    function denied(error) {
        let message;
        switch(error.code) {
            case 1: message = 'Permission Denied'; break;
            case 2: message = 'Position Unavailable'; break;
            case 3: message = 'Operation Timed Out'; break;
            case 4: message = 'Unknown Error'; break;
        }
        console.log(`Geolocation Error: ${message}`)
    }
});

// Document Load Functions =============================================================================================
$(document).ready(function() {
    var zipCode = 0;
    var userLatitude = 0;
    var userLongitude = 0;
    console.log('hello');

    $(".findMovies").on('click', function(){
        getShowtimes();
        //change to next page
        //display showtimes object as list
    })

    //NEXT PAGE: results and parameters
    //if input field has a value when submit button is clicked, add those parameters to getShowtimes()
        //new date/time
        //new location
        //time constraint
        //driving time

});