let rectanglePrototype = {
  init(width, length) {
    this.width = width;
    this.length = length;
    return this;
  },

  getWidth() {
    return this.width;
  },

  getLength() {
    return this.length;
  },

  getArea() {
    return this.width * this.length;
  }
};

let squarePrototype = Object.create(rectanglePrototype);
squarePrototype.init = function(size) {
  this.width = size;
  this.length = size;
  return this;
};

let rect = Object.create(rectanglePrototype).init(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

let square = Object.create(squarePrototype).init(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25