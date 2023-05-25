// Get DOM elements to be used set as global variables
const startPage = document.getElementById("start-page"),
  timer = document.getElementById("timer"),
  startBtn = document.getElementById("start-button"),
  questions = document.getElementById("questions"),
  question = document.getElementById("question"),
  options = document.getElementById("options"),
  endPage = document.getElementById("end-page"),
  score = document.getElementById("score"),
  initials = document.getElementById("initials"),
  submitBtn = document.getElementById("submit-button");
let secondsLeft = 75,
  highScores = localStorage.getItem(highScores);

// Make questions and answers into an object
const q1 = {
    question: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: 2,
  },
  q2 = {
    question:
      "The condition in an if/else statement is enclosed within _____.",
    options: [
      "quotes",
      "braces (curly brackets)",
      "parentheses",
      "brackets (square/box brackets)",
    ],
    answer: 2,
  },
  q3 = {
    question: "Arrays in JavaScript can be used to store _____.",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: 3,
  },
  q4 = {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: [
      "commas",
      "braces (curly brackets)",
      "quotes",
      "parentheses",
    ],
    answer: 2,
  },
  q5 = {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: 3,
  };

//
function takeQuiz() {}

//
function gameOver() {}

// Countdown timer, runs at 1 sec intervals starting at 75 secs
function setTime() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

// Listen for click event on Start Quiz button
startBtn.addEventListener("click", takeQuiz());
