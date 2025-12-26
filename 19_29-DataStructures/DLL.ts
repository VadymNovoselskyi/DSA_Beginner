export {};

class Node<T> {
  val: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: T): DoublyLinkedList<T> {
    // console.log(`Pushing val: ${val}`);
    const newNode = new Node(val);

    if (this.length === 0) this.head = newNode;
    else this.tail!.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
    return this;
  }

  pop(): Node<T> | undefined {
    // console.log(`Popping with len: ${this.length}`);
    if (this.length === 0) return undefined;

    const itemToPop = this.tail!;
    this.tail = itemToPop.prev;
    this.length--;

    if (this.length === 0) this.head = null;
    else this.tail!.next = null;

    // console.log(`Popping item: ${current.val}`);
    return itemToPop;
  }

  shift(): Node<T> | undefined {
    // console.log(`Shifting with len: ${this.length}`);
    if (this.length === 0) return undefined;

    const element = this.head!;
    this.head = element.next;
    this.length--;

    if (this.length === 0) this.tail = null;
    else this.head!.prev = null;

    // console.log(`Shifting item: ${current.val}`);
    return element;
  }

  unshift(val: T): DoublyLinkedList<T> {
    // console.log(`Pushing val: ${val}`);
    const newNode = new Node(val);

    if (this.head) this.head.prev = newNode;
    else this.tail = newNode;

    newNode.next = this.head;
    this.head = newNode;
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
    const prevNode = this.get(index - 1);
    if (!prevNode) return false;
    const nextNode = prevNode.next!;

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    nextNode.prev = newNode;
    this.length++;
    return true;
  }

  remove(index: number): Node<T> | undefined {
    // console.log(`Removing index: ${index}`);
    if (index === 0) return this.shift();
    else if (index === this.length) return this.pop();

    const nodeToRemove = this.get(index);
    if (!nodeToRemove) return undefined;

    if (nodeToRemove.prev) nodeToRemove.prev.next = nodeToRemove.next;
    if (nodeToRemove.next) nodeToRemove.next.prev = nodeToRemove.prev;
    this.length--;
    return nodeToRemove;
  }

  reverse(): DoublyLinkedList<T> {
    if (!this.length) return this;

    let prev = null;
    let current = this.head!;
    for (let i = 0; i < this.length; i++) {
      const next = current.next!;
      current.next = prev;
      if (prev) prev.prev = current;

      prev = current;
      current = next;
    }
    if (prev) prev.prev = null;

    this.tail = this.head;
    this.head = prev;
    return this;
  }

  rotate(index: number): DoublyLinkedList<T> {
    const normalizedIdx =
      index > 0
        ? index % this.length
        : this.length - Math.abs(index % this.length);
    if (normalizedIdx === 0 || this.length <= 1) return this;

    for (let i = 0; i < normalizedIdx; i++) {
      const current = this.head!;
      current.prev = this.tail;

      this.tail!.next = current;
      this.head = current.next;
      this.head!.prev = null;
      this.tail = current;
      current.next = null;
    }

    return this;
  }

  print() {
    let element = this.head;
    while (element !== null) {
      console.log(element.val);
      element = element.next;
    }
  }

  printReverse() {
    let element = this.tail;
    while (element !== null) {
      console.log(element.val);
      element = element.prev;
    }
  }
}

const list = new DoublyLinkedList<number>();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
// list.push(6);
list.insert(2, 12);
list.insert(4, 10);

console.log("After construction: ");
list.print();
// console.log("After construction reverse: ");
// list.printReverse();

// console.log(list.get(1));
// console.log(list.get(3));
// console.log(list.get(5));

// console.log(list.pop());
// console.log(list.shift());
// console.log(list.pop());
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

// list.remove(5);
// list.remove(3);
// list.remove(1);
// list.remove(0);
// list.remove(0);
// console.log("\nAfter removing: ");
// list.print();

// console.log("\nAfter reconstruction: ");
// list.print();

// list.reverse();
// console.log("\nAfter reverse: ");
// list.print();
// console.log("\nAfter reverse but also reversed: ");
// list.printReverse();

list.rotate(-1);
console.log("\nAfter rotate: ");
list.print();
console.log("\nAfter rotate but reversed: ");
list.printReverse();
