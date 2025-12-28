export {};

export class MaxBinaryHeap {
  values: number[];
  constructor() {
    this.values = [];
  }

  insert(value: number): MaxBinaryHeap {
    this.values.push(value);

    let currentIdx = this.values.length - 1;
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    let parent = this.values[parentIdx];
    while (parent !== undefined && value > parent) {
      this.values[currentIdx] = this.values[parentIdx];
      this.values[parentIdx] = value;

      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
      parent = this.values[parentIdx];
    }
    return this;
  }

  extractMax(): number | undefined {
    const temp = this.values[0];
    this.values[0] = this.values[this.values.length - 1];
    this.values[this.values.length - 1] = temp;
    this.values.pop();

    let currentIdx = 0;
    let value = this.values[0];
    let maxIdx = currentIdx * 2 + 1;
    if (this.values[currentIdx * 2 + 1] < this.values[currentIdx * 2 + 2]) {
      maxIdx += 1;
    }
    let maxChild = this.values[maxIdx];

    while (maxChild !== undefined && value < maxChild) {
      this.values[currentIdx] = maxChild;
      this.values[maxIdx] = value;

      currentIdx = maxIdx;
      maxIdx = currentIdx * 2 + 1;
      if (this.values[currentIdx * 2 + 1] < this.values[currentIdx * 2 + 2]) {
        maxIdx += 1;
      }
      maxChild = this.values[maxIdx];
    }

    return temp;
  }
}

// const heap = new MaxBinaryHeap();
// heap.insert(100);
// heap.insert(10);
// heap.insert(40);
// // console.log(heap.values);
// heap.insert(20);
// heap.insert(30);
// heap.insert(101);
// heap.insert(69);
// // console.log(heap.values);
// heap.insert(102);
// heap.insert(9);
// heap.insert(8);
// heap.insert(7);
// heap.insert(6);
// heap.insert(5);
// heap.insert(4);
// heap.insert(3);
// heap.insert(9.5);
// heap.insert(9.6);
// console.log(heap.values);
// console.log(heap.extractMax());
// console.log(heap.values);
