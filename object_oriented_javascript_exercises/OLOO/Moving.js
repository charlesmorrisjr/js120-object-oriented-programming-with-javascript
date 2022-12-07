let Being = {
  init(name) {
    this.name = name;
    return this;
  },

  walk() {
    return `${this.name} ${this.gait()} forward.`;
  }
};

let Person = Object.create(Being);
Person.init = function(name) {
  Being.init.call(this, name);
  return this;
};

Person.gait = function() {
  return "strolls";
};

let Cat = Object.create(Being);
Cat.init = function(name) {
  Being.init.call(this, name);
  return this;
};

Cat.gait = function() {
  return "saunters";
};

let Cheetah = Object.create(Being);
Cheetah.init = function(name) {
  Being.init.call(this, name);
  return this;
};

Cheetah.gait = function() {
  return "runs";
};

let mike = Object.create(Person).init("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = Object.create(Cat).init("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = Object.create(Cheetah).init("Flash");
console.log(flash.walk());
// "Flash runs forward"