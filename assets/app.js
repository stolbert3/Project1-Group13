// Global Object to Hold Movie Query Data ==============================================================================
let currentMovies = {};

// Functions ===========================================================================================================
function displayMovies() {
    console.log();

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

    $("#column-2").empty();
}

function displayShowtimes(key) {
    console.log(currentMovies[key]);

    let ratings = currentMovies[key].ratings;
    let r = ratings[0];
   // console.log(ratings);
   // console.log(r);
    let rated = r.code;
   // console.log(rated);

    let title = currentMovies[key].title;
    let releasedate = moment(currentMovies[key].releaseDate).format('D MMM YY');
    let short = currentMovies[key].shortDescription;
    let movieurl = currentMovies[key].officialUrl;
    let showtimes = currentMovies[key].showtimes;
    console.log(showtimes);

    let movieCard = `<div class="card text-center border-light bg-transparent">
                        <h5 class="card-header bg-transparent border-light text-white">${title} (${rated})</h5>
                        <div class="card-body" id="movie-data-display">
                            <p class="card-text text-white">Released: ${releasedate}</p>
                            <p class="card-text text-white">${short}</p>
                            <a href="${movieurl}" target="_blank"><p class="card-text text-white">Official Website</p></a>
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
        let screeningadj = moment(showtimes[m].dateTime);/*.format("h:mm A");*/
        /*console.log(screeningadj);*/
        let diff = screeningadj.diff(currentTime, 'minutes');
        if (diff > 0) {
            console.log(diff);

            let venue = showtimes[m].theatre.name;
            let ticketURL = showtimes[m].ticketURI;

            let ticketTimeData = `<tr>
                                  <td><p class="text-white">${screeningadj.format("h:mm A")}</p></td>
                                  <td><p class="text-white">${venue}</p></td>
                                  <td><a href="${ticketURL}" target="_blank"><p class="text-white">Link</p></a></td>
                                </tr>`;

            $("#ticket-times tbody").append(ticketTimeData);


        } else {
            console.log('Showtime Passed');
        }


        /*let venue = showtimes[m].theatre.name;
        let ticketURL = showtimes[m].ticketURI;

        let ticketTimeData = `<tr>
                                  <td><p class="text-white">${screeningadj}</p></td>
                                  <td><p class="text-white">${venue}</p></td>
                                  <td><a href="${ticketURL}" target="_blank"><p class="text-white">Link</p></a></td>
                                </tr>`;

        $("#ticket-times tbody").append(ticketTimeData);*/

        /*let showtimeData = `<p class="card-text text-white">${screeningadj} : ${venue} : <a href="${ticketURL}" target="_blank">
                            <p class="card-text text-white">Link</p></a></p>`;*/

        /*console.log(showtimeData);*/

        /*$("#movie-data-display").append(showtimeData);*/
    }

}

function resetPage() {
    let locationsearchcard = `<div class="card text-center border-light bg-transparent" id="location-search-card">
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

    $("#column-2").append(locationsearchcard);
}

// API Query Functions =================================================================================================
function queryZGracenoteAPI (date, zipCode) {

    let apiKey = '';
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

function queryLGracenoteAPI (date, lat, lng) {

    let apiKey = '';
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

function queryYoutubeAPI(key) {

    let resultsNum = "6";
    let searchMovie = `${currentMovies[key].title} movie 2018`;
    let apikey = '';
    let queryURL = `https://www.googleapis.com/youtube/v3/search?key=${apikey}&maxResults=${resultsNum}&part=snippet&q=${searchMovie}&type=video`;

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

/*$("#submit-landmark").on("click", function(event) {
    event.preventDefault();

    console.log("Search Via Landmark");
    let landmark = $("#inputLandmark").val().trim();
    console.log(landmark);

    $("#inputLandmark").val("");

});*/
$(document).on("click", "#submit-zip", function(event) {
/*$("#submit-zip").on("click", function(event) {*/
    event.preventDefault();

    let zipCode = $("#inputZip").val().trim();
    console.log(`Search by Zip: ${zipCode}`);

    let date = moment().format('YYYY-MM-DD');
    console.log(date);

    queryZGracenoteAPI(date, zipCode);

    $("#inputZip").val("");
    $("#reset-search").show();

});

$(document).on("click", "#use-location", function(event) {
/*$("#use-location").on("click", function(event) {*/
    event.preventDefault();
    /*console.log("Search using my location");*/
    navigator.geolocation.getCurrentPosition(granted, denied);

    function granted(position) {
        let userLat = position.coords.latitude;
        let userLong = position.coords.longitude;

        /*console.log(`Position is ${userLat} x ${userLong}`);*/
        let date = moment().format('YYYY-MM-DD');

        queryLGracenoteAPI(date, userLat, userLong);

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
        console.log(`Geolocation Error: ${message}`)
    }

});

$(document).on("click", ".movie-title", function() {
    let key = $(this).attr("id");

    $("#column-2, #column-3").empty();

    queryYoutubeAPI(key);
    displayShowtimes(key);

});
