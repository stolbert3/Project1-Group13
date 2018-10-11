// Initialize Firebase

var config = {
    apiKey: "AIzaSyBxq4l59TeNIU8ISsodXpdxmvnMZIWa3LU",
    authDomain: "project1-group13.firebaseapp.com",
    databaseURL: "https://project1-group13.firebaseio.com",
    projectId: "project1-group13",
    storageBucket: "project1-group13.appspot.com",
    messagingSenderId: "799198513092"
  };
  firebase.initializeApp(config);

 

  var uiConfig = {
    signInSuccessUrl: 'https://stolbert3.github.io/Project1-Group13/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
     
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });

var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

console.log("firebase test");
// End of Firebase initialization //



// Global Object to Hold Movie Query Data ==============================================================================
let currentMovies = {};
// Functions ===========================================================================================================
// To Display the Initial List of All Movies playing nearby.
function displayMovies() {

    let movieCard = `<div class="card text-center border-light bg-transparent">
                        <div class="card-header bg-transparent border-light text-white">Currently Playing Nearby</div>
                        <div class="card-body" id="movie-title-display">`;

    $("#column-1").append(movieCard);

    for (var k = 0; k < currentMovies.length; k++) {
        let movieTitle = currentMovies[k].title;

        let movieCardTitle = `<a href="javascript:;" class="movie-title" id="${k}">
                                <p class="card-text text-white">${movieTitle}</p></a>`;

        $("#movie-title-display").append(movieCardTitle);
        
    }

}

// To Display the Playing Times of the Movie, once selected.
function displayShowtimes(key) {
    console.log(currentMovies[key]);

    // To Prevent Error In Displaying Movie Times if the Movie does not have a listed rating.
    let rated;
    let ratings = currentMovies[key].ratings;
    if (ratings !== undefined) {
        let r = ratings[0];
        rated = r.code;
    } else {
        rated = "NA";
    }

    let title = currentMovies[key].title;
    let releaseDate = moment(currentMovies[key].releaseDate).format('D MMM YY');
    let short = currentMovies[key].shortDescription;
    let movieURL = currentMovies[key].officialUrl;
    let showtimes = currentMovies[key].showtimes;
    console.log(showtimes);

    let movieCard = `<div class="card text-center border-light bg-transparent">
                        <h5 class="card-header bg-transparent border-light text-white">${title} (${rated})</h5>
                        <div class="card-body" id="movie-data-display">
                            <p class="card-text text-white">Released: ${releaseDate}</p>
                            <p class="card-text text-white">${short}</p>
                            <a href="${movieURL}" target="_blank"><p class="card-text text-white">Official Website</p></a>
                            <table class="table table-hover" id="ticket-times">
                              <thead>
                                <tr>
                                  <th scope="col"><p class="text-white">Time</p></th>
                                  <th scope="col"><p class="text-white">Theater</p></th>
                                  <th scope="col"><p class="text-white">Tickets</p></th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                              </table>
                        </div>
                    </div>`;

    $("#column-3").append(movieCard);

    for (var m = 0; m < showtimes.length; m++) {
        let currentTime = moment();/*.format("h:mm A");*/
        /*console.log(currentTime);*/
        let screeningAdj = moment(showtimes[m].dateTime);/*.format("h:mm A");*/
        /*console.log(screeningAdj);*/
        let diff = screeningAdj.diff(currentTime, 'minutes');
        if (diff > 0) {
            console.log(diff);

            let venue = showtimes[m].theatre.name;
            let ticketURL = showtimes[m].ticketURI;

            let ticketTimeData = `<tr>
                                  <td><p class="text-white">${screeningAdj.format("h:mm A")}</p></td>
                                  <td><p class="text-white">${venue}</p></td>
                                  <td><a href="${ticketURL}" target="_blank"><p class="text-white">Link</p></a></td>
                                </tr>`;

            $("#ticket-times tbody").append(ticketTimeData);


        } else {
            console.log('Showtime Passed');
        }

    }

}

