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

let rect = new createRectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20