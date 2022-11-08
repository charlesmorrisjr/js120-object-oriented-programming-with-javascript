let bar = {a: 1};
let foo = Object.create(bar);

foo.b = 2;

// Output is b: 2
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

// Output is:
// a: 1
// b: 2
Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});