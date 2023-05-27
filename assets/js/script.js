// Get DOM elements to be used set as global variables
const startPage = document.getElementById("start-page");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("start-button");
const quizzer = document.getElementById("quizzer");
const question = document.getElementById("question");
const options = document.getElementById("options");
const endPage = document.getElementById("end-page");
const score = document.getElementById("score");
const initials = document.getElementById("initials");
const submitBtn = document.getElementById("submit-button");
const rightWrong = document.getElementById("right-wrong");
const highScores = document.getElementById("high-scores");
let timerInterval;
let secondsLeft = 75;
let questionNum = 0;

//highScores = localStorage.getItem(highScores);

// Make questions and answers into objects
const q1 = {
  question: "Commonly used data types DO NOT include:",
  options: ["strings", "booleans", "alerts", "numbers"],
  answer: "alerts",
};
const q2 = {
  question:
    "The condition in an if/else statement is enclosed within _____.",
  options: [
    "quotes",
    "braces (curly brackets)",
    "parentheses",
    "brackets (square/box brackets)",
  ],
  answer: "parentheses",
};
const q3 = {
  question: "Arrays in JavaScript can be used to store _____.",
  options: [
    "numbers and strings",
    "other arrays",
    "booleans",
    "all of the above",
  ],
  answer: "all of the above",
};
const q4 = {
  question:
    "String values must be enclosed within _____ when being assigned to variables.",
  options: ["commas", "braces (curly brackets)", "quotes", "parentheses"],
  answer: "quotes",
};
const q5 = {
  question:
    "A very useful tool used during development and debugging for printing content to the debugger is:",
  options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
  answer: "console.log",
};
// Put Q&A objects into array
const questions = [q1, q2, q3, q4, q5];

// Countdown timer, runs at 1 sec intervals starting at 75 secs
function setTime() {
  // Hides startPage, shows questions
  startPage.classList.add("hidden");
  quizzer.classList.toggle("hidden");

  setQuestion();

  // Starts the countdown timer
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft;

    // Game over if time runs out
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      score.textContent = secondsLeft;

      gameOver();
    }
  }, 1000);
}

// Iterates over questions array to display them in order
function setQuestion() {
  let choices = questions[questionNum].options;

  // Removes previous question's options
  while (options.children.length) {
    options.removeChild(options.firstChild);
  }

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
}

function saveScore() {
  const userScore = {
    initials: initials.value.toUpperCase(),
    score: secondsLeft,
  };

  if (!localStorage.getItem("highScores")) {
    localStorage.setItem("highScores");
  }
  const savedScores = JSON.parse(localStorage.getItem("highScores"));

  console.log(userScore);

  if (!savedScores) {
    localStorage.setItem("highScores", JSON.stringify([userScore]));
  } else {
    // Adds user's score to high scores if it is within the top ten
    for (let i = 0; i < savedScores.length; i++) {
      if (savedScores[i].score < userScore.score) {
        savedScores.splice(i, 0, userScore);
        if (savedScores.length > 10) {
          savedScores.pop();
        }
        break;
      } else if (savedScores[i].score === userScore.score) {
        savedScores.splice(i + 1, 0, userScore);
        if (savedScores.length > 10) {
          savedScores.pop();
        }
        break;
      }
    }

    // Adds user score to bottom of list if less than 10 high scores
    if (savedScores.length < 10 && !savedScores.includes(userScore)) {
      savedScores.push(userScore);
      localStorage.setItem("highScores", JSON.stringify(savedScores));
    }
  }
  document.location = "highscores.html";
}

// Listen for click to enter initials for the high scores
submitBtn.addEventListener("click", saveScore);

// Listen for click to select answer to question
options.addEventListener("click", evaluate);

// Listen for click event on Start Quiz button
startBtn.addEventListener("click", setTime);
