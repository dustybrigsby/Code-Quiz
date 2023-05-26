// Get DOM elements to be used set as global variables
const startPage = document.getElementById("start-page"),
  timer = document.getElementById("timer"),
  startBtn = document.getElementById("start-button"),
  quizzer = document.getElementById("quizzer"),
  question = document.getElementById("question"),
  options = document.getElementById("options"),
  endPage = document.getElementById("end-page"),
  score = document.getElementById("score"),
  initials = document.getElementById("initials"),
  submitBtn = document.getElementById("submit-button"),
  highScores = [];
let secondsLeft = 75,
  questionNum = 0;

//highScores = localStorage.getItem(highScores);

// Make questions and answers into objects
const q1 = {
    question: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
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
    answer: "parentheses",
  },
  q3 = {
    question: "Arrays in JavaScript can be used to store _____.",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
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
    answer: "quotes",
  },
  q5 = {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",
  },
  // Put Q&A objects into array
  questions = [q1, q2, q3, q4, q5];

// Countdown timer, runs at 1 sec intervals starting at 75 secs
function setTime() {
  startQuiz();
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      score.textContent = secondsLeft;
      gameOver();
    }
  }, 1000);
}

function startQuiz() {
  if (questionNum === 0) {
    // Hides startPage, shows questions
    startPage.classList.add("hidden");
    quizzer.classList.toggle("hidden");
    setQuestion();
  } else if (questionNum > 4) {
    clearInterval(timerInterval);
    score.textContent = secondsLeft;
    gameOver();
  }
}

// Iterates over questions array
function setQuestion() {
  let choices = questions[questionNum].options;

  questions[questionNum].question;

  for (let i = 0; i < choices.length; i++) {
    let btn = document.createElement("button");

    btn.innerText(choices[i]);
    options.appendChild(btn);
  }
}

function evaluate(e) {
  e.preventDefault();

  let choice = e.target.textContent;

  if (choice === questions[questionNum]) {
  }
  questionNum++;
  setQuestion();
}

function gameOver() {
  // Hides questions, shows endPage
  quizzer.classList.toggle("hidden");
  endPage.classList.toggle("hidden");
}

// Listen for click to select answer to question
options.addEventListener("click", evaluate);

// Listen for click event on Start Quiz button
startBtn.addEventListener("click", setTime);
