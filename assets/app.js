$(document).ready(function() {
    var zipCode = 0;
    var latitude = 0;
    var longitude = 0;
    console.log('hello');

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleGetCurrentPosition);
        } 
        else { 
            $("#useLocation").text("Geolocation is not supported by this browser.");
        }
        console.log("Test");
    };

    function handleGetCurrentPosition(location){
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
    };

    $("#submit-landmark").on('click', function(){
        latitude = '';
        longitude = '';
        console.log("Search by Landmark")
    });

    $("#submit-zip").on('click', function(){
        zipCode = $("#inputzip").value;
        if (zipCode.length == 5) {
            
        }
        else {
            $("#inputzip").attr("placeholder", "Please enter a valid 5-digit Zip Code");
        };
        console.log("Search by Zip")
    });

    $("#submit-use-location").on('click', function(){
        getLocation();
        console.log("Search by my location");
    });

    function getShowtimes(){
        //pull list of theaters based on user location, return
        //pull list of showtimes from theaters, return in showtimes variable (as an object?)
    }

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