/* eslint-disable max-statements */
/* eslint-disable max-len */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
const readline = require('readline-sync');

const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const SHORT_CHOICES = ['r', 'p', 'sc', 'l', 'sp'];
const MAX_SCORE = 5;

const COMPUTER_CHOICE_SUB_WEIGHT = 0.1;
const COMPUTER_CHOICE_ADD_WEIGHT = 0.1;
const COMPUTER_MIN_CHANCE = 0;
const COMPUTER_MAX_CHANCE = 0.8;
const INITIAL_WEIGHTS = [0.2, 0.2, 0.2, 0.2, 0.2];

const WINNING_COMBOS = {
  rock:     ['scissors',  'lizard'],
  paper:    ['rock',      'spock'],
  scissors: ['paper',     'lizard'],
  lizard:   ['paper',     'spock'],
  spock:    ['rock',      'scissors'],
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function createPlayer() {
  return {
    move: null,
    score: 0,
    name: '',
    moveHistory: [],

    displayScore() {
      prompt(`${this.name} score: ${this.score}/${MAX_SCORE}`);
    },

    addMoveToHistory() {
      this.moveHistory.push(this.move);
    },

    displayMoveHistory() {
      const NUM_MOVE_HISTORY = 5;

      let displayHistory = this.moveHistory.filter((_, idx) =>
        this.moveHistory.length - idx <= NUM_MOVE_HISTORY);

      prompt(`${this.name} previous ${NUM_MOVE_HISTORY} moves: ${displayHistory}\n`);
    },
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    name: 'Your',

    choose() {
      let choice;

      while (true) {
        prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
        prompt(`You can enter the full name, or used shortened input: ${SHORT_CHOICES.join(', ')}`);

        choice = readline.question('');

        if (VALID_CHOICES.includes(choice)) {
          this.move = choice;
          break;
        } else if (SHORT_CHOICES.includes(choice)) {
          this.move = VALID_CHOICES[SHORT_CHOICES.indexOf(choice)];
          break;
        }
        prompt('Sorry, invalid choice.\n');
      }

      this.addMoveToHistory();
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    name: "Computer's",
    choiceWeight: [...INITIAL_WEIGHTS],
    lostHands: [],

    choose() {
      this.calcChoiceWeight();

      let selectMove = -1;

      do {
        for (let idx = 0; idx < VALID_CHOICES.length; idx++) {
          let randomNum = Math.random();
          if (randomNum <= this.choiceWeight[idx]) {
            selectMove = idx;
          }
        }
      } while (selectMove < 0);
      this.move = VALID_CHOICES[selectMove];

      this.addMoveToHistory();
    },

    calcChoiceWeight() {
      const NUM_REPEATS = 1;

      for (let idx = 0; idx < VALID_CHOICES.length; idx++) {
        if (this.lostHands.filter(hand => VALID_CHOICES[idx] === hand).length > NUM_REPEATS) {
          if (this.choiceWeight[idx] - COMPUTER_CHOICE_SUB_WEIGHT > COMPUTER_MIN_CHANCE) {
            this.choiceWeight[idx] -= COMPUTER_CHOICE_SUB_WEIGHT;
          } else {
            this.choiceWeight[idx] = COMPUTER_MIN_CHANCE;
          }

          for (let idx2 = 0; idx2 < 5; idx2++) {
            if (idx2 !== idx) {
              if (this.choiceWeight[idx2] + COMPUTER_CHOICE_ADD_WEIGHT < COMPUTER_MAX_CHANCE) {
                this.choiceWeight[idx2] += COMPUTER_CHOICE_ADD_WEIGHT;
              } else {
                this.choiceWeight[idx2] = COMPUTER_CHOICE_ADD_WEIGHT;
              }
            }
          }

          this.lostHands.splice(this.lostHands.indexOf(VALID_CHOICES[idx]), 1);
          break;
        }
      }
    },

    addMoveToLostHands() {
      this.lostHands.push(this.move);
    },
  };

  return Object.assign(playerObject, computerObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.clear();
    prompt('Welcome to Rock, Paper, Scissors, Spock, Lizard!');
    prompt(`First player to reach a score of ${MAX_SCORE} wins!\n`);
  },

  displayGoodbyeMessage() {
    console.log('');
    prompt('Thanks for playing Rock, Paper, Scissors, Spock, Lizard. Goodbye!');
  },

  resetGame() {
    this.human.score = 0;
    this.human.moveHistory.length = 0;
    this.computer.score = 0;
    this.computer.choiceWeight = [...INITIAL_WEIGHTS];
    this.computer.moveHistory.length = 0;
    this.computer.lostHands.length = 0;
  },

  playerWins(player1Choice, player2Choice) {
    return WINNING_COMBOS[player1Choice].includes(player2Choice);
  },

  displayWinner() {
    prompt(`You chose: ${this.human.move}`);
    prompt(`The computer chose: ${this.computer.move}\n`);

    if (this.playerWins(this.human.move, this.computer.move)) {
      prompt('You win!\n');
      this.computer.addMoveToLostHands();
      this.human.score += 1;
    } else if (this.playerWins(this.computer.move, this.human.move)) {
      prompt('Computer wins!\n');
      this.computer.score += 1;
    } else {
      prompt("It's a tie.\n");
    }
  },

  displayGrandWinner() {
    console.log('');
    prompt('Final Score:');
    prompt(`${this.human.name} score: ${this.human.score}`);
    prompt(`${this.computer.name} score: ${this.computer.score}\n`);

    if (this.human.score === MAX_SCORE) {
      prompt('You won the game!\n');
    } else if (this.computer.score === MAX_SCORE) {
      prompt('You lost the game!\n');
    }
  },

  playerWon() {
    if (this.human.score === MAX_SCORE || this.computer.score === MAX_SCORE) return true;

    return false;
  },

  playAgain() {
    prompt('Would you like to play again? (y/n)');

    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    while (true) {
      this.displayWelcomeMessage();
      this.resetGame();

      do {
        this.human.displayScore();
        this.human.displayMoveHistory();
        this.computer.displayScore();
        this.computer.displayMoveHistory();

        this.human.choose();
        this.computer.choose();

        console.clear();
        this.displayWinner();
      } while (!this.playerWon());

      this.displayGrandWinner();

      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
