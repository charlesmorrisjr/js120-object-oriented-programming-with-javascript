function createVehicle(make, model, wheels) {
  return {
    make,
    model,
    wheels,

    getWheels() {
      return this.wheels;
    },

    info() {
      return `${this.make} ${this.model}`;
    }
  };
}

function createCar(make, model) {
  return createVehicle(make, model, 4);
}

function createMotorcycle(make, model) {
  return createVehicle(make, model, 2);
}

function createTruck(make, model, payload) {
  let truck = createVehicle(make, model, 6);
  truck.payload = payload;
  return truck;
}

let car = createCar('honda', 'civic');
let motorcycle = createMotorcycle('honda', 'cbr');
let truck = createTruck('chevy', 'silverado', 4000);

console.log(car.info());
console.log(car.getWheels());
console.log(motorcycle.info());
console.log(motorcycle.getWheels());
console.log(truck.info());
console.log(truck.getWheels());
