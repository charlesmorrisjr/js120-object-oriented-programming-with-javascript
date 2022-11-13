let scissors = {
  id: 0,
  name: 'Scissors',
  stock: 8,
  price: 10,
};

let drill = {
  id: 1,
  name: 'Cordless Drill',
  stock: 15,
  price: 45,
};

function setPrice(product, price) {
  if (price > 0) {
    product.price = price;
  } else {
    console.log('Invalid price.')
  }
}

function describeProduct(product) {
  Object.entries(product).forEach(prop => console.log(`${prop[0]}: ${prop[1]}`));
}

describeProduct(scissors);
describeProduct(drill);