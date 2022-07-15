var container = document.getElementById("container");
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var answers = document.getElementById("answer")
var timer = document.getElementById("timer");
var highscore = document.getElementById("highscore");
var submitScore = document.getElementById("submitScore");

var currentStage = 0;
var correctAnswers = 0;
var timeRemaining = 60;
var gameOver = false;

var possibleQuestions = [
    {
        question: "Where does the script tag for Javascript go?",
        choices: ["Above the head section", "In the head section", "Top of the body section", "Bottom of the body section"],
        answer: "Bottom of the body section",
    },
    {
        question: "How do you declare a Javascript variable?",
        choices: ["var myVariable;", "v myVariable;", "variable myVariable;"],
        answer: "var myVariable;",
    },
    {
        question: "How do you call(invoke) a function?",
        choices: ["myFunction=()", "myFunction();", "function = myFunction()"],
        answer: "myFunction();",
    },
    {
        question: "Var and Let both create variables.",
        choices: ["True", "False"],
        answer: "True",
    },
    {
        question: "Which is not a Data Type?",
        choices: ["String", "Number", "Object", "Var"],
        answer: "Var",
    },
]

function startTimer() {
    var timer = setInterval(function () {
        if (gameOver != true && timeRemaining > 0) {
            document.getElementById("timer").innerHTML = "Time Left: " + timeRemaining;
            timeRemaining -= 1;
        } else {
            clearInterval(timer);
            gameOver = true;
            if (correctAnswers == 0 || timeRemaining == 0) {
                timeRemaining = 0;
            }
            question.textContent = "";
            choices.innerHTML = "";
            answers.textContent = "";
            renderSubmit()
        }
    }, 1000);
}


function renderSubmit() {
    var title = document.createElement("h3");
    title.textContent = "Your score is: " + timeRemaining ;
    submitScore.append(title);
    var initialsBox = document.createElement("initialsBox");
    initialsBox.setAttribute("for", "initials");
    submitScore.append(initialsBox);
    //line break?
    var initials = document.createElement("userInitials");
    initials.setAttribute("type", "text");
    initials.setAttribute("name", "initials");
    initials.setAttribute("id", "initials");
    initials.ariaRequired=true;
    submitScore.append(initials);
    //line break?
    var submit = document.createElement("input");
    submit.setAttribute("class", "btn btn-info");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("onclick", "saveScore(document.getElementById('initials').value,timeRemaining)");
    submitScore.append(submit);
    timer.style.display = "none";
}

function saveScore(userInitials, score) {
    var initials = document.getElementById("initials")
    if(initials.value = "") {
        answer.textContent = "Initials cannot be blank.";
    } else {
        myStorage = window.localStorage;
        myStorage.setItem(userInitials, score);
        window.location.href = "highscores.html"
    }
}

function runQuestions(array) {
    if (array != undefined) {
        var nextQuestion = document.createTextNode(array["question"]);
        question.append(nextQuestion);
        for (i =0; i < array.choices.length; i++) {
            var button = document.createElement("button");
            button.setAttribute("class", "btn btn-info");
            button.textContent = array.choices[i];
            button.setAttribute("data-value", array.choices[i]);
            choices.append(button);
        }
    } else {
        gameOver= true;
        answer.textContent = "";
        if(correctAnswers==0) {
            timeRemaining=0;
        }
    }
}

start.addEventListener("click", function () {
    startTimer();
    start.style.display = "none";
    var questionToShow = possibleQuestions[currentStage];
    runQuestions(questionToShow);
});

choices.addEventListener("click", function(event){
    if (event.target.matches("button")) {
        var selectedAnswer = event.target.textContent;
        if (selectedAnswer != possibleQuestions[currentStage].answer) {
            timeRemaining -= 10;
            answers.textContent = "Wrong!";
        } else {
            correctAnswers++;
            answers.textContent = "Correct!";
        }
        setTimeout(function () {
            currentStage++;
            var questionToShow = possibleQuestions[currentStage];
            if(timeRemaining<0) {
                timeRemaining=0;
            }
            question.textContent = "";
            choices.innerHTML = "";
            runQuestions(questionToShow);
        },100);
    }
});