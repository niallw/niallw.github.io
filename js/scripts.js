var x;
var timerStarted = false;
var unboundedTimerStartTime;

function timerFunction(numMinutesCountdown) {
    console.log("Timer started: " + timerStarted);
    console.log("==========");

    if (timerStarted){
        console.log("Timer still running!");
        return;
    }

    timerStarted = true;

    // Set the date we're counting down to
    var endTime = new Date().getTime() + (numMinutesCountdown * 60000);

    // Update the count down every 1 second
    x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();
        
    // Find the distance between now and the count down date
    var distance = endTime - now;
        
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="demo"
    document.getElementById("demo").innerHTML = "Time remaining: " + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
        
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        var audio = new Audio('js/alarm.mp3');
        audio.play();
        document.getElementById("demo").innerHTML = "EXPIRED";
        timerStarted = false;
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
        unboundedTimerStartTime = new Date().getTime();
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

function stopTimer(){
    timerStarted = false;
    document.getElementById("demo").innerHTML = "No timer running.";
    clearInterval(x);
}
