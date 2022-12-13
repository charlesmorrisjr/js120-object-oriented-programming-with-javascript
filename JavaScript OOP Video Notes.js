/* eslint-disable max-len */
let obj = {};

// All objects have an internal [[Prototype]] property that point to that object's prototype.
console.log(Object.getPrototypeOf(obj));    // Object.prototype
console.log(obj.__proto__);                 // Same thing, deprecated

// All object functions (constructor functions?) have their own prototype property that
// is different from an object's internal [[Prototype]] property. 
// This property refers to another object
console.log(Object.prototype);

// obj has access to the hasOwnProperty method because that method belongs to the object
// that is referenced by obj's internal [[Prototype]] property, Object.prototype
console.log(obj.hasOwnProperty('foo'));     // false

// All objects have a constructor property that points to the function that created them.
console.log(Object);                        // f Object() -- Object constructor function
console.log(obj.constructor);               // f Object() -- Points to the Object constructor function

// The Object constructor function is actually a function
console.log(typeof Object);                 // function

// Ordinary/simple objects do not have a prototype property.
console.log(obj.prototype);                 // undefined

// When we say an object's prototype, we're actually talking about the object that the
// object's internal [[Prototype]] refers to
console.log(Object.getPrototypeOf(obj) === Object.prototype);   // true


// All functions in JavaScript are technically objects
// Functions are created by a Function constructor function.

// Constructor functions/object functions always have a prototype property that refers
// to an object

// The Function constructor function has a prototype property that contains all the methods
// that functions can use, like the call method.

// Functions also have an internal [[Prototype]] property and a constructor property.
// The functions themselves (such as `func` below) also have a prototype property, different
// from their internal [[Prototype]] property.
function func() {}
func.call();

console.log(Object.getPrototypeOf(func) === Function.prototype);
console.log(func.constructor === Function)
console.log(func.prototype);


// Arrays are also objects. That is how they have access to methods like join
// Arrays have an internal [[Prototype]] property and a constructor property.

let arr = ['a', 'b'];
console.log(arr.join(''));                                     // ab
console.log(Object.getPrototypeOf(arr) === Array.prototype);   // true
console.log(arr.constructor === Array);                        // true
console.log(arr.prototype);                                    // undefined


// Example 4
console.log('\nExample 4');

arr = ['a', 'b'];

console.log(Object.getPrototypeOf(arr) === Array.prototype);    // true
console.log(arr.constructor === Array);                         // true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype) === null);  // true

// The Array constructor has static methods like `from`. Note that these static methods
// are directly on the Array constructor itself -- JavaScript doesn't have to look at
// Array.prototype or the prototype chain
console.log(Array.from('foo'));

console.log('');

console.log(typeof Array);      // function
console.log(typeof Object);     // function
console.log(typeof Function);   // function

console.log(typeof Array.prototype);      // object
console.log(typeof Object.prototype);     // object
console.log(typeof Function.prototype);   // function

console.log('');

console.log(Array.constructor === Function);                                  // true
console.log(Object.constructor === Function);                                 // true
console.log(Function.constructor === Function);                               // true

console.log(Array.prototype.constructor === Array);
console.log(Object.prototype.constructor === Object);
console.log(Function.prototype.constructor === Function);

console.log('');

console.log(Object.getPrototypeOf(Array) === Function.prototype);
console.log(Object.getPrototypeOf(Object) === Function.prototype);
console.log(Object.getPrototypeOf(Function) === Function.prototype);

console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype) === null);
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);

console.log('');

// Example 6

function UserCreator(name, points) {
  this.name = name;
  this.points = points;
}

UserCreator.prototype.add = function() {
  this.points += 1;
};

let user = new UserCreator('Ryan', 3);

user.add();
console.log(user.points);

console.log('');

// Example 7

UserCreator.prototype.sayName = function() {
  console.log(`My name is ${this.name}.`);
};

function PaidUserCreator(paidName, balance) {
  UserCreator.call(this, paidName, 3);
  this.balance = balance;
}

PaidUserCreator.prototype = Object.create(UserCreator.prototype);
PaidUserCreator.prototype.constructor = PaidUserCreator;

PaidUserCreator.prototype.increase = function() {
  this.balance += 1;
};

let user2 = new PaidUserCreator('Dean', 5);

user2.sayName();
user2.increase();

console.log('');

function func2() {}

let a = {a: 1};
let b = Object.create(a);
let c = new func2();

console.log(Object.getPrototypeOf(b) === a);
console.log(Object.getPrototypeOf(c) === func2.prototype);

console.log(Object.getPrototypeOf(func2) === Function.prototype);
console.log(Object.getPrototypeOf(func2.prototype) === Object.prototype);


// Summary

// let arr = [];
// let obj = {};

// function func() {}

console.log('');

console.log(Object.getPrototypeOf(arr) === Array.prototype);
console.log(arr.constructor === Array);

console.log(Object.getPrototypeOf(obj) === Object.prototype);
console.log(obj.constructor === Object);

console.log(Object.getPrototypeOf(Object.prototype) === null);
console.log(Object.getPrototypeOf(Object) === Function.prototype);
console.log(Object.constructor === Function);
console.log(Object.prototype.constructor === Object);

console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Array) === Function.prototype);
console.log(Array.constructor === Function);
console.log(Array.prototype.constructor === Array);

console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Function) === Function.prototype);
console.log(Function.constructor === Function);
console.log(Function.prototype.constructor === Function);