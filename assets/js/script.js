var container = document.getElementById("container");
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var answer = document.getElementById("answer")
var timer = document.getElementById("timer");
var highscore = document.getElementById("highscore");
var submitScore = document.getElementById("submitScore");

var currentStage = 0;
var correctAnswers = 0;
var timeRemaining = 60;
var gameOver= false;

var possibleQuestions = [
    {
        question: ""
    }


]


