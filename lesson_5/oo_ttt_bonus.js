/* eslint-disable max-len */
let readline = require("readline-sync");

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.reset();
  }

  reset() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter++) {
      this.squares[counter] = new Square();
    }
  }

  display() {
    console.log("");
    console.log('(1)  | (2) |  (3)');
    console.log(`  ${this.squares[1]}  |  ${this.squares[2]}  |  ${this.squares[3]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log('(4)  | (5) |  (6)');
    console.log(`  ${this.squares[4]}  |  ${this.squares[5]}  |  ${this.squares[6]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log('(7)  | (8) |  (9)');
    console.log(`  ${this.squares[7]}  |  ${this.squares[8]}  |  ${this.squares[9]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log('');
    this.display();

  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  IsFull() {
    let unusedSquares = this.unusedSquares();
    return unusedSquares.length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }

}

class Player {
  constructor(marker) {
    this.marker = marker;
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  addPoint() {
    this.score += 1;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];

  static MATCHES_TO_WIN = 3;

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.firstPlayer = this.human;
  }

  static joinOr(arr, delimiter = ', ', word = 'or') {
    switch (arr.length) {
      case 0:
        return '';
      case 1:
        return `${arr[0]}`;
      case 2:
        return arr.join(` ${word} `);
      default:
        return arr.slice(0, arr.length - 1).join(delimiter) +
               `${delimiter}${word} ${arr[arr.length - 1]}`;
    }
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneGame();

      if (this.wonGame()) break;
      if (!this.playAgain()) break;

      if (this.firstPlayer === this.human) {
        this.firstPlayer = this.computer;
      } else if (this.firstPlayer === this.computer) {
        this.firstPlayer = this.human;
      }
    }

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.board.reset();
    this.board.display();
    this.displayScore();

    let currentPlayer = this.firstPlayer;

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      this.displayScore();

      currentPlayer = this.swapCurrentPlayer(currentPlayer);
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Tic Tac Toe!");
    console.log('');
    console.log(`First to win ${TTTGame.MATCHES_TO_WIN} matches wins!`);
  }

  displayGoodbyeMessage() {
    console.log("\nThanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      this.human.addPoint();
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      this.computer.addPoint();
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  playerMoves(player) {
    if (player === this.human) {
      this.humanMoves();
    } else if (player === this.computer) {
      this.computerMoves();
    }
  }

  swapCurrentPlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `\nChoose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice;

    if (this.findAtRiskSquare(Square.COMPUTER_MARKER) !== null) {              // Offense
      choice = this.findAtRiskSquare(Square.COMPUTER_MARKER);
    } else if (this.findAtRiskSquare(Square.HUMAN_MARKER) !== null) {          // Defense
      choice = this.findAtRiskSquare(Square.HUMAN_MARKER);
    } else if (this.board.squares['5'].getMarker() === Square.UNUSED_SQUARE) {                       // Pick middle square
      choice = 5;
    } else {                                                                   // Random square
      let validChoices = this.board.unusedSquares();

      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.IsFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  playAgain() {
    console.log('');
    console.log('Play again? (y/n)');

    while (true) {
      let input = readline.question().toLowerCase();

      if (input === 'y') {
        console.clear();
        console.log('');
        return true;
      } else if (input === 'n') {
        return false;
      } else {
        console.log('Please input "y" or "n".');
      }
    }
  }

  resetBoard() {
    this.board.reset();
  }

  findAtRiskSquare(currentMarker) {
    for (let combo of TTTGame.POSSIBLE_WINNING_ROWS) {
      let currentCombo = combo.map(square => this.board.squares[square].getMarker());

      if (
        currentCombo.filter(marker => marker === currentMarker).length === 2 &&
        currentCombo.includes(Square.UNUSED_SQUARE)
      ) {
        let emptySquare = combo.find(element =>
          this.board.squares[element].getMarker() === Square.UNUSED_SQUARE
        );

        return String(emptySquare);
      }
    }

    return null;
  }

  displayScore() {
    console.log(`Player's score: ${this.human.score}`);
    console.log(`Computer's score: ${this.computer.score}`);
  }

  wonGame() {
    if (this.human.score === TTTGame.MATCHES_TO_WIN) {
      console.log(`You won ${TTTGame.MATCHES_TO_WIN} matches! You win the game!`);
      return true;
    } else if (this.computer.score === TTTGame.MATCHES_TO_WIN) {
      console.log(`The computer won ${TTTGame.MATCHES_TO_WIN} matches! You lost the game!`);
      return true;
    }
    return false;
  }
}

let game = new TTTGame();
game.play();

