// start date/time now
let countDownDate = new Date();
let daysA = [];
let hoursA = [];
let minutesA = [];
let secondsA = [];
let msecondsA = [];
let resetValue;
let timerVar;
// update count-up every 10ms
document.querySelector('#start').disabled = false;
document.querySelector('#reset').addEventListener("click", resetTimer);
document.querySelector('#start').addEventListener("click", startButton);
document.querySelector('#test').addEventListener("DOMCharacterDataModified", setTimer);
// toggleCount = setInterval((setTimer, 10));
// clearInterval(toggleCount);


// function toggleTimer() {
//     if (document.querySelector('#test').textContent = "timerStopped") {
//         document.querySelector('#secondTens').textContent = "0";
//         document.querySelector('#secondOnes').textContent = "0";
//         document.querySelector('#msHundreds').textContent = "0";
//         document.querySelector('#msTens').textContent = "0";
//         toggleCount = setInterval((setTimer, 10));
//         clearInterval(toggleCount);
//         return;
//     }
//     else {
//         toggleCount = setInterval((setTimer, 10));    
//         toggleCount;   
//     }
// }

function timer() {
    console.log("running timer function now...");
    // difference between now and start time
    const now = new Date().getTime();
    const diffInTime = now - countDownDate.getTime();
    
    // time calculations for d/h/m/s/ms
    var days = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diffInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diffInTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diffInTime % (1000 * 60)) / 1000);
    var mseconds = Math.floor((diffInTime % (1000 * 60)) / 10000);
    if (days < 10) {
        days = "0" + days.toString();
    } else {
        days = days.toString();        
    }
    if (hours < 10) {
        hours = "0" + hours.toString();
    } else {
        hours = hours.toString();        
    }
    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    } else {
        minutes = minutes.toString();        
    }
    if (seconds < 10) {
        seconds = "0" + seconds.toString();
    } else {
        seconds = seconds.toString();        
    }
    if (mseconds < 10) {
        mseconds = "0" + mseconds.toString();
    }   else {        
        mseconds = mseconds.toString();
    }    
    daysA = (""+days).split("");
    hoursA = (""+hours).split("");
    minutesA = (""+minutes).split("");
    secondsA = (""+seconds).split("");
    msecondsA = ("" + mseconds).split("");
    // output result in corresponding element 
        /*
        <div class="digits">
        <div class="digit" id="secondTens">-</div>
        <div class="digit" id="secondOnes">-</div>
        <div class="digit" id="colon">:</div>
        <div class="digit" id="msHundreds">-</div>
        <div class="digit" id="msTens">-</div>
        */
    // if timer reaches 10:
    document.querySelector('#secondTens').textContent = secondsA[0];
    document.querySelector('#secondOnes').textContent = secondsA[1];
    document.querySelector('#msHundreds').textContent = msecondsA[0];
    document.querySelector('#msTens').textContent = msecondsA[1];
    if (seconds >=9) {
        // at 10 change to red
        for (x = 0; x < document.querySelectorAll('.digit').length; x++) {
            document.querySelectorAll('.digit')[x].style.color = "red";
        }
    }
    if (seconds >= 10) {
        document.querySelector('#msTens').textContent = "0";
    }
    if (seconds > 10) {
        // get new start time & reset at 10
        // re-enable start button
        countDownDate = new Date();
        for (x = 0; x < document.querySelectorAll('.digit').length; x++) {
            document.querySelectorAll('.digit')[x].style.color = "black";
        }
        document.querySelector('#start').disabled = false;
    }
    console.log(secondsA[0] + secondsA[1] + ":" + msecondsA[0] + msecondsA[1]);   
}


function setTimer() { 
    console.log("running setTimer now...");
    console.log("resetValue = " + resetValue);
    if (resetValue == "timerStopped") {
        console.log("setTimer stopping timer.");
        document.querySelector('#secondTens').textContent = "-";
        document.querySelector('#secondOnes').textContent = "-";
        document.querySelector('#msHundreds').textContent = "-";
        document.querySelector('#msTens').textContent = "-";
        clearInterval(timerVar);
    } else {
    console.log("setTimer starting timer.");
    resetValue = "timerRestarted";
    timerVar = setInterval(timer, 10);
       }    
}


// start button
//object.addEventListener("click", myScript);
// disable start button until timer finishes
function startButton() {
    console.log("running startButton function now...");
    if (resetValue === "timerStopped") {
        resetValue = "timerRestarted";
        console.log("start button enabled, timer continuing.");
        document.querySelector('#start').disabled = false;   
        countDownDate = new Date();
        setTimer();
        return;
    }
    else {
        console.log("start button disabled, timer continuing.");
        document.querySelector('#start').disabled = true;
        setTimer();
        return;
    }  
}

// reset button
function resetTimer() {
    console.log("running resetTimer function now...");
    // resets timer to 0
    console.log("timer stopping from reset button.");
    resetValue = "timerStopped";
    console.log("reset:  " + resetValue + " " + countDownDate);
    document.querySelector('#start').disabled = false;   
    setTimer();
}

    
// style timer and buttons

