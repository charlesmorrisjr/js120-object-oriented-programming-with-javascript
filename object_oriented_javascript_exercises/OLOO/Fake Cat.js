let catPrototype = {
  speaks() {
    return `${this.name} says meowwww.`;
  },

  init(name) {
    this.name = name;
    return this;
  },
};

let fakeCat = Object.create(catPrototype).init();
console.log(catPrototype.isPrototypeOf(fakeCat)); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.