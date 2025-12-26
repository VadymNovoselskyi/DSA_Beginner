export {};

class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Queue<T> {
  first: Node<T> | null;
  last: Node<T> | null;
  size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value: T): number {
    // console.log(`Enqueueing value: ${value}`);
    const newNode = new Node(value);

    if (this.size === 0) this.first = newNode;
    else this.last!.next = newNode;
    this.last = newNode;
    this.size++;
    return this.size;
  }

  dequeue(): T | null {
    // console.log(Dequeueing with len: ${this.size}`);
    if (this.size === 0) return null;

    const dequeued = this.first!;
    this.first = dequeued.next;
    this.size--;
    if (this.size === 0) this.last = null;

    // console.log(`Dequeueing item: ${dequeued.val}`);
    return dequeued.value;
  }
}
