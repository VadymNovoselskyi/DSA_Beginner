export {};

class Node<T> {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
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

    while (true) {
      if (value < current.value) {
        if (!current.left) return undefined;
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) return undefined;
        current = current.right;
      } else return current;
    }
  }

  remove(value: T): Node<T> | undefined {
    if (!this.root) return undefined;
    let current = this.root;
    let prev: Node<T> | null = null;

    console.log("Before removal: ");
    this.print();
    while (true) {
      if (value < current.value) {
        if (!current.left) return undefined;
        prev = current;
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) return undefined;
        prev = current;
        current = current.right;
      } else break;
    }

    if (prev) {
      if (value < prev.value) prev.left = null;
      else prev.right = null;
    }

    this._reinsert(current.left);
    this._reinsert(current.right);
    console.log("After removal: ");
    this.print();
    return current;
  }

  _reinsert(node: Node<T> | null) {
    if (!node) return;

    if (node.right) this._reinsert(node.right);
    if (node.left) this._reinsert(node.left);
    this.insert(node.value);
  }

  print(node: Node<T> | null = this.root, offset: number = 30) {
    if (!node) return "";

    console.log(" ".repeat(offset) + node.value);
    console.log(" ".repeat(offset - 2) + "/" + " ".repeat(4) + "\\");

    const result = this.print(node.left, offset - 5);
    this.print(node.right, offset + 5);
  }
}

const bst = new BinarySearchTree();
bst.insert(20);
bst.insert(10);
bst.insert(5);
bst.insert(30);
bst.insert(25);
bst.insert(22);
bst.insert(27);
bst.insert(40);
bst.insert(50);

console.log("After construction:");
bst.print();

bst.remove(30);
console.log("\n\nAfter removal:");
bst.print();
