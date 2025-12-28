import { Queue } from "./Queue";

export {};

type OffsetQueueEnty<T> = {
  node: Node<T>;
  offset: number;
  depth: number;
};
type OffsetEnty<T> = {
  value: T;
  offset: number;
  depth: number;
};

export class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T> {
  root: Node<T> | null;
  constructor() {
    this.root = null;
  }

  insert(value: T): BinarySearchTree<T> | undefined {
    const newEl = new Node(value);
    if (!this.root) {
      this.root = newEl;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left) current = current.left;
        else {
          current.left = newEl;
          return this;
        }
      } else if (value > current.value) {
        if (current.right) current = current.right;
        else {
          current.right = newEl;
          return this;
        }
      } else return undefined;
    }
  }

  find(value: T): Node<T> | undefined {
    if (!this.root) return undefined;
    let current = this.root;

    while (value !== current.value) {
      const next = value < current.value ? current.left : current.right;

      if (!next) return undefined;
      current = next;
    }
    return current;
  }

  remove(value: T): Node<T> | undefined {
    if (!this.root) return undefined;
    let current = this.root;
    let prev: Node<T> | null = null;

    while (value !== current.value) {
      const next = value < current.value ? current.left : current.right;

      if (!next) return undefined;
      prev = current;
      current = next;
    }

    this._deleteNode(value, current, prev);
    return current;
  }

  _deleteNode(value: T, current: Node<T>, prev: Node<T> | null) {
    if (current.left && current.right) {
      prev = current;
      let successor = current.right;
      while (successor.left) {
        prev = successor;
        successor = successor.left;
      }
      current.value = successor.value;
      this._deleteNode(successor.value, successor, prev);
    } else {
      const subst =
        !current.left && !current.right ? null : current.left ?? current.right;

      if (prev) {
        if (value < prev.value) prev.left = subst;
        else prev.right = subst;
      } else this.root = subst;
    }
  }

  findSecondLargest(): T | undefined {
    if (!this.root) return undefined;
    let current = this.root;
    let prev: Node<T> | null = null;

    while (current.right) {
      prev = current;
      current = current.right;
    }
    return prev?.value ? prev.value : undefined;
  }

  isBalanced(): boolean {
    if (!this.root) return false;

    let minDepth = Infinity;
    let maxDepth = -Infinity;

    const queue = new Queue<{ node: Node<T>; depth: number }>();
    queue.enqueue({ node: this.root, depth: 0 });
    let nodeInfo;

    while ((nodeInfo = queue.dequeue())) {
      if (nodeInfo.node.left) {
        queue.enqueue({ node: nodeInfo.node.left, depth: nodeInfo.depth + 1 });
      }
      if (nodeInfo.node.right) {
        queue.enqueue({ node: nodeInfo.node.right, depth: nodeInfo.depth + 1 });
      }

      if (nodeInfo.node.left && nodeInfo.node.right) continue;
      minDepth = Math.min(minDepth, nodeInfo.depth);
      maxDepth = Math.max(maxDepth, nodeInfo.depth);
    }
    return maxDepth - minDepth <= 1;
  }

  breadthFirstSearch(): T[] {
    if (!this.root) return [];

    const result: T[] = [];
    const queue = new Queue<Node<T>>();
    queue.enqueue(this.root);
    let node;

    while ((node = queue.dequeue())) {
      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
      result.push(node.value);
    }
    return result;
  }

  getOffsetMap(): OffsetEnty<T>[] {
    if (!this.root) return [];
    const baseOffset = 30;
    const nodeOffset = 8;

    const result: OffsetEnty<T>[] = [];
    const queue = new Queue<OffsetQueueEnty<T>>();
    queue.enqueue({ node: this.root, offset: baseOffset, depth: 0 });
    let offsetQueueEnty: OffsetQueueEnty<T> | null;

    while ((offsetQueueEnty = queue.dequeue())) {
      if (offsetQueueEnty === null) break;

      if (offsetQueueEnty.node.left) {
        queue.enqueue({
          node: offsetQueueEnty.node.left,
          offset:
            offsetQueueEnty.offset - (nodeOffset - offsetQueueEnty.depth * 2),
          depth: offsetQueueEnty.depth + 1,
        });
      }
      if (offsetQueueEnty.node.right) {
        queue.enqueue({
          node: offsetQueueEnty.node.right,
          offset:
            offsetQueueEnty.offset + (nodeOffset - offsetQueueEnty.depth * 2),
          depth: offsetQueueEnty.depth + 1,
        });
      }
      result.push({
        value: offsetQueueEnty.node.value,
        offset: offsetQueueEnty.offset,
        depth: offsetQueueEnty.depth,
      });
    }
    return result;
  }

  print() {
    const offsetMap = this.getOffsetMap();

    let buffer = "";
    let currentDepth = 0;
    for (const offsetEntry of offsetMap) {
      if (offsetEntry.depth === currentDepth) {
        const offset = " ".repeat(offsetEntry.offset - buffer.length);
        buffer += offset + offsetEntry.value;
      } else {
        console.log(buffer + "\n");

        buffer = " ".repeat(offsetEntry.offset) + offsetEntry.value;
        currentDepth++;
      }
    }
    console.log(buffer);
  }
}

const bst = new BinarySearchTree();
bst.insert(20);
bst.insert(10);
bst.insert(5);
bst.insert(13);
bst.insert(30);
bst.insert(25);
bst.insert(22);
bst.insert(27);
bst.insert(40);
bst.insert(35);
bst.insert(50);

console.log("After construction:");
bst.print();

console.log(bst.isBalanced());
bst.insert(60);
bst.insert(70);

console.log(bst.isBalanced());
// bst.remove(30);
// console.log("\n\nAfter removal:");
// bst.print();
