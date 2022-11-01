function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
  
    getDescription() {
      return `${this.title} was written by ${this.author}. I ${this.read ? "have" : "haven't"} read it.`;
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry', true);
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

console.log(book1.getDescription());    // "Mythos was written by Stephen Fry.  I have read it."
console.log(book2.getDescription());    // "Me Talk Pretty One Day was written by David Sedaris. I haven't read it."
console.log(book3.getDescription());    // "Aunts aren't Gentlemen was written by PG Wodehouse. I have read it."