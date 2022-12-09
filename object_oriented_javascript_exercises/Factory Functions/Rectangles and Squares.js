function createRectangle(width, length) {
  return {
    width: width,
    length,

    getWidth: function() {
      return this.width;
    },

    getLength() {
      return this.length;
    },

    getArea() {
      return this.width * this.length;
    }
  };
}

function createSquare(size) {
  return createRectangle(size, size);
}

let rect = createRectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

let square = createSquare(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25