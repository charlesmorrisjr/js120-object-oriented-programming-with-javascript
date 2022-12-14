let book1 = {
  title: 'Mythos',
  author: 'Stephen Fry',

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  }  
}

let book2 = {
  title: 'Me Talk Pretty One Day',
  author: 'David Sedaris',

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  }  
}

let book3 = {
  title: "Aunts aren't Gentlemen",
  author: 'PG Wodehouse',

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  }
}

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());