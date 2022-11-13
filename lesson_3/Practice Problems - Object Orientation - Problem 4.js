let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,

  setPrice(price) {
    if (price > 0) {
      this.price = price;
    } else {
      console.log('Invalid price.')
    }
  },

  describeProduct() {
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Price: \$${this.price}`);
    console.log(`Stock: ${this.stock}`);
  },
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,

  setPrice(price) {
    if (price > 0) {
      this.price = price;
    } else {
      console.log('Invalid price.')
    }
  },

  describeProduct() {
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Price: \$${this.price}`);
    console.log(`Stock: ${this.stock}`);
  },
};

scissors.setPrice(1000);

scissors.describeProduct();
drill.describeProduct();