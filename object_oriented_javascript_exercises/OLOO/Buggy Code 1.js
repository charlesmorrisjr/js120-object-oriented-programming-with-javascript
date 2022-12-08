/* eslint-disable max-lines-per-function */
let Greeter = {
  init(name) {
    this.name = name;
    this.morning = 'Good Morning';
    this.afternoon = 'Good Afternoon';
    this.evening = 'Good Evening';
    return this;
  },

  greet(timeOfDay) {
    let msg = '';
    switch (timeOfDay) {
      case 'morning':
        msg += `${this.morning} ${this.name}`;
        break;
      case 'afternoon':
        msg += `${this.afternoon} ${this.name}`;
        break;
      case 'evening':
        msg += `${this.evening} ${this.name}`;
        break;
    }

    console.log(msg);
  },
};

let helloVictor = Object.create(Greeter).init('Victor');
helloVictor.greet('morning');

// Good Morning Victor