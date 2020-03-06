// document.addEventListener('DOMContentLoaded', startGame)
// // Define your `board` object here!
// var board = {
//     cells: [
//         {
//             row: 0,
//             col: 0,
//             isMine: false,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 0,
//             col: 1,
//             isMine: true,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 0,
//             col: 2,
//             isMine: false,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 1,
//             col: 0,
//             isMine: false,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 1,
//             col: 1,
//             isMine: false,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 1,
//             col: 2,
//             isMine: false,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 2,
//             col: 0,
//             isMine: true,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 2,
//             col: 1,
//             isMine: false,
//             hidden: true,
//             isMarked: false
//         },
//         {
//             row: 2,
//             col: 2,
//             isMine: true,
//             hidden: true,
//             isMarked: false
//         },
//     ]
// }

function boardCreator() {
    //size 2 = 2x2, 3 = 3x3 and so on
    size = document.getElementById("boardSize").value
    difficulty = document.getElementById("difficulty").value
    var board = {}
    board.cells = []
    var index = 0
    for (i = 0 ; i < size ; i++) {
        for (j = 0 ; j < size ; j++) {
            board.cells[index] = {};
            board.cells[index].row = i;
            board.cells[index].col = j;
            board.cells[index].isMine = (Math.random() < difficulty);
            board.cells[index].hidden = true;
            board.cells[index].isMarked = false;
            index++
        }
    }
    return(board)
}

function initiate() {
    board = boardCreator()
    startGame()
    document.getElementById('startButton').createAttribute('disabled')
}

function startGame() {
  // Don't remove this function call: it makes the game work!
  for (i=0 ; i<board.cells.length ; i++) {
      board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  console.log(board.cells)
  document.addEventListener('click', checkForWin);
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function unhidden(arr) {
    return arr.every(cell => cell.hidden == false);
}

function bombChecked(arr) {
    return arr.every(cell => cell.isMarked == true);
}

function checkForWin () {
    if (
        unhidden(board.cells.filter(cell => cell.isMine == false)) &&
        bombChecked(board.cells.filter(cell => cell.isMine == true))
    ) lib.displayMessage('You win!')
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
    var count = 0;
    var surroundingCells = getSurroundingCells(cell.row, cell.col);
    for (j=0 ; j<surroundingCells.length ; j++) {
        if (surroundingCells[j].isMine) {
            count++
        }
    }
    return count;
}
