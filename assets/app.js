$(document).ready(function() {
    var zipCode = 0;
    var userLatitude = 0;
    var userLongitude = 0;
    console.log('hello');

    $("#submit-landmark").on('click', function(event){
        event.preventDefault();
        userLatitude = '';
        userLongitude = '';
        console.log("Search by Landmark")
    });

    $("#submit-zip").on('click', function(event){
        event.preventDefault();
        zipCode = $("#inputzip").value;
        //if (zipCode.length == 5) {
            
        //}
        //else {
        //    $("#inputzip").attr("placeholder", "Please enter a valid 5-digit Zip Code");
        //};
        console.log("Search by Zip")
    });

    $("#submit-use-location").on('click', function(event){
        event.preventDefault();
        console.log("Search by my location")
        
        navigator.geolocation.getCurrentPosition(function(position){
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
        });
    
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