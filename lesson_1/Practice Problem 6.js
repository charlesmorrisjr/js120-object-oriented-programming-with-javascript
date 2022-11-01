function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
  
    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    },

    readBook: function() {
      this.read = true;
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');

console.log(book1.read); // => false

book1.readBook();

console.log(book1.read); // => true;