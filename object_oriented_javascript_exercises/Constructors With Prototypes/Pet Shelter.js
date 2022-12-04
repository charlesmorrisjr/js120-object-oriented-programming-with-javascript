function Pet(type, name) {
  this.type = type;
  this.name = name;
}

function Owner(name) {
  this.name = name;
  this.petList = [];
  this.numPets = 0;
}

Owner.prototype = {
  addPet(pet) {
    this.petList.push(pet);
    this.numPets += 1;
  },

  numberOfPets() {
    return this.numPets;
  }
};

function Shelter() {
  this.ownerList = [];
}

Shelter.prototype = {
  adopt(owner, pet) {
    if (!this.ownerList.includes(owner)) {
      this.ownerList.push(owner);
    }
    owner.addPet(pet);
  },

  printAdoptions() {
    this.ownerList.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.petList.forEach(pet => console.log(`A ${pet.type} named ${pet.name}.`));
      console.log('');
    });
  },
};

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.