const readline = require('readline-sync');

const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const SHORT_CHOICES = ['r', 'p', 'sc', 'l', 'sp'];
const MAX_SCORE = 5;

const COMPUTER_CHOICE_SUB_WEIGHT = 0.1;
const COMPUTER_CHOICE_ADD_WEIGHT = 0.1;
const COMPUTER_MIN_CHANCE = 0;
const COMPUTER_MAX_CHANCE = 0.8;

const WINNING_COMBOS = {
  rock:     ['scissors',  'lizard'],
  paper:    ['rock',      'spock'],
  scissors: ['paper',     'lizard'],
  lizard:   ['paper',     'spock'],
  spock:    ['rock',      'scissors'],
};

function createPlayer() {
  return {
    move: null,
    score: 0,
    name: '',
    moveHistory: [],

    displayScore() {
      console.log(`${this.name} score: ${this.score}`);
    },

    addMoveToHistory() {
      this.moveHistory.push(this.move);
    },

    displayMoveHistory() {
      let displayHistory = this.moveHistory.filter((_, idx) =>
        this.moveHistory.length - idx <= 5);

      console.log(`${this.name} previous 5 moves:`);
      console.log(displayHistory);
      console.log('');
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
        console.log(`Choose one: ${VALID_CHOICES.join(', ')}`);
        console.log(`You can enter the full name, or used shortened input: ${SHORT_CHOICES.join(', ')}`);

        choice = readline.question('');

        if (VALID_CHOICES.includes(choice)) {
          this.move = choice;
          break;
        } else if (SHORT_CHOICES.includes(choice)) {
          this.move = VALID_CHOICES[SHORT_CHOICES.indexOf(choice)];
          break;
        }
        console.log('Sorry, invalid choice.');
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
    choiceWeight: [0.2, 0.2, 0.2, 0.2, 0.2],
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
      for (let idx = 0; idx < VALID_CHOICES.length; idx++) {
        if (this.lostHands.filter(hand => VALID_CHOICES[idx] === hand).length > 1) {
        // if (this.lostHands.includes(VALID_CHOICES[idx])) {
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

          // this.lostHands = this.lostHands.filter(hand => hand !== VALID_CHOICES[idx]);
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
    console.log('Welcome to Rock, Paper, Scissors, Spock, Lizard!\n');
  },

  displayGoodbyeMessage() {
    console.log('\nThanks for playing Rock, Paper, Scissors, Spock, Lizard. Goodbye!');
  },

  playerWins(player1Choice, player2Choice) {
    return WINNING_COMBOS[player1Choice].includes(player2Choice);
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}\n`);

    if (this.playerWins(this.human.move, this.computer.move)) {
      console.log('You win!\n');
      this.computer.addMoveToLostHands();
      this.human.score += 1;
    } else if (this.playerWins(this.computer.move, this.human.move)) {
      console.log('Computer wins!\n');
      this.computer.score += 1;
    } else {
      console.log("It's a tie.\n");
    }
  },

  checkWinner() {
    if (this.human.score === MAX_SCORE) {
      console.log('You won the game!\n');
      return true;
    } else if (this.computer.score === MAX_SCORE) {
      console.log('You lost the game!\n');
      return true;
    }

    return false;
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');

    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.human.displayScore();
      this.human.displayMoveHistory();
      this.computer.displayScore();
      this.computer.displayMoveHistory();

      this.human.choose();
      this.computer.choose();

      // console.log(this.computer.lostHands);
      // console.log(this.computer.choiceWeight.map(num => +(num.toFixed(3))));
      console.log('');

      this.displayWinner();

      if (this.checkWinner() || !this.playAgain()) break;

      console.clear();
    }

    this.human.displayScore();
    this.computer.displayScore();

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
