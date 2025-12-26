export {};

class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Stack<T> {
  first: Node<T> | null;
  last: Node<T> | null;
  size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value: T): number {
    // console.log(`Pushing val: ${val}`);
    const newNode = new Node(value);

    newNode.next = this.first;
    this.first = newNode;

    if (!this.last) this.last = newNode;
    this.size++;
    return this.size;
  }

  pop(): T | undefined {
    // console.log(`Popping with len: ${this.length}`);
    if (this.size === 0) return undefined;

    const popped = this.first!;
    this.first = popped.next;
    this.size--;
    if (this.size === 0) this.last = null;

    // console.log(`Popping item: ${current.val}`);
    return popped.value;
  }
}
