const clearScoresBtn = document.getElementById("clear-scores");

function showScores() {
  let savedScores = localStorage.getItem("high-scores");

  savedScores.forEach((entry) => {
    let x = document.createElement("li");
    x.textContent = entry[0] + " ----- " + entry[1];
    document.getElementById("high-score").appendChild(x);
  });
}

function clearScores() {
  let list = document.getElementById("high-score");
  while (list.children.length > 0) {
    list.removeChild(list.firstChild);
  }
  localStorage.removeItem("highScores");
}

showScores();

clearScoresBtn.addEventListener("click", clearScores);
