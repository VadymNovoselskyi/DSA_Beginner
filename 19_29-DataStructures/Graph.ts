import { Stack } from "./Stack";
import { Queue } from "./Queue";

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

  //   Recursive
  //   depthFirstSearch(vertex: T, result: T[] = []): T[] {
  //     result.push(vertex);
  //     const vertexNeighbors = this.adjacencyList.get(vertex);

  //     if (!vertexNeighbors?.length) return result;
  //     for (const vertexNeighbor of vertexNeighbors) {
  //       if (result.includes(vertexNeighbor)) continue;
  //       this.depthFirstSearch(vertexNeighbor, result);
  //     }
  //     return result;
  //   }

  //   Iterative
  depthFirstSearch(vertex: T): T[] {
    const result: T[] = [vertex];
    const stack = new Stack<T>();

    let currentVertex: T | undefined = vertex;
    while (currentVertex !== undefined) {
      const vertexNeighbors = this.adjacencyList.get(currentVertex);
      if (!vertexNeighbors?.length) continue;

      for (const vertexNeighbor of vertexNeighbors) {
        if (result.includes(vertexNeighbor)) continue;

        result.push(vertexNeighbor);
        stack.push(vertexNeighbor);
      }

      currentVertex = stack.pop();
    }
    return result;
  }

  breadthFirstSearch(vertex: T): T[] {
    const result: T[] = [vertex];
    const queue = new Queue<T>();

    let currentVertex: T | null = vertex;
    while (currentVertex !== null) {
      const vertexNeighbors = this.adjacencyList.get(currentVertex);
      if (!vertexNeighbors?.length) continue;

      for (const vertexNeighbor of vertexNeighbors) {
        if (result.includes(vertexNeighbor)) continue;

        result.push(vertexNeighbor);
        queue.enqueue(vertexNeighbor);
      }

      currentVertex = queue.dequeue();
    }
    return result;
  }
}

// Graphs - Dijkstra Exercise
// Create a constructor function for a WeightedGraph. It should inherit from the Graph constructor and have all the same methods except for adding an edge. Since weights will now be added with edges, the adjacency list should not only store the nodes which are connected to it but also the corresponding weight of the edge.

// A PriorityQueue has been implemented for you. The PriorityQueue adds the LOWEST priority first (this is helpful for Dijkstra).

// Implement the following method on the WeightedGraph.prototype

// Dijkstra - this function should return an array with two values, the first being the total distance and the second an array of nodes which create the shortest path.

// var g = new WeightedGraph()

// g.addVertex('A');
// g.addVertex('Z');
// g.addVertex('C');
// g.addVertex('D');
// g.addVertex('E');
// g.addVertex('H');
// g.addVertex('Q');
// g.addVertex('G');

// g.addEdge('A', 'Z', 7)
// g.addEdge('A', 'C', 8)

// g.addEdge('Z', 'Q', 2)

// g.addEdge('C', 'G', 4)

// g.addEdge('D', 'Q', 8)

// g.addEdge('E', 'H', 1)

// g.addEdge('H', 'Q', 3)

// g.addEdge('Q', 'C', 6)

// g.addEdge('G', 'Q', 9)

// g.Dijkstra('A','E') // ["A", "Z", "Q", "H", "E"]
// g.Dijkstra('A','Q') // ["A", "Z", "Q"]
// g.Dijkstra('A','G') // ["A", "C", "G"]
// g.Dijkstra('A','D') // ["A", "Z", "Q", "D"]
