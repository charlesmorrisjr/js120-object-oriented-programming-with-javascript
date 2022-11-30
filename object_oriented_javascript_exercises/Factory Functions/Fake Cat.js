function createCat(name) {
  return {
    name,

    speaks() {
      return `${this.name} says meowwww.`;
    }
  };
}

let fakeCat = createCat();

console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.