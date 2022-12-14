/* eslint-disable max-len */
"use strict";

let obj = {};
let arr = [];

function func() {}

// console.log(Object.getPrototypeOf(obj) === Object.prototype);   // true
// console.log(Object.getPrototypeOf(Object.prototype) === null);  // true
// console.log(obj.hasOwnProperty('constructor'));                 // false

// console.log(Object.getPrototypeOf(arr) === Array.prototype);                // true
// console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);   // true
// console.log(arr.hasOwnProperty('constructor'));                             // false

// console.log(Object.getPrototypeOf(func) === Function.prototype);                // true
// console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);    // true
// console.log(func.hasOwnProperty('constructor'));                                // false

// Although we are able to access the `constructor` property on these,
// they do not actually have their "own" `constructor` properties
// console.log(arr.constructor === Array);           // true
// console.log(obj.constructor === Object);          // true
// console.log(func.constructor === Function);       // true

// These constructor functions do not have their "own" 'constructor' properties
// console.log(Array.hasOwnProperty('constructor'));     // false
// console.log(Object.hasOwnProperty('constructor'));    // false
// console.log(Function.hasOwnProperty('constructor'));  // false

// However, the objects referenced by the constructor functions' 'prototype'
// properties do have their "own" 'constructor' properties
// console.log(Array.prototype.hasOwnProperty('constructor'));     // true
// console.log(Object.prototype.hasOwnProperty('constructor'));    // true
// console.log(Function.prototype.hasOwnProperty('constructor'));  // true

// console.log(Array.prototype.constructor === Array);             // true
// console.log(Object.prototype.constructor === Object);           // true
// console.log(Function.prototype.constructor === Function);       // true

// console.log(Object.getPrototypeOf(Array) === Function.prototype);     // true
// console.log(Object.getPrototypeOf(Object) === Function.prototype);    // true
// console.log(Object.getPrototypeOf(Function) === Function.prototype);  // true