function Pet(name, age) {
  this.name = name;
  this.age = age;
}

function Cat(name, age, fur) {
  Pet.call(this, name, age);
  this.fur = fur;
}

Cat.prototype = Object.create(Pet.prototype);
Cat.prototype.constructor = Pet;

Cat.prototype.info = function() {
  return `My cat ${this.name} is ${this.age} years old and has ${this.fur} fur.`;
};

let pudding = new Cat('Pudding', 7, 'black and white');
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.