class Doctor {
  work(job) {
    this.diagnose(job.patients);
  }

  diagnose(patients) {
    console.log(`Diagnosing ${patients}`);
  }
}

class Chef {
  work(job) {
    this.cook(job.food);
  }

  cook(food) {
    console.log(`Cooking ${food}`);
  }
}

class Mechanic {
  work(job) {
    this.fix(job.cars);
  }

  fix(cars) {
    console.log(`Fixing ${cars}`);
  }
}

class Work {
  constructor(patients, food, cars) {
    this.patients = patients;
    this.food = food;
    this.cars = cars;
  }

  doWork(workers) {
    workers.forEach(worker => worker.work(this));
  }
}

let doctor = new Doctor();
let chef = new Chef();
let mechanic = new Mechanic();

let employment = new Work('3 patients', 'cuisine', 'cars');

employment.doWork([doctor, chef, mechanic]);