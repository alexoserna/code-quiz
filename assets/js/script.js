const start = document.getElementById('start');
// view scores
const viewScore = document.getElementById('view-scores');
// Sections to display based on game instance
const intro = document.getElementById('intro');
const quiz = document.getElementById('quiz');
const quizOver = document.getElementById('quiz-over');
const highScoreSection = document.getElementById('highscore');
// Quiz Questions and answers to be filled with values
const question = document.getElementById('question');
const ansA = document.getElementById('A');
const ansB = document.getElementById('B');
const ansC = document.getElementById('C');
const ansD = document.getElementById('D');
// Answer validation
const greySection = document.getElementById('grey');
const answerValidated = document.getElementById('answerValidation');
//
const scoreInput = document.getElementById('score-input');
const finalScore = document.getElementById('finalScore');
const submitInitial = document.getElementById('submitInitial');
const scoreOL = document.getElementById('score');
const timerEl = document.getElementById('timer');
const timerDefault = 'Time: '
timerEl.textContent = timerDefault + 0;
// 
const restart = document.getElementById('goBack');
const resetScores = document.getElementById('clearHighScore');

const questions = [
    {
        question: "What does HTML stand for?",
        ansA: "A. Hyper Text Markup Language",
        ansB: "B. High Tech Markup Language",
        ansC: "C. Hyperlink Text Marking Language",
        ansD: "D. Home Tool Markup Language",
        correct: "A"
    },
    {
        question: "What is the correct way to link a CSS file in an HTML document?",
        ansA: "A. <link href='style.css' type='text/css'>",
        ansB: "B. <link rel='stylesheet' href='style.css'>",
        ansC: "C. <link src='style.css' type='text/css'>",
        ansD: "D. <link type='text/css' href='style.css'>",
        correct: "B"
    },
    {
        question: "Which JavaScript keyword declares a variable?",
        ansA: "A. let",
        ansB: "B. var",
        ansC: "C. const",
        ansD: "D. declare",
        correct: "B"
    },
    {
        question: "What is the correct way to write an if statement in JavaScript?",
        ansA: "A. if (x === 5) {}",
        ansB: "B. if x = 5 {}",
        ansC: "C. if (x = 5) {}",
        ansD: "D. if x === 5 {}",
        correct: "A"
    },
    {
        question: "Which HTML element is used to define a paragraph?",
        ansA: "A. <p>",
        ansB: "B. <div>",
        ansC: "C. <span>",
        ansD: "D. <paragraph>",
        correct: "A"
    },
    {
        question: "What does CSS stand for?",
        ansA: "A. Cascading Style Sheets",
        ansB: "B. Computer Style Sheets",
        ansC: "C. Colorful Style Sheets",
        ansD: "D. Creative Style Sheets",
        correct: "A"
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        ansA: "A. color",
        ansB: "B. background-image",
        ansC: "C. background-color",
        ansD: "D. background",
        correct: "C"
    },
    {
        question: "Which JavaScript function is used to change the content of an HTML element?",
        ansA: "A. getElementById()",
        ansB: "B. changeContent()",
        ansC: "C. setInnerHTML()",
        ansD: "D. getElementByName()",
        correct: "C"
    },
    {
        question: "What is the correct way to create a function in JavaScript?",
        ansA: "A. function myFunction() {}",
        ansB: "B. myFunction() {}",
        ansC: "C. create function myFunction() {}",
        ansD: "D. function = myFunction() {}",
        correct: "A"
    },
    {
        question: "Which HTML element is used to define an unordered list?",
        ansA: "A. <ol>",
        ansB: "B. <li>",
        ansC: "C. <ul>",
        ansD: "D. <list>",
        correct: "C"
    }
];

// local variables
let highScores = [];
let currentQuestion = 0;
const lastQuestion = questions.length - 1;
let score = 0;
let timeLeft = 0;

// Functions
function displayQuestion(index) {
    let q = questions[index];
    question.innerHTML = "<h1>" + q.question + "</h1>";
    ansA.textContent = q.ansA;
    ansB.textContent = q.ansB;
    ansC.textContent = q.ansC;
    ansD.textContent = q.ansD;
}

function countdown(maxTime) {
    timerEl.textContent = timerDefault + timeLeft;

    var timeInterval = setInterval(function () {
        timerEl.textContent = timerDefault + timeLeft;

        if (timeLeft >= 1) {
            timeLeft--;
            timerEl.textContent = timerDefault + timeLeft;
        } else {
            clearInterval(timeInterval);
            timeLeft = 0;
            if (timeLeft == 0) {
                gameOver();
            }
        }
    }, 1000);
}

function checkAnswer(answer) {
    console.log('Button clicked ' + answer);
    if (questions[currentQuestion].correct == answer) {
        score++;
        answerCorrect();

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            displayQuestion(currentQuestion);
        } else {
            gameOver();
        }

    } else {
        if (timeLeft >= 10) {
            timeLeft -= 10;
        }
        answerWrong();
    }
}

function displayHighScores() {
    scoreOL.innerHTML = "";

    for (let i = 0; i < highScores.length; i++) {
        var num = highScores[i];
        var li = document.createElement("li");
        li.textContent = num;
        li.setAttribute("data-index", i);
        scoreOL.appendChild(li);
    }
}

function initScores() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores = storedScores;
    }

    displayHighScores();
}

function storeScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function gameOver() {
    console.log('showing quiz over');
    displayNone(quiz);
    displayFlex(quizOver);
    finalScore.textContent = 'Your final score is ' + score + '!';
};

function showScores() {
    displayNone(intro);
    displayNone(quiz);
    displayNone(quizOver);
    displayFlex(highScoreSection);
}

function answerCorrect() {
    displayFlex(greySection);
    answerValidated.textContent = 'Correct!';
    setTimeout(function () {
        displayNone(greySection);
    }, 3000);
}

function answerWrong() {
    displayFlex(greySection);
    answerValidated.textContent = 'Wrong!';
    setTimeout(function () {
        displayNone(greySection);
    }, 3000);
}

function startQuiz() {
    timeLeft = 75;

    // Start countdown
    countdown(timeLeft);

    // Change display types in order to display the correct section
    displayNone(intro);
    displayFlex(quiz);

    // Display question
    displayQuestion(currentQuestion);

}

function goBack() {
    highScores = [];
    currentQuestion = 0;
    score = 0;
    timeLeft = 0;

    displayNone(highScoreSection);
    displayFlex(intro);
}

// Helper functions for dry code
function displayFlex(element) {
    element.style.display = 'flex';
}

function displayNone(element) {
    element.style.display = 'none';
}

// Event Listener
start.addEventListener("click", startQuiz);
ansA.addEventListener("click", () => {
    checkAnswer('A');
});
ansB.addEventListener("click", () => {
    checkAnswer('B');
});
ansC.addEventListener("click", () => {
    checkAnswer('C');
});
ansD.addEventListener("click", () => {
    checkAnswer('D');
});
submitInitial.addEventListener("click", function (event) {
    event.preventDefault();
    initScores();
    let scoreText = scoreInput.value.trim() + ' - ' + score;

    highScores.push(scoreText);
    scoreInput.value = "";
    storeScores();
    displayHighScores();
    showScores();
});
restart.addEventListener("click", () => {
    goBack();
});
resetScores.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("highScores");
    highScores = [null];
    displayHighScores();
    showScores();
});
viewScore.addEventListener("click", () => {

    showScores();
});