// How to access the [[Prototype]] property of an object:

let obj = {a: 1};

let newObj = Object.create(obj);
newObj.b = 2;

// Use the method .getPrototypeOf or __proto__
console.log(Object.getPrototypeOf(newObj));
console.log(newObj.__proto__);

console.log(obj.isPrototypeOf(newObj));

console.log(Object.getPrototypeOf(obj));
console.log(Object.prototype.isPrototypeOf(obj));

console.log(Object.getOwnPropertyNames(newObj));
console.log(newObj.hasOwnProperty('b'));