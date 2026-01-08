export default {};

export class Graph<T> {
  adjacencyList: Map<T, T[]>;
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(value: T): void {
    this.adjacencyList.set(value, []);
  }

  addEdge(vertex1: T, vertex2: T) {
    const neighbors1 = this.adjacencyList.get(vertex1);
    const neighbors2 = this.adjacencyList.get(vertex2);
    if (!neighbors1 || !neighbors2) return;

    neighbors1.push(vertex2);
    neighbors2.push(vertex1);
  }

  removeEdge(vertex1: T, vertex2: T) {
    const neighbors1 = this.adjacencyList.get(vertex1);
    const neighbors2 = this.adjacencyList.get(vertex2);
    if (!neighbors1 || !neighbors2) return;

    this.adjacencyList.set(
      vertex1,
      neighbors1.filter((vertex: T) => vertex !== vertex2)
    );
    this.adjacencyList.set(
      vertex2,
      neighbors2.filter((vertex: T) => vertex !== vertex1)
    );
  }

  removeVertex(vertex: T): boolean {
    const neighbors = this.adjacencyList.get(vertex);
    if (!neighbors) return false;

    for (const neighbor of neighbors) {
      const neighbors2 = this.adjacencyList.get(neighbor)!;

      this.adjacencyList.set(
        neighbor,
        neighbors2.filter((v: T) => v !== vertex)
      );
    }

    return this.adjacencyList.delete(vertex);
  }
}