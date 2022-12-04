let Pet = {
  init(type, name) {
    this.type = type;
    this.name = name;
    return this;
  },
};

let Owner = {
  init(name) {
    this.name = name;
    this.numPets = 0;
    this.petList = [];
    return this;
  },

  numberOfPets() {
    return this.numPets;
  },

  addPet(pet) {
    this.petList.push(pet);
    this.numPets += 1;
  }
};

let Shelter = {
  init() {
    this.ownerList = [];
    return this;
  },

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
  }
};

let butterscotch = Object.create(Pet).init('cat', 'Butterscotch');
let pudding      = Object.create(Pet).init('cat', 'Pudding');
let darwin       = Object.create(Pet).init('bearded dragon', 'Darwin');
let kennedy      = Object.create(Pet).init('dog', 'Kennedy');
let sweetie      = Object.create(Pet).init('parakeet', 'Sweetie Pie');
let molly        = Object.create(Pet).init('dog', 'Molly');
let chester      = Object.create(Pet).init('fish', 'Chester');

let phanson = Object.create(Owner).init('P Hanson');
let bholmes = Object.create(Owner).init('B Holmes');

let shelter = Object.create(Shelter).init();
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