let obj = {};

console.log(obj.__proto__ === Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prototype);

console.log(obj.constructor === Object);

console.log(obj.prototype);  // undefined


const func = function () {};
func.call();

console.log(func.__proto__ === Function.prototype);
console.log(func.constructor === Function);