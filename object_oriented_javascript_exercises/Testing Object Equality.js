function objectsEqual(obj1, obj2) {
  let obj1Entries = Object.entries(obj1);
  let obj2Entries = Object.entries(obj2);

  if (obj1Entries.length === 0 && obj2Entries.length === 0) return true;
  if (obj1Entries.length !== obj2Entries.length) return false;

  for (let idx = 0; idx < obj1Entries.length; idx++) {
    if (
      obj1Entries[idx][0] !== obj2Entries[idx][0] ||
      obj1Entries[idx][1] !== obj2Entries[idx][1]
    ) return false;
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false