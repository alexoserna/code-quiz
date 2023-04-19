var timerEl = document.getElementById('timer');
var timerDefault = 'Time: '

function countdown() {
    var timeLeft = 75;

    var timeInterval = setInterval(function () {
        timerEl.textContent = timerDefault + timeLeft;

        if (timeLeft >= 1 ) {
            timeLeft--;
            timerEl.textContent = timerDefault + timeLeft;
        }
    }, 1000);

}

countdown();