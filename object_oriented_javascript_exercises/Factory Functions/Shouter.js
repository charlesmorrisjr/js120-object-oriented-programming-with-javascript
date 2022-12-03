function createPerson() {
  return {
    greeting(text) {
      console.log(text);
    }
  };
}

function createShouter() {
  let shouter = createPerson();
  let shouterGreeting = shouter.greeting;

  shouter.greeting = function(text) {
    shouterGreeting(text.toUpperCase());
  };

  return shouter;
}

let person = createPerson();
let shouter = createShouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.