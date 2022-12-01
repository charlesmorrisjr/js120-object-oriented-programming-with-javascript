let Animal = {
  init(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
    return this;
  },

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
};

let Cat = Object.create(Animal);

Cat.init = function(name, age, status) {
  Animal.init.call(this, name, age, 4, 'cat', status);
  return this;
};

Cat.introduce = function() {
  return Animal.introduce.call(this) + ' Meow meow!';
};

let Dog = Object.create(Animal);

Dog.init = function(name, age, status, master) {
  Animal.init.call(this, name, age, 4, 'dog', status);
  this.master = master;
  return this;
};

Dog.greetMaster = function() {
  return `Hello ${this.master}! Woof woof!`;
};

let cat = Object.create(Cat).init("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

let dog = Object.create(Dog).init('Fido', 3, "sad", 'John');
console.log(dog.introduce());
console.log(dog.greetMaster());