let Vehicle = {
  init(year) {
    this.year = year;
    return this;
  }
};

let Truck = Object.create(Vehicle);

Truck.init = function(year) {
  Vehicle.init.call(this, year);
  this.startEngine();
  return this;
};

Truck.startEngine = function() {
  console.log('Ready to go!');
};

let truck = Object.create(Truck).init(2003);
console.log(truck.year); // 2003
console.log(truck.hasOwnProperty('year'));