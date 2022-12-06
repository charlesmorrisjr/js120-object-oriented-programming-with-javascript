let Banner = {
  init(message) {
    this.message = message;
    return this;
  },

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  },

  horizontalRule() {
    return `+-${'-'.repeat(this.message.length)}-+`;
  },

  emptyLine() {
    return `| ${' '.repeat(this.message.length)} |`;
  },

  messageLine() {
    return `| ${this.message} |`;
  },
};

let banner1 = Object.create(Banner).init('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = Object.create(Banner).init('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+