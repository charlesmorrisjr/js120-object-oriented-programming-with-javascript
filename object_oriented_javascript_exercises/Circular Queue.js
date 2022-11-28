class CircularQueue {
  constructor(bufferSize) {
    this.buffer = (new Array(bufferSize)).fill(null);
    this.bufferSize = bufferSize;
    this.curIdx = 0;
    this.oldest = 0;
  }

  enqueue(num) {
    if (this.buffer[this.curIdx] !== null) {
      this.oldest = this.curIdx + 1 !== this.bufferSize ? this.curIdx + 1 : 0;
    }
    this.buffer[this.curIdx] = num;

    this.curIdx = (this.curIdx + 1 !== this.bufferSize) ? this.curIdx + 1 : 0;
  }

  dequeue() {
    let returnVal = this.buffer[this.oldest];
    this.buffer[this.oldest] = null;

    if (returnVal !== null) {
      this.oldest = (this.oldest + 1 !== this.bufferSize) ? this.oldest + 1 : 0;
    }
    return returnVal;
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);
