class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }

  getWheels() {
    return this.wheels;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}

let car = new Car('Honda', 'Civic');
let motorcycle = new Motorcycle('Kawasaki', 'ZX6R');
let truck = new Truck('Ford', 'F350');

console.log(car.getWheels());
console.log(car.info());

console.log(motorcycle.getWheels());
console.log(motorcycle.info());

console.log(truck.getWheels());
console.log(truck.info());