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
  rightWrong = document.getElementById("right-wrong"),
  highScores = document.getElementById("high-scores"),
  savedScores = [];
let timerInterval,
  secondsLeft = 75,
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

// Sets up local storage to use for high scores
function goLocal() {
  if (typeof Storage !== undefined) {
    if (!localStorage.getItem("highScores")) {
      localStorage.setItem("highScores", savedScores);
    }
  } else {
    // No Web Storage support.
  }
}

// Countdown timer, runs at 1 sec intervals starting at 75 secs
function setTime() {
  // Hides startPage, shows questions
  startPage.classList.add("hidden");
  quizzer.classList.toggle("hidden");
  setQuestion();
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      score.textContent = secondsLeft;
      gameOver();
    }
  }, 1000);
}

// Iterates over questions array
function setQuestion() {
  // Removes previous question's options
  while (options.children.length > 0) {
    options.removeChild(options.firstChild);
  }
  let choices = questions[questionNum].options;
  // Writes question text to the page
  question.textContent = questions[questionNum].question;

  // Creates buttons, adds options text, then adds them to options div
  for (let i = 0; i < choices.length; i++) {
    let btn = document.createElement("button");
    btn.innerText = choices[i];
    options.appendChild(btn);
  }
}

// Checks to see if user's choice was correct or wrong
function evaluate(e) {
  e.preventDefault();
  let choice = e.target.textContent;

  // Let's user know if they got the question right or wrong
  if (choice === questions[questionNum].answer) {
    rightWrong.textContent = "Correct!";
  } else {
    rightWrong.textContent = "Wrong!";
    secondsLeft = secondsLeft - 10;
  }
  // Goes on to the next question
  questionNum++;
  // Checks to see if there are any further questions, game over if not
  if (!questions[questionNum]) {
    clearInterval(timerInterval);
    score.textContent = secondsLeft;
    gameOver();
  } else {
    setQuestion();
  }
}

// Ends the quiz
function gameOver() {
  // Hides questions and countdown timer, shows endPage
  quizzer.classList.toggle("hidden");
  endPage.classList.toggle("hidden");
  document.getElementById("countdown").classList.add("hidden");

  // Listen for click to enter initials for the high scores
  submitBtn.addEventListener("click", saveScore);
}

function saveScore() {
  let userScore = [initials.textContent, secondsLeft];
  for (let i = 0; i < savedScores.length; i++) {
    if (savedScores[i][1] < userScore[1]) {
      savedScores.splice(i, 0, userScore);
      if (savedScores.length > 10) {
        savedScores.pop();
      }
      break;
    }
  }
  localStorage.setItem("highScores", savedScores);


}

goLocal();

// Listen for click to select answer to question
options.addEventListener("click", evaluate);

// Listen for click event on Start Quiz button
startBtn.addEventListener("click", setTime);
