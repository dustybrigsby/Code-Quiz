const clearScoresBtn = document.getElementById("clear-scores");
const list = document.getElementById("high-scores-list");
let savedScores = JSON.parse(localStorage.getItem("highScores"));

function showScores() {
  console.log("savedScores: " + savedScores);
  // console.log("list: " + list);

  if (savedScores === null) {
    let listItem = document.createElement("li");
    listItem.textContent = "No high scores yet!";
    // console.log("listItem: " + listItem);
    list.appendChild(listItem);
  } else {
    // Makes list item for each high score entry
    savedScores.forEach((entry) => {
      let listItem = document.createElement("li");
      listItem.textContent = entry.initials + " ----- " + entry.score;
      list.appendChild(listItem);
    });
  }
}

function clearScores() {
  if (list) {
    while (list.children.length) {
      list.removeChild(list.firstChild);
    }
  }
  localStorage.removeItem("highScores");
}

showScores();

clearScoresBtn.addEventListener("click", clearScores);
