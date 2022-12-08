/* eslint-disable max-lines-per-function */
function Greeter(name) {
  this.name = name;
  this.morning = 'Good Morning';
  this.afternoon = 'Good Afternoon';
  this.evening = 'Good Evening';
}

Greeter.prototype.greet = function(timeOfDay) {
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
};


let helloVictor = new Greeter('Victor');
helloVictor.greet('morning');

// Good Morning Victor