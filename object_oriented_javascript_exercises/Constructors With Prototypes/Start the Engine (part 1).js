function Vehicle(year) {
  this.year = year;
}

function Truck(year) {
  Vehicle.call(this, year);
  this.startEngine();
}

Truck.prototype = Object.create(Vehicle);
Truck.prototype.constructor = Truck;
Truck.prototype.startEngine = function() {
  console.log('Ready to go!');
};

let truck = new Truck(2003);
console.log(truck.year); // 2003