const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6]  // diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
}

function handleClick(e) {
  const cell = e.target;
  const index = [...cells].indexOf(cell);
  
  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => boardState[index] === player);
  });
}

restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  startGame();
});

startGame();
