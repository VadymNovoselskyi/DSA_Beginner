export {};

class Node<T> {
  constructor(public readonly value: T, public readonly priority: number) {}
}

// Min BinaryHeap
export class PriorityQueue<T> {
  constructor(public values: Node<T>[] = []) {
    this.values = [];
  }

  enqueue(value: T, priority: number): PriorityQueue<T> {
    const newNode = new Node(value, priority);
    this.values.push(newNode);

    let currentIdx = this.values.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    let parent = this.values[parentIdx];
    while (parent !== undefined && priority < parent.priority) {
      this.values[currentIdx] = this.values[parentIdx];
      this.values[parentIdx] = newNode;

      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
      parent = this.values[parentIdx];
    }
    return this;
  }

  dequeue(): Node<T> | undefined {
    if (!this.values.length) return;

    const temp = this.values[0];
    this.values[0] = this.values[this.values.length - 1];
    this.values[this.values.length - 1] = temp;
    this.values.pop();

    let currentIdx = 0;
    let node = this.values[0];
    let minIdx = currentIdx * 2 + 1;
    if (
      this.values[currentIdx * 2 + 2]?.priority <
      this.values[currentIdx * 2 + 1]?.priority
    ) {
      minIdx += 1;
    }
    let minChild = this.values[minIdx];

    while (minChild !== undefined && node.priority > minChild.priority) {
      this.values[currentIdx] = minChild;
      this.values[minIdx] = node;

      currentIdx = minIdx;
      minIdx = currentIdx * 2 + 1;
      if (
        this.values[currentIdx * 2 + 2]?.priority <
        this.values[currentIdx * 2 + 1]?.priority
      ) {
        minIdx += 1;
      }
      minChild = this.values[minIdx];
    }

    return temp;
  }
}

// const pq = new PriorityQueue();
// pq.enqueue(100, 1);
// pq.enqueue(10, 3);
// pq.enqueue(40, 5);
// pq.enqueue(20, 2);
// pq.enqueue(30, 10);
// pq.enqueue(101, 4);
// pq.enqueue(69, 6);
// console.log(pq.values);
// console.log(pq.dequeue());
// console.log(pq.values);
