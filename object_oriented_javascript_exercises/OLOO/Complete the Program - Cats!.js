let petPrototype = {
  init(name, age) {
    this.name = name;
    this.age = age;
  },
};

let catPrototype = Object.create(petPrototype);

catPrototype.init = function(name, age, fur) {
  petPrototype.init.call(this, name, age);
  this.fur = fur;
  return this;
};

catPrototype.info = function() {
  return `My cat ${this.name} is ${this.age} years old and has ${this.fur} fur.`;
};

let pudding = Object.create(catPrototype).init('Pudding', 7, 'black and white');
let butterscotch = Object.create(catPrototype).init('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.