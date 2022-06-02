var grid = document.getElementById("grid");
var msg = document.querySelector(".message");
var win = document.querySelector(".wins");
var lose = document.querySelector(".lose");
var draw = document.querySelector(".draw");
var chooser = document.querySelector("form");
// console.log(chooser)
var mark;
var cells;

let p;
// add click listener to radio buttons
function setPlayer() {
  mark = this.value;

  p = this.value;
  msg.textContent = mark + ", click on a square to make your move!";
  chooser.classList.add("game-on");
  this.checked = false;
  buildGrid();
}
// add click listener to each cell
function playerMove() {
  if (this.textContent == "") {
    this.textContent = mark;
    checkRow();
    switchMark();
    computerMove();
  }
}

// let the computer make the next move
function computerMove() {


  var emptyCells = [];
  var random;

  /*  for (var i = 0; i < cells.length; i++) {
    if (cells[i].textContent == '') {
      emptyCells.push(cells[i]);
    }
  }*/

  cells.forEach(function (cell) {
    if (cell.textContent == "") {
      emptyCells.push(cell);
    }
  });

  // computer marks a random EMPTY cell
  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].textContent = mark;
  checkRow();
  switchMark();
}

// switch player mark
function switchMark() {
  if (mark == "X") {
    mark = "O";
  } else {
    mark = "X";
  }
}

// determine a winner
var flag = false;
function winner(a, b, c) {

  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
    msg.textContent = mark + " is the winner!";

    if (p == mark) {
      win.textContent = parseInt(win.innerHTML) + 1;
      // sendData(win.textContent, lose.textContent, p, "win");
    }
    else {
      lose.textContent = parseInt(lose.innerHTML) + 1;
      // sendData(win.textContent, lose.textContent, p, "lose");
    }

    a.classList.add("winner");
    b.classList.add("winner");
    c.classList.add("winner");
    flag = true;
    const winnerEvent = new CustomEvent("winner", {
      detail: {
        mark: mark,
        wins: win.textContent,
        losses: lose.textContent,
      },
    });

    window.dispatchEvent(winnerEvent);

    return true;
  }
  // } else if() {
  //   console.log("hi");
  //   // const Event = new CustomEvent("winner");
  //  // draw.textContent =parseInt(draw.innerHTML)+1;
  //   return false;
  // }
  else {
    // console.log()
    return false;
  }
}

// check cell combinations
function checkRow() {
  if (!flag) {
    winner(
      document.getElementById("c1"),
      document.getElementById("c2"),
      document.getElementById("c3")
    );
    winner(
      document.getElementById("c4"),
      document.getElementById("c5"),
      document.getElementById("c6")
    );
    winner(
      document.getElementById("c7"),
      document.getElementById("c8"),
      document.getElementById("c9")
    );
    winner(
      document.getElementById("c1"),
      document.getElementById("c4"),
      document.getElementById("c7")
    );
    winner(
      document.getElementById("c2"),
      document.getElementById("c5"),
      document.getElementById("c8")
    );
    winner(
      document.getElementById("c3"),
      document.getElementById("c6"),
      document.getElementById("c9")
    );
    winner(
      document.getElementById("c1"),
      document.getElementById("c5"),
      document.getElementById("c9")
    );
    winner(
      document.getElementById("c3"),
      document.getElementById("c5"),
      document.getElementById("c7")
    );
  }
}

// clear the grid
function resetGrid() {
  flag = false;
  mark = "X";
  /* for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].classList.remove('winner');
  }*/
  cells.forEach(function (cell) {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  msg.textContent = "Choose your player:";
  chooser.classList.remove("game-on");
  grid.innerHTML = "";
}

// build the grid
function buildGrid() {
  for (var i = 1; i <= 9; i++) {
    var cell = document.createElement("li");
    cell.id = "c" + i;
    cell.addEventListener("click", playerMove, false);
    grid.appendChild(cell);
  }
  /* cells = document.querySelectorAll('li'); //Returns a NodeList, not an Array
  See https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches */
  cells = Array.prototype.slice.call(grid.getElementsByTagName("li"));
}

var players = Array.prototype.slice.call(
  document.querySelectorAll("input[name=player-choice]")
  // console.log(document.querySelectorAll("input[name=player-choice]"))
);
players.forEach(function (choice) {
  choice.addEventListener("click", setPlayer, false);
});
console.log(players);


var resetButton = chooser.querySelector("button");
resetButton.addEventListener("click", function (e) {
  // total++;
  e.preventDefault();
  resetGrid();
});