// To fully reset the page without having to refresh.  Otherwise another movie can simply be selected from the list,
// and the videos and playing times for it will be shown.
function resetPage() {
    let locationSearchCard = `<div class="card text-center border-light bg-transparent" id="location-search-card">
                                    <div class="card-header bg-transparent border-light text-white">
                                        Search for Movies
                                    </div>
                                    <div class="card-body">
                                        <form>
                                            <div class="form-group mb-0 text-white text-center">
                                                <label for="inputZip" class="form-label">Zip:</label>
                                            </div>
                                            <div class="form-group text-center">
                                                <input type="number" name="quantity" class="form-control" id="inputZip" placeholder="30345">
                                            </div>
                                            <div class="form-group text-center">
                                                <button class="btn btn-outline-light" id="submit-zip" type="submit">Submit</button>
                                            </div>
                                            <div class="form-group mb-0 text-white text-center">
                                                <p class="text-center">Or</p>
                                            </div>
                                            <div class="form-group text-white text-center">
                                                <button class="btn btn-outline-light" id="use-location" type="submit">Use My Location</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>`;

    $("#search-column").append(locationSearchCard);
}

// API Query Functions =================================================================================================
// Based on Zip Code Input
function queryZGracenoteAPI (date, zipCode) {

    let apiKey = 'zmxbv8fhjnt7j6q4uedn4vpv';
    let queryURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${date}&zip=${zipCode}&api_key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            currentMovies = response;
            // console.log(response);
            displayMovies();

        }).catch(console.log)

}

// Based on HTML Location Data
function queryLGracenoteAPI (date, lat, lng) {

    let apiKey = 'zmxbv8fhjnt7j6q4uedn4vpv';
    let queryURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${date}&lat=${lat}&lng=${lng}&api_key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            currentMovies = response;
            // console.log(response);
            displayMovies();

        }).catch(console.log)

}

// Query YouTube for movie trailers/videos - Currently Set for 6.
function queryYoutubeAPI(key) {

    let resultsNum = "6";
    let searchMovie = `${currentMovies[key].title} movie 2018`;
    let apiKey = 'AIzaSyBxq4l59TeNIU8ISsodXpdxmvnMZIWa3LU';
    let queryURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=${resultsNum}&part=snippet&q=${searchMovie}&type=video`;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            let snippets = response.items;
            let videos = [];

            for (var k = 0; k < snippets.length; k++) {
                videos.push(`https://www.youtube.com/embed/${snippets[k].id.videoId}`);
            }

            for (var v = 0; v < snippets.length; v++) {
                let movieVideo = $(`<div class="row mb-3"><div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src=${videos[v]} allowfullscreen></iframe>
                                    </div></div>`);

                $("#column-2").append(movieVideo);
            }

        }).catch(console.log);

}

// Button Click Functions ==============================================================================================
$("#reset-search").on("click", function(event) {
    event.preventDefault();
    console.log('Reset');

    $("#column-1, #column-2, #column-3").empty();
    resetPage();
    $("#reset-search").hide();

});

$("#firebase-login").on("click", function(event) {
    event.preventDefault();
    console.log("Login");

    $("#login-modal").modal('show');

});

$("#firebase-signout").on("click", function(event) {
    event.preventDefault();
    console.log("Sign-out");

    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });

});

// Dynamic Button Functions ============================================================================================
$(document).on("click", "#submit-zip", function(event) {
    event.preventDefault();

    let zipCode = $("#inputZip").val().trim();
    console.log(`Search by Zip: ${zipCode}`);

    let date = moment().format('YYYY-MM-DD');
    console.log(date);

    queryZGracenoteAPI(date, zipCode);

    $("#inputZip").val("");
    $("#search-column").empty();
    $("#reset-search").show();

});

$(document).on("click", "#use-location", function(event) {
    event.preventDefault();
    /*console.log("Search using my location");*/
    navigator.geolocation.getCurrentPosition(granted, denied);

    function granted(position) {
        let userLat = position.coords.latitude;
        let userLong = position.coords.longitude;

        /*console.log(`Position is ${userLat} x ${userLong}`);*/
        let date = moment().format('YYYY-MM-DD');

        queryLGracenoteAPI(date, userLat, userLong);

        $("#search-column").empty();
        $("#reset-search").show();
    }

    function denied(error) {
        let message;
        switch(error.code) {
            case 1: message = 'Permission Denied'; break;
            case 2: message = 'Position Unavailable'; break;
            case 3: message = 'Operation Timed Out'; break;
            case 4: message = 'Unknown Error'; break;
        }
        console.log(`GeoLocation Error: ${message}`)
    }

});

$(document).on("click", ".movie-title", function() {
    let key = $(this).attr("id");

    $("#column-2, #column-3").empty();

    queryYoutubeAPI(key);
    displayShowtimes(key);

});
