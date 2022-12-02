let Vehicle = {
  init(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
    return this;
  },

  getWheels() {
    return this.wheels;
  },

  info() {
    return `${this.make} ${this.model}`;
  },
};

let Car = Object.create(Vehicle);

Car.init = function(make, model) {
  Vehicle.init.call(this, make, model, 4);
  return this;
};

let Motorcycle = Object.create(Vehicle);

Motorcycle.init = function(make, model) {
  Vehicle.init.call(this, make, model, 2);
  return this;
};

let Truck = Object.create(Vehicle);

Truck.init = function(make, model, payload) {
  Vehicle.init.call(this, make, model, 6);
  this.payload = payload;
  return this;
};

let car = Object.create(Car).init('honda', 'civic');
let motorcycle = Object.create(Motorcycle).init('honda', 'cbr');
let truck = Object.create(Truck).init('chevy', 'silverado', 4000);

console.log(car.info());
console.log(car.getWheels());
console.log(motorcycle.info());
console.log(motorcycle.getWheels());
console.log(truck.info());
console.log(truck.getWheels());
