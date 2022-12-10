function createVehicle(year) {
  return {
    year
  };
}

function createTruck(year) {
  return createVehicle(year);
}

function createCar(year) {
  return createVehicle(year);
}

let truck = createTruck(2003);
console.log(truck.year); // 2003

let car = createCar(2015);
console.log(car.year); // 2015