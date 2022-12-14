"use strict";

// let Floatable = {
//   float() {
//     console.log('Floating');
//   }
// };

// let Flyable = {
//   fly() {
//     console.log('Flying');
//   }
// };

class Vehicle {
  constructor() {
    this.moving = false;
    Vehicle.allVehicles.push(this);
  }

  move() {
    this.moving = true;
    console.log('Moving');
  }

  static allVehicles = [];
}

class Car extends Vehicle {
  move() {
    console.log('Driving');
  }
}

class Airplane extends Vehicle {
  move() {
    console.log('Flying');
  }
};
// Object.assign(Airplane.prototype, Flyable);

class Boat extends Vehicle {};
// Object.assign(Boat.prototype, Floatable);

class Seaplane extends Vehicle {
  move() {
    console.log('Flying');
  }
};
// Object.assign(Seaplane.prototype, Flyable, Floatable);

let car = new Car();
let plane = new Airplane();
let ship = new Boat();
let seaplane = new Seaplane();

Vehicle.allVehicles.forEach(vehicle => vehicle.move());

// ship.float();
// seaplane.fly();
// seaplane.float();