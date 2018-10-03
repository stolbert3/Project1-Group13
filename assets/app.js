



// Button Click Functions ==============================================================================================
$("#login").on("click", function() {
    console.log("login");
});

$("#submit-landmark").on("click", function(event) {
    event.preventDefault();

    console.log("submit landmark");
});

$("#submit-zip").on("click", function(event) {
    event.preventDefault();
    console.log("submit zip");
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


});