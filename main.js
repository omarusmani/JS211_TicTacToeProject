'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
const { Console } = require('console');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const horizontalWin = () => {
    if(board[0][0]==board[0][1]&&board[0][1]==board[0][2]){
      return true;
    }
    else if(board[1][0]==board[1][1]&&board[1][1]==board[1][2]){
      return true;
    }
    else if(board[2][0]==board[2][1]&&board[2][1]==board[2][2]){
      return true;
    }

  // Your code here to check for horizontal wins
}

const verticalWin = () => {
  if(board[0][0]==board[1][0]&&board[1][0]==board[2][0]){
    return true;
  }
  else if(board[0][1]==board[1][1]&&board[1][1]==board[2][1]){
    return true;
  }
  else if(board[0][2]==board[1][2]&&board[1][2]==board[2][2]){
    return true;
  }


  // Your code here to check for vertical wins
}

const diagonalWin = () => {
  if(board[0][0]==board[1][1]&&board[1][1]==board[2][2]){
    return true;
  }
  else if(board[0][2]==board[1][1]&&board[1][1]==board[2][0]){
    return true;
  }

  // Your code here to check for diagonal wins
}

const checkForWin = () => {
  if(diagonalWin()||horizontalWin()||verticalWin()){
    return true;
  }
  // Your code here call each of the check for types of wins
}

const ticTacToe = (row, column) => {
  let legal=["0","1","2"]//all inputs are chars so array had to be a 
  if(!legal.includes(row)&&!legal.includes(column)){
      console.log("Please Enter a Legal Number")
    }
    else if(board[row][column]!=" "){
        console.log("Nice Try, This Field is Occupied")//Checking for occupied fields
    }
        board[row][column]=playerTurn;
        checkForWin();
        if(playerTurn=="X"){
          playerTurn='O'
        }
        else{
          playerTurn='X'
        }
  
  // Your code here to place a marker on the board
  // then check for a win
}

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      ticTacToe(0, 0)
      ticTacToe(0, 1)
      ticTacToe(1, 1)
      ticTacToe(0, 2)
      ticTacToe(2, 2)
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
