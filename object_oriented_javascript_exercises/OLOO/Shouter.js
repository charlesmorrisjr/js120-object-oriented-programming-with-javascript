let Person = {
  greeting(text) {
    console.log(text);
  },
};

let Shouter = Object.create(Person);

Shouter.greeting = function(text) {
  return Person.greeting(text.toUpperCase());
};

let person = Object.create(Person);
let shouter = Object.create(Shouter);

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.