import { PriorityQueue } from "./PriorityQueue";

export default {};

export class WeightedGraph<T> {
  adjacencyList: Map<T, { node: T; weight: number }[]>;
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(value: T): void {
    this.adjacencyList.set(value, []);
  }

  addEdge(vertex1: T, vertex2: T, weight: number) {
    const neighbors1 = this.adjacencyList.get(vertex1);
    const neighbors2 = this.adjacencyList.get(vertex2);
    if (!neighbors1 || !neighbors2) return;

    neighbors1.push({ node: vertex2, weight });
    neighbors2.push({ node: vertex1, weight });
  }

  removeEdge(vertex1: T, vertex2: T) {
    const neighbors1 = this.adjacencyList.get(vertex1);
    const neighbors2 = this.adjacencyList.get(vertex2);
    if (!neighbors1 || !neighbors2) return;

    this.adjacencyList.set(
      vertex1,
      neighbors1.filter((vertex) => vertex.node !== vertex2)
    );
    this.adjacencyList.set(
      vertex2,
      neighbors2.filter((vertex) => vertex.node !== vertex1)
    );
  }

  removeVertex(vertex: T): boolean {
    const neighbors = this.adjacencyList.get(vertex);
    if (!neighbors) return false;

    for (const neighborInfo of neighbors) {
      const neighbors2 = this.adjacencyList.get(neighborInfo.node)!;

      this.adjacencyList.set(
        neighborInfo.node,
        neighbors2.filter((v) => v.node !== vertex)
      );
    }

    return this.adjacencyList.delete(vertex);
  }

  dijkstra(start: T, goal: T): T[] {
    const queue = new PriorityQueue<{
      node: T;
      prevNode: T | null;
      dist: number;
    }>();
    const distances = new Map<T, number>();
    const prevNodeMap = new Map<T, T | null>();

    let currentNodeEntry:
      | { node: T; prevNode: T | null; dist: number }
      | undefined = {
      node: start,
      prevNode: null,
      dist: 0,
    };
    while (currentNodeEntry?.node !== undefined) {
      if (
        currentNodeEntry.dist >
        (distances.get(currentNodeEntry.node) ?? Infinity)
      ) {
        currentNodeEntry = queue.dequeue()?.value;
        continue;
      }

      const neighbors = this.adjacencyList.get(currentNodeEntry.node)!;
      for (const neighborNode of neighbors) {
        queue.enqueue(
          {
            node: neighborNode.node,
            prevNode: currentNodeEntry.node,
            dist: currentNodeEntry.dist + neighborNode.weight,
          },
          currentNodeEntry.dist + neighborNode.weight
        );
      }

      distances.set(currentNodeEntry.node, currentNodeEntry.dist);
      prevNodeMap.set(currentNodeEntry.node, currentNodeEntry.prevNode);
      currentNodeEntry = queue.dequeue()?.value;
    }

    const result = [goal];
    let currentNode: T | undefined | null = goal;
    while (currentNode !== null && currentNode !== undefined) {
      const prevNode = prevNodeMap.get(currentNode);
      if (prevNode === null || prevNode == undefined) break;

      result.push(prevNode);
      currentNode = prevNode;
    }
    result.reverse();
    return result;
  }
}

// Graphs - Dijkstra Exercise
// Create a constructor function for a WeightedGraph. It should inherit from the Graph constructor and have all the same methods except for adding an edge. Since weights will now be added with edges, the adjacency list should not only store the nodes which are connected to it but also the corresponding weight of the edge.

// A PriorityQueue has been implemented for you. The PriorityQueue adds the LOWEST priority first (this is helpful for Dijkstra).

// Implement the following method on the WeightedGraph.prototype

// Dijkstra - this function should return an array with two values, the first being the total distance and the second an array of nodes which create the shortest path.

var g = new WeightedGraph();

g.addVertex("A");
g.addVertex("Z");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("H");
g.addVertex("Q");
g.addVertex("G");

g.addEdge("A", "Z", 7);
g.addEdge("A", "C", 8);

g.addEdge("Z", "Q", 2);

g.addEdge("C", "G", 4);

g.addEdge("D", "Q", 8);

g.addEdge("E", "H", 1);

g.addEdge("H", "Q", 3);

g.addEdge("Q", "C", 6);

g.addEdge("G", "Q", 9);

console.log(g.dijkstra("A", "E")); // ["A", "Z", "Q", "H", "E"]
console.log(g.dijkstra("A", "Q")); // ["A", "Z", "Q"]
console.log(g.dijkstra("A", "G")); // ["A", "C", "G"]
console.log(g.dijkstra("A", "D")); // ["A", "Z", "Q", "D"]
