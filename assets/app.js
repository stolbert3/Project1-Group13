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

    $("#landmark").on('click', function(){
        userLocation = '';
    });

    $("#zipInput").on('click', function(){
        userLocation = '';
    });

    $("#myLocation").on('click', function(){
        getLocation();
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