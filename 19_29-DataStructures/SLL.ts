export {};

class Node<T> {
  val: T;
  next: Node<T> | null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: T): SinglyLinkedList<T> {
    // console.log(`Pushing val: ${val}`);
    const newNode = new Node(val);

    if (this.length === 0) this.head = newNode;
    else this.tail!.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  pop(): Node<T> | undefined {
    // console.log(`Popping with len: ${this.length}`);
    if (this.length === 0) return undefined;

    let prev = null;
    let current = this.head!;
    while (current.next) {
      prev = current;
      current = current.next;
    }

    this.tail = prev;
    this.length--;

    if (prev === null) this.head = null;
    else prev.next = null;

    // console.log(`Popping item: ${current.val}`);
    return current;
  }

  shift(): Node<T> | undefined {
    // console.log(`Shifting with len: ${this.length}`);
    if (this.length === 0) return undefined;

    const element = this.head!;
    this.head = element.next;
    if (this.tail === element) this.tail = null;
    this.length--;

    // console.log(`Shifting item: ${current.val}`);
    return element;
  }

  unshift(val: T): SinglyLinkedList<T> {
    // console.log(`Pushing val: ${val}`);
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    if (!newNode.next) this.tail = newNode;
    this.length++;

    return this;
  }

  get(index: number): Node<T> | null {
    // console.log(`Getting index: ${index}`);
    if (index < 0 || index >= this.length) return null;

    let element = this.head!;
    for (let i = 0; i < index; i++) {
      element = element.next!;
    }
    // console.log(`Returning: ${element}`);
    return element;
  }

  set(index: number, value: T): boolean {
    // console.log(`Setting index: ${index} to: ${val}`);
    const element = this.get(index);
    if (!element) return false;

    element.val = value;
    return true;
  }

  insert(index: number, value: T): boolean {
    // console.log(`Inserting new val: ${val} to: ${index}`);
    if (index === 0) return !!this.unshift(value);
    else if (index === this.length) return !!this.push(value);

    const newNode = new Node(value);
    const oldNode = this.get(index - 1);
    if (!oldNode) return false;

    newNode.next = oldNode.next;
    oldNode.next = newNode;
    this.length++;
    return true;
  }

  remove(index: number): Node<T> | undefined {
    // console.log(`Removing index: ${index}`);
    if (index === 0) return this.shift();
    else if (index === this.length) return this.pop();

    const previousNode = this.get(index - 1);
    const nodeToRemove = this.get(index);
    if (!previousNode || !nodeToRemove) return undefined;

    previousNode.next = nodeToRemove.next;
    this.length--;
    return nodeToRemove;
  }

  reverse(): SinglyLinkedList<T> {
    if (!this.length) return this;

    let prev = null;
    let current = this.head!;
    for (let i = 0; i < this.length; i++) {
      const next = current.next!;
      current.next = prev;

      prev = current;
      current = next;
    }

    this.tail = this.head;
    this.head = prev;
    return this;
  }

  rotate(index: number): SinglyLinkedList<T> {
    const normalizedIdx =
      index > 0
        ? index % this.length
        : this.length - Math.abs(index % this.length);
    if (normalizedIdx === 0) return this;

    const oldHead = this.head!;
    const oldTail = this.tail!;
    const newTail = this.get(normalizedIdx - 1)!;
    const rotationNode = this.get(normalizedIdx)!;

    this.head = rotationNode;
    oldTail.next = oldHead;
    this.tail = newTail;
    newTail.next = null;

    return this;
  }

  print() {
    let element = this.head;
    while (element !== null) {
      console.log(element.val);
      element = element.next;
    }
  }
}

const list = new SinglyLinkedList<number>();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
// list.push(6);
// list.insert(4, 10);

console.log("After construction: ");
list.print();

// console.log(list.get(1));
// console.log(list.get(3));
// console.log(list.get(5));

// console.log(list.pop());
// console.log(list.shift());
// console.log(list.pop());
// console.log(list.shift());
// console.log("\nAfter pop and shift: ");
// list.print();

// list.unshift(0);
// list.push(1);
// list.push(2);
// list.push(3);
// list.push(4);
// list.unshift(-1);

// console.log("\nAfter reconstruction: ");
// list.print();

// list.reverse();
// console.log("\nAfter reverse: ");
// list.print();

list.rotate(1000);
console.log("\nAfter rotate: ");
list.print();
