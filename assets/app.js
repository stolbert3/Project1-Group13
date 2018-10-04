// Functions ===========================================================================================================
function queryGracenoteAPI (date, zipCode) {

    let apiKey = '';
    let queryURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${date}&zip=${zipCode}&api_key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(response);
        }).catch(console.log)

}

function queryWikiAPI(landmark) {
    let queryURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&titles=${landmark}&exintro=1`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(response.query.pages);
            let obj = response.query.pages;
            let page = obj[Object.keys(obj)[0]];
            console.log(page.pageid);
            console.log(page.extract);
        }).catch(console.log);
}

function queryYoutubeAPI(landmark) {
    let apikey = '';
    let queryURL = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&maxResults=25&part=snippet&q=${landmark}&type=video`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            /*let snippets = response.items;
            for (var k = 0; k < snippets.length; k++) {
                console.log(snippets[k]);
            }*/
            let snippets = response.items;
            for (var k = 0; k < snippets.length; k++) {
                console.log(`https://www.youtube.com/watch?v=${snippets[k].id.videoId}`);
            }


        }).catch(console.log);
}


function queryOMDBAPI(landmark) {
    let apikey = '';
    let queryURL = `http://www.omdbapi.com/?apikey=${apikey}&s=${landmark}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            let movies = response;
            console.log(movies);

        }).catch(console.log);
}


function queryMarvelAPI(landmark) {
    let apikey = '';
    let queryURL = `https://gateway.marvel.com:443/v1/public/characters?name=${landmark}&apikey=${apikey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            let sh = response;
            let superhero = response.data;
            console.log(sh);
            console.log(superhero);

        }).catch(console.log);
}

function queryGooglePlaces(landmark) {

    let apikey = '';
    let queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apikey}&input=${landmark}&inputtype=textquery`;

    $.ajax({
        url: queryURL,
        contentType: "application/json; charset=UTF-8",
        method: "GET"
    })
        .then(function(response) {
            let placeID = response.data;
            console.log(placeID);
        }).catch(console.log);
}

function queryAMC(date, lat, long) {
    console.log(date);
    console.log(lat);
    console.log(long);



    $.ajax({
        method: "GET",
        url: `https://api.amctheatres.com/v2/showtimes/views/current-location/${date}/${lat}/${long}`,
        data: {"X-AMC-Vendor-Key": ""},
        contentType: "application/JSON;charset=UTF-8",
    })
        .then(function(response) {
            let placeID = response.data;
            console.log(placeID);
        }).catch(console.log);

}

// Button Click Functions ==============================================================================================
$("#login").on("click", function() {
    console.log("login");
});

$("#submit-landmark").on("click", function(event) {
    event.preventDefault();

    console.log("Search Via Landmark");
    let landmark = $("#inputLandmark").val().trim();
    console.log(landmark);

    queryWikiAPI(landmark);
    /*queryYoutubeAPI(landmark);*/
    /*queryOMDBAPI(landmark);*/
    /*queryMarvelAPI(landmark);*/
    /*queryGooglePlaces(landmark);*/

    $("#inputLandmark").val("");

});

$("#submit-zip").on("click", function(event) {
    event.preventDefault();

    let zipCode = $("#inputZip").val().trim();
    console.log(`Search by Zip: ${zipCode}`);
    let date = moment().format('YYYY-MM-DD');
    console.log(date);

    queryGracenoteAPI(date, zipCode);

});

$("#use-location").on("click", function(event) {
    event.preventDefault();
    console.log("Search using my location");
    navigator.geolocation.getCurrentPosition(granted, denied);

    function granted(position) {
        let userLatitude = position.coords.latitude;
        let userLongitude = position.coords.longitude;

        console.log(`Position is ${userLatitude} x ${userLongitude}`);
        let date = '10-4-2018';
        queryAMC(date, userLatitude, userLongitude)
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