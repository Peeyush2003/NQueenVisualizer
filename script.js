
let board = [];
let size = 8;
let speed = 300;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createBoard(n) {
  const boardContainer = document.getElementById('board');
  boardContainer.innerHTML = '';
  boardContainer.style.gridTemplateColumns = `repeat(${n}, 50px)`;
  board = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell ' + ((i + j) % 2 === 0 ? 'white' : 'gray');
      cell.id = `cell-${i}-${j}`;
      boardContainer.appendChild(cell);
    }
  }
}

function clearBoard() {
  const gridSize = document.getElementById("gridSize").value;
  createBoard(parseInt(gridSize));
}

function updateCell(i, j, type) {
  const cell = document.getElementById(`cell-${i}-${j}`);
  cell.className = `cell ${type}`;
  cell.innerHTML = type === "queen" ? "♕" : "";
}

function isSafe(row, col, n) {
  for (let i = 0; i < col; i++)
    if (board[row][i] === 1) return false;
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (board[i][j] === 1) return false;
  for (let i = row, j = col; i < n && j >= 0; i++, j--)
    if (board[i][j] === 1) return false;
  return true;
}

async function solve(col, n) {
  if (col >= n) return true;
  for (let i = 0; i < n; i++) {
    if (isSafe(i, col, n)) {
      board[i][col] = 1;
      updateCell(i, col, "queen");
      await delay(speed);
      if (await solve(col + 1, n)) return true;
      board[i][col] = 0;
      updateCell(i, col, (i + col) % 2 === 0 ? "white" : "gray");
      await delay(speed);
    }
  }
  return false;
}

function startVisualization() {
  size = parseInt(document.getElementById("gridSize").value);
  speed = parseInt(document.getElementById("speedSlider").value);
  createBoard(size);
  solve(0, size);
}

// Initialize
window.onload = () => createBoard(8);
