function Vehicle(make, model, wheels) {
  this.make = make;
  this.model = model;
  this.wheels = wheels;
}

Vehicle.prototype = {
  getWheels() {
    return this.wheels;
  },

  info() {
    return `${this.make} ${this.model}`;
  },
};

function Car(make, model) {
  Vehicle.call(this, make, model, 4);
}

Car.prototype = Object.create(Vehicle.prototype);

function Motorcycle(make, model) {
  Vehicle.call(this, make, model, 2);
}

Motorcycle.prototype = Object.create(Vehicle.prototype);

function Truck(make, model, payload) {
  Vehicle.call(this, make, model, 6);
  this.payload = payload;
}

Truck.prototype = Object.create(Vehicle.prototype);

let car = new Car('honda', 'civic');
let motorcycle = new Motorcycle('honda', 'cbr');
let truck = new Truck('chevy', 'silverado', 4000);

console.log(car.info());
console.log(car.getWheels());
console.log(motorcycle.info());
console.log(motorcycle.getWheels());
console.log(truck.info());
console.log(truck.getWheels());
