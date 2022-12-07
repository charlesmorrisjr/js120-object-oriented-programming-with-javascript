function createBeing(name) {
  return {
    name,

    walk() {
      return `${this.name} ${this.gait()} forward.`;
    }
  };
}

function createPerson(name) {
  let person = createBeing(name);
  person.gait = function() {
    return "strolls";
  };
  return person;
}

function createCat(name) {
  let cat = createBeing(name);
  cat.gait = function() {
    return "saunters";
  };
  return cat;
}

function createCheetah(name) {
  let cheetah = createBeing(name);

  cheetah.gait = function() {
    return "runs";
  };

  return cheetah;
}

let mike = createPerson("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = createCat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = createCheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"