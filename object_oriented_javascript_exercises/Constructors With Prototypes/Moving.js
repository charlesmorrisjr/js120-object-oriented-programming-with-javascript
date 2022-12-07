function Being(name) {
  this.name = name;
}

Being.prototype.walk = function() {
  return `${this.name} ${this.gait()} forward.`;
};

function Person(name) {
  this.name = name;
}

Person.prototype = Object.create(Being.prototype);
Person.prototype.constructor = Person;

Person.prototype.gait = function() {
  return "strolls";
};

function Cat(name) {
  this.name = name;
}

Cat.prototype = Object.create(Being.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.gait = function() {
  return "saunters";
};

function Cheetah(name) {
  this.name = name;
}

Cheetah.prototype = Object.create(Being.prototype);
Cheetah.prototype.constructor = Cheetah;

Cheetah.prototype.gait = function() {
  return "runs";
};

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"