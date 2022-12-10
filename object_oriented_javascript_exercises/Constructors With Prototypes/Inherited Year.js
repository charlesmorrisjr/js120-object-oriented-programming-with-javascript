function Vehicle(year) {
  this.year = year;
}

function Truck(year) {
  Vehicle.call(this, year);
}

Truck.prototype.constructor = Truck;

function Car(year) {
  Vehicle.call(this, year);
}

Car.prototype.constructor = Car;

let truck = new Truck(2003);
console.log(truck.year); // 2003

let car = new Car(2015);
console.log(car.year); // 2015