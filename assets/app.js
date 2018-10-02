var zipCode = 0;
var latitude = 0;
var longitude = 0;
console.log('hello');

function getLocation() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleGetCurrentPosition);
    
    } else { 
       $("#useLocation").html("Geolocation is not supported by this browser.");
    }
    console.log("Test");
}

function handleGetCurrentPosition(location){

    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
}



