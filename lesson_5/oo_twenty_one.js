/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
const readline = require('readline-sync');

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  static suits = ['H', 'S', 'C', 'D'];
  static values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  getSuit() {
    let name;

    if (this.suit === 'H') {
      name = ' of Hearts';
    } else if (this.suit === 'S') {
      name = ' of Spades';
    } else if (this.suit === 'C') {
      name = ' of Clubs';
    } else if (this.suit === 'D') {
      name = ' of Diamonds';
    }
    return name;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }

  initialize() {
    this.deck.length = 0;

    for (let suit of Card.suits) {
      Card.values.forEach(value => this.deck.push(new Card(suit, value)));
    }

    this.shuffle(this.deck);
  }

  shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
    }
  }

  deal() {
    return this.deck.pop();
  }
}

let Hand = {
  initializeHand() {
    this.hand = [];
    this.score = 0;
  },

  displayHand(hideSecondCard) {
    this.hand.forEach((card, idx) => {
      if (idx === 1 && hideSecondCard === true) {
        console.log('  Hidden');
      } else {
        console.log(`  ${card.value}${card.getSuit()}`);
      }
    });
  },
};

class Player {
  constructor() {
    this.initializeHand();

    this.money = 5;
  }

  displayMoney() {
    console.log(`You have $${this.money}`);
    console.log('');
  }

  isRich() {
    return this.money >= 10;
  }

  isBroke() {
    return this.money === 0;
  }
}

class Dealer {
  constructor() {
    this.initializeHand();
  }
}

Object.assign(Player.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  static MAX_HAND_VALUE = 21;
  static DEALER_MAX = 17;

  start() {
    this.displayWelcomeMessage();

    do {
      this.playOneGame();

      console.clear();
      this.showCards(false);
      this.displayResult();

      this.player.displayMoney();

      if (this.player.isRich() || this.player.isBroke()) break;

    } while (this.playAgain());

    if (this.player.isBroke()) {
      console.log("You're broke!");
    } else if (this.player.isRich()) {
      console.log("You're rich!");
    }

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.deck.initialize();
    this.player.initializeHand();
    this.dealer.initializeHand();
    this.dealCards();
    this.showCards(true);
    this.player.displayMoney();
    this.playerTurn();

    if (!this.isBusted(this.player)) {
      this.dealerTurn();
    }
  }

  hit(player) {
    player.hand.push(this.deck.deal());
  }

  dealCards() {
    this.hit(this.player);
    this.hit(this.player);
    this.hit(this.dealer);
    this.hit(this.dealer);
  }

  showCards(hideDealerCards) {
    console.log('');
    console.log(`Dealer's Cards:`);
    console.log('');
    this.dealer.displayHand(hideDealerCards);
    console.log('');
    if (!hideDealerCards) {
      console.log(`  Score: ${this.totalValue(this.dealer)}`);
    } else {
      console.log(`  Score: ${this.getValue(this.dealer.hand[0])}`);
    }
    console.log('');
    console.log(`Player's Cards:`);
    console.log('');
    this.player.displayHand(false);
    console.log('');
    console.log(`  Score: ${this.totalValue(this.player)}`);
    console.log('');
  }

  playerTurn() {
    do {
      console.log('Hit (h) or stay (s)?');

      while (true) {
        let input = readline.question().toLowerCase();

        if (input === 'hit' || input === 'h') {
          this.hit(this.player);
          break;
        } else if (input === 'stay' || input === 's') {
          return;
        } else {
          console.log('That is not a valid choice.');
        }
      }
      console.clear();
      this.showCards(true);
    } while (!this.isBusted(this.player));
  }

  dealerTurn() {
    do {
      if (this.totalValue(this.dealer) < TwentyOneGame.DEALER_MAX) {
        this.hit(this.dealer);
      } else {
        break;
      }
      console.clear();
      this.showCards(false);

      readline.question('Press Return to continue....');
    } while (!this.isBusted(this.dealer));

    console.clear();
  }

  getValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
      return 10;
    } else if (card.value === 'A') {
      return 11;
    } else {
      return Number(card.value);
    }
  }

  totalValue(player) {
    let sum = player.hand.map(card => this.getValue(card))
      .reduce((total, val) => total + val);

    let values = player.hand.map(card => card.value);

    values.filter(value => value === 'A').forEach(_ => {
      if (sum > TwentyOneGame.MAX_HAND_VALUE) sum -= 10;
    });

    return sum;
  }

  isBusted(player) {
    return this.totalValue(player) > TwentyOneGame.MAX_HAND_VALUE;
  }

  playAgain() {
    console.log('Play again? (y/n)');

    while (true) {
      let input = readline.question().toLowerCase();

      if (input === 'y') {
        console.clear();
        return true;
      } else if (input === 'n') {
        return false;
      } else {
        console.log('That choice is not valid.');
      }
    }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('');
    console.log('Welcome to 21!');
  }

  displayGoodbyeMessage() {
    console.log('');
    console.log('Thanks for playing! Goodbye!');
  }

  displayResult() {
    if (this.isBusted(this.player)) {
      console.log('You busted! The dealer wins.');
      this.player.money -= 1;
    } else if (this.isBusted(this.dealer)) {
      console.log('Dealer busted! You win!');
      this.player.money += 1;
    } else if (this.totalValue(this.player) > this.totalValue(this.dealer)) {
      console.log('You win!');
      this.player.money += 1;
    } else if (this.totalValue(this.player) < this.totalValue(this.dealer)) {
      console.log('You lose!');
      this.player.money -= 1;
    } else if (this.totalValue(this.player) === this.totalValue(this.dealer)) {
      console.log("It's a tie!");
    }
  }
}

let game = new TwentyOneGame();
game.start();