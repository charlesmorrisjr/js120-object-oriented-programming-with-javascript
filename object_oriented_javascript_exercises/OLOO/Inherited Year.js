let Vehicle = {
  init(year) {
    this.year = year;
    return this;
  }
};

let Truck = Object.create(Vehicle);
let Car = Object.create(Vehicle);

let truck = Object.create(Truck).init(2003);
console.log(truck.year); // 2003

let car = Object.create(Car).init(2015);
console.log(car.year); // 2015