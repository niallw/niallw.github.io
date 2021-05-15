const CONVERT_TO_MINUTES = 60000;
const REST_PERCENTAGE = 0.25; // Percentage of the study session duration.
var x;
var timerStarted = false;
var unboundedTimerStartTime;
var breakTimer = false;
var remainingTime;
var startTime;
var endTimeToRecord;
var restLength;

function timerFunction(numMinutesCountdown) {
    if (timerStarted){
        console.log("Timer still running, can't start a new timer!");
        return;
    }
    
    console.log("Started timer of " + numMinutesCountdown + " minutes.");
    console.log("==========");
    setStartTime();
    timerStarted = true;

    // Set the date we're counting down to
    var endTime = new Date().getTime() + (numMinutesCountdown * CONVERT_TO_MINUTES);

    // Update the count down every 1 second
    x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
            
        // Find the distance between now and the count down date
        var distance = endTime - now;
        remainingTime = distance / CONVERT_TO_MINUTES;
            
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = "Time remaining: " + days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        if (breakTimer){
            clearInterval(x);
            document.getElementById("demo").innerHTML = "<p style=\"color:red;display:inline;\">[Paused]</p> Time remaining: " + days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
            timerStarted = false;
            return;
        }
            
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
            timerStarted = false;
            stopTimer();
        }
    }, 1000);
}

function customTimer(){
    var customTime = parseFloat(document.getElementById("customTime").value);
    timerFunction(customTime);   
}

function unboundedTimer(){
    if (timerStarted){
        console.log("Timer still running!");
        return;
    }

    if (!timerStarted){
        console.log("Started unbounded timer.");
        unboundedTimerStartTime = new Date().getTime();
        setStartTime();
        timerStarted = true;
    }

    x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
            
        // Find the distance between now and the count down date
        var distance = now - unboundedTimerStartTime;
            
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = "Unbounded session length: " + days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";        
    }, 1000);
}

function pauseTimer(){
    breakTimer = true;
    console.log("Minutes remaining on pause: " + remainingTime);
}

function resumeTimer(){
    breakTimer = false;
    console.log("Minutes remaining on resume: " + remainingTime);
    timerFunction(remainingTime);
}

function confirmStop(){
    if (confirm('Are you sure you want to stop the timer?')) {
        stopTimer();
    }
}

function stopTimer(){
    console.log("Stopped the timer.");
    timerStarted = false;
    clearInterval(x);
    playAlarm();

    recordSession();
}

function setStartTime(){
    startTime = new Date().getTime();
}

function recordSession(){
    var endTime = new Date().getTime();
    endTimeToRecord = new Date().getTime();
    var sessionLength = (endTime - startTime) / CONVERT_TO_MINUTES;
    console.log("Session was " + sessionLength + " minutes long.");

    restLength = sessionLength * REST_PERCENTAGE;
    console.log("Rest length: " + restLength + " minutes.");

    logSession();
}

function startRestSession(){
    if (!(restLength > 0)){
        console.log("You are not due for a rest yet!");
        return;
    }

    // Set the date we're counting down to
    var endTime = new Date().getTime() + (restLength * CONVERT_TO_MINUTES);

    // Update the count down every 1 second
    x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
            
        // Find the distance between now and the count down date
        var distance = endTime - now;
        remainingTime = distance / CONVERT_TO_MINUTES;
            
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = "<p style=\"color:green;display:inline;\">[RESTING]</p> Rest time: " + days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            playAlarm();
            document.getElementById("demo").innerHTML = "REST OVER";
            timerStarted = false;
        }
    }, 1000);
}

function playAlarm(){
    var audio = new Audio('js/alarm.mp3');
    audio.play();
}

// Google sheets API stuff

// Client ID and API key from the Developer Console
var CLIENT_ID;
var API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    CLIENT_ID = document.getElementById("client_id").innerHTML;
    console.log("client id:" + CLIENT_ID);
    API_KEY = document.getElementById("api").innerHTML;
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    console.log("initting client");
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        console.log("Initialized client!");

        // // Listen for sign-in state changes.
        // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // // Handle the initial sign-in state.
        // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // authorizeButton.onclick = handleAuthClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        // authorizeButton.style.display = 'none';
        // signoutButton.style.display = 'block';
    } else {
        // authorizeButton.style.display = 'block';
        // signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function logSession() {
    console.log("editing sheet");
    
    var _values = [
        [startTime],
        [endTimeToRecord]    
    ];
    
    var body = {
        values: _values
    };
    
    gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: "1x1nhNY3zm0VlBm7_6wf2KpAt_nJIDZbJPpkX1zQ2beQ",
        range: "Sheet1!A2:A3",
        valueInputOption: "USER_ENTERED",
        resource: body
    }).then((response) => {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}

// https://stackoverflow.com/questions/21151896/can-a-google-form-be-auto-filled-and-submitted-using-data-from-a-spreadsheet
// https://github.com/googleworkspace/browser-samples/blob/master/sheets/snippets/test_snippets.js