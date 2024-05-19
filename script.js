let timerInterval;
let stopwatchInterval;
let timerTime = 300; // 5 minutes in seconds
let stopwatchTime = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.tablinks').click();

    const timerDisplay = document.getElementById('timer-display');
    const stopwatchDisplay = document.getElementById('stopwatch-display');

    timerDisplay.addEventListener('focus', function () {
        const timeText = timerDisplay.innerText;
        const [hours, minutes, seconds] = timeText.replace('h', '').replace('m', '').replace('s', '').split(' ');
        timerDisplay.innerText = `${hours}:${minutes}:${seconds}`;
    });

    timerDisplay.addEventListener('blur', function () {
        const timeParts = timerDisplay.innerText.split(':');
        if (timeParts.length === 3) {
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            const seconds = parseInt(timeParts[2], 10);
            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
                timerTime = hours * 3600 + minutes * 60 + seconds;
                updateTimerDisplay();
            } else {
                timerDisplay.innerText = formatTime(timerTime);
            }
        } else {
            timerDisplay.innerText = formatTime(timerTime);
        }
    });

    timerDisplay.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            timerDisplay.blur();
        }
    });

    stopwatchDisplay.addEventListener('focus', function () {
        const timeText = stopwatchDisplay.innerText;
        const [hours, minutes, seconds] = timeText.replace('h', '').replace('m', '').replace('s', '').split(' ');
        stopwatchDisplay.innerText = `${hours}:${minutes}:${seconds}`;
    });

    stopwatchDisplay.addEventListener('blur', function () {
        const timeParts = stopwatchDisplay.innerText.split(':');
        if (timeParts.length === 3) {
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
            const seconds = parseInt(timeParts[2], 10);
            if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && seconds >= 0 && seconds < 60) {
                stopwatchTime = hours * 3600 + minutes * 60 + seconds;
                updateStopwatchDisplay();
            } else {
                stopwatchDisplay.innerText = formatTime(stopwatchTime);
            }
        } else {
            stopwatchDisplay.innerText = formatTime(stopwatchTime);
        }
    });

    stopwatchDisplay.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            stopwatchDisplay.blur();
        }
    });
});

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${hours}h ${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
}

function updateTimerDisplay() {
    document.getElementById('timer-display').innerText = formatTime(timerTime);
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timerTime > 0) {
            timerTime--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerTime = 300; // Reset to 5 minutes
    updateTimerDisplay();
}

function updateStopwatchDisplay() {
    document.getElementById('stopwatch-display').innerText = formatTime(stopwatchTime);
}

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        updateStopwatchDisplay();
    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatchDisplay();
}