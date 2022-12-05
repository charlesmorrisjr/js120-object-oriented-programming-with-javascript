function createVehicle(year) {
  return year;
}

function createTruck(year) {
  let truck = createVehicle(year);

  truck.startEngine = function() {
    console.log('Ready to go!');
  };

  return truck;
}

let truck = createTruck(2003);
console.log(truck);
console.log(truck.year); // 2003