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

  getValue() {
    if (['J', 'Q', 'K'].includes(this.value)) {
      return 10;
    } else if (this.value === 'A') {
      return 11;
    } else {
      return Number(this.value);
    }
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

class Participant {
  constructor() {
    this.initializeHand();
  }

  initializeHand() {
    this.hand = [];
    this.score = 0;
  }

  displayHand(hideSecondCard) {
    this.hand.forEach((card, idx) => {
      if (idx === 1 && hideSecondCard === true) {
        console.log('  Hidden');
      } else {
        console.log(`  ${card.value}${card.getSuit()}`);
      }
    });
  }

  totalValue() {
    let values = this.hand.map(card => card.value);

    let sum = 0;
/*

    values.forEach(value => {
      if (['J', 'Q', 'K'].includes(value)) {
        sum += 10;
      } else if (value === 'A') {
        sum += 11;
      } else {
        sum += Number(value);
      }
    });
*/
    this.hand.forEach(card => {
      sum += card.getValue();
    });
    // Correct for aces
    values.filter(value => value === 'A').forEach(_ => {
      if (sum > this.MAX_HAND_VALUE) sum -= 10;
    });

    return sum;
  }
}

class Player extends Participant {
  constructor() {
    super();

    this.money = 5;
  }

  static MAX_HAND_VALUE = 21;

  hit() {
  }

  stay() {
    //STUB
  }

  isBusted() {
    return this.totalValue() > Player.MAX_HAND_VALUE;
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

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    super();
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    return this.totalValue() > Player.MAX_HAND_VALUE;
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  static DEALER_MAX = 17;
  static MAX_POINTS = 5;

  start() {
    this.displayWelcomeMessage();

    do {
      this.deck.initialize();
      this.player.initializeHand();
      this.dealer.initializeHand();
      this.dealCards();
      this.showCards(true);
      this.player.displayMoney();
      this.playerTurn();

      if (!this.player.isBusted()) {
        this.dealerTurn();
      }

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

  dealCards() {
    this.player.hand.push(...[this.deck.deal(), this.deck.deal()]);
    this.dealer.hand.push(...[this.deck.deal(), this.deck.deal()]);
  }

  showCards(hideDealerCards) {
    console.log('');
    console.log(`Dealer's Cards:`);
    console.log('');
    this.dealer.displayHand(hideDealerCards);
    console.log('');
    if (!hideDealerCards) {
      console.log(`  Score: ${this.dealer.totalValue()}`);
    } else {
      console.log(`  Score: ${this.dealer.hand[0].getValue()}`);
    }
    console.log('');
    console.log(`Player's Cards:`);
    console.log('');
    this.player.displayHand(false);
    console.log('');
    console.log(`  Score: ${this.player.totalValue()}`);
    console.log('');
  }

  playerTurn() {
    do {
      console.log('Hit (h) or stay (s)?');

      while (true) {
        let input = readline.question().toLowerCase();

        if (input === 'hit' || input === 'h') {
          this.player.hand.push(this.deck.deal());
          break;
        } else if (input === 'stay' || input === 's') {
          return;
        } else {
          console.log('That is not a valid choice.');
        }
      }
      console.clear();
      this.showCards(true);
    } while (!this.player.isBusted());
  }

  dealerTurn() {
    do {
      if (this.dealer.totalValue() < TwentyOneGame.DEALER_MAX) {
        this.dealer.hand.push(this.deck.deal());
      } else {
        break;
      }
      console.clear();
      this.showCards(false);

      readline.question('Press Return to continue....');
    } while (!this.dealer.isBusted());

    console.clear();
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
    if (this.player.isBusted()) {
      console.log('You busted! The dealer wins.');
      this.player.money -= 1;
    } else if (this.dealer.isBusted()) {
      console.log('Dealer busted! You win!');
      this.player.money += 1;
    } else if (this.player.totalValue() > this.dealer.totalValue()) {
      console.log('You win!');
      this.player.money += 1;
    } else if (this.player.totalValue() < this.dealer.totalValue()) {
      console.log('You lose!');
      this.player.money -= 1;
    } else if (this.player.totalValue() === this.dealer.totalValue()) {
      console.log("It's a tie!");
    }
  }
}

let game = new TwentyOneGame();
game.start();