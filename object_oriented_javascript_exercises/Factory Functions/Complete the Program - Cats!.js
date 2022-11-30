function createPet(name, age) {
  return {
    name,
    age,
  };
}

function createCat(name, age, fur) {
  let cat = createPet(name, age);
  cat.fur = fur;

  cat.info = function() {
    return `My cat ${this.name} is ${this.age} years old and has ${this.fur} fur.`;
  };

  return cat;
}

let pudding = new createCat('Pudding', 7, 'black and white');
let butterscotch = new createCat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.