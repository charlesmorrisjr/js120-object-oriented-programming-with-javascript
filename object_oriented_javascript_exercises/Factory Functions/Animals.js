function createAnimal(name, age, legs, species, status) {
  return {
    name,
    age,
    legs,
    species,
    status,

    introduce() {
      return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
    },
  };
}

function createCat(name, age, status) {
  let cat = createAnimal(name, age, 4, 'cat', status);

  cat.introduce = function() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}. Meow meow!`;
  };

  return cat;
}

function createDog(name, age, status, master) {
  let dog = createAnimal(name, age, 4, 'dog', status);

  dog.master = master;

  dog.greetMaster = function() {
    return `Hello ${master}! Woof woof!`;
  };

  return dog;
}

let cat = createCat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

let dog = createDog('Fido', 3, "sad", 'John');
console.log(dog.introduce());
console.log(dog.greetMaster());
