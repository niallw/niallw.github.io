const CONVERT_TO_MINUTES = 60000;
const REST_PERCENTAGE = 0.3; // Percentage of the study session duration.
var x;
var timerStarted = false;
var unboundedTimerStartTime;
var breakTimer = false;
var remainingTime;
var startTime;

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
            playAlarm();
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

function stopTimer(){
    console.log("Stopped the timer.");
    timerStarted = false;
    document.getElementById("demo").innerHTML = "No timer running.";
    clearInterval(x);

    recordSession();
}

function setStartTime(){
    startTime = new Date().getTime();
}

function recordSession(){
    var endTime = new Date().getTime();
    var sessionLength = (endTime - startTime) / CONVERT_TO_MINUTES;
    console.log("Session was " + sessionLength + " minutes long.");

    var restLength = sessionLength * REST_PERCENTAGE;
    console.log("Rest length: " + restLength + " minutes.");
    startRestSession(restLength);
}

function startRestSession(restLength){
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

function sleep(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}

function playAlarm(){
    var audio = new Audio('js/alarm.mp3');
    audio.play();
    sleep(9000);    
}