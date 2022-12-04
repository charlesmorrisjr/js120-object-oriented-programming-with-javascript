function createPet(type, name) {
  return {
    type,
    name,
  };
}

function createOwner(name) {
  return {
    name,
    petList: [],
    numPets: 0,

    addPet(pet) {
      this.petList.push(pet);
      this.numPets += 1;
    },

    numberOfPets() {
      return this.numPets;
    },
  };
}

function createShelter() {
  return {
    ownerList: [],

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
}

let butterscotch = createPet('cat', 'Butterscotch');
let pudding      = createPet('cat', 'Pudding');
let darwin       = createPet('bearded dragon', 'Darwin');
let kennedy      = createPet('dog', 'Kennedy');
let sweetie      = createPet('parakeet', 'Sweetie Pie');
let molly        = createPet('dog', 'Molly');
let chester      = createPet('fish', 'Chester');

let phanson = createOwner('P Hanson');
let bholmes = createOwner('B Holmes');

let shelter = createShelter();
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