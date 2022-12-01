function Animal(name, age, legs, species, status) {
  this.name = name;
  this.age = age;
  this.legs = legs;
  this.species = species;
  this.status = status;
}

Animal.prototype.introduce = function() {
  return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
};

function Cat(name, age, status) {
  Animal.call(this, name, age, 4, 'cat', status);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.introduce = function() {
  return Animal.prototype.introduce.call(this) + ' Meow meow!';
};

function Dog(name, age, status, master) {
  Animal.call(this, name, age, 4, 'dog', status);
  this.master = master;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.greetMaster = function() {
  return `Hello ${this.master}! Woof woof!`;
};

let cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

let dog = new Dog('Fido', 3, "sad", 'John');
console.log(dog.introduce());
console.log(dog.greetMaster());
