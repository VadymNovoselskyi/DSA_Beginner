class HashTable<T> {
  keyMap: Array<Array<[string, T]>>;
  constructor(public readonly size: number = 10) {
    this.keyMap = new Array(size);
  }

  set(key: string, value: T) {
    const hash = this._hash(key);
    if (this.get(key)) {
      this.keyMap[hash].find(([_key, _]) => _key === key)![1] = value;
    } else {
      this.keyMap[hash] ??= [];
      this.keyMap[hash].push([key, value]);
    }
  }

  get(key: string): T | undefined {
    const hash = this._hash(key);
    return this.keyMap[hash]?.find(([_key, _]) => _key === key)?.[1];
  }

  keys(): string[] {
    const result: string[] = [];
    for (const hashEntry of this.keyMap) {
      if (hashEntry === undefined) continue;
      result.push(...hashEntry.map(([key, _]) => key));
    }
    return result;
  }

  values(): T[] {
    const result: T[] = [];
    for (const hashEntry of this.keyMap) {
      if (hashEntry === undefined) continue;
      result.push(...hashEntry.map(([_, value]) => value));
    }
    return result;
  }

  _hash(key: string): number {
    const WEIRD_PRIME = 31;
    let total = 0;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      total = (total * WEIRD_PRIME + key[i].charCodeAt(0)) % this.size;
    }
    return total;
  }
}

const hashMap = new HashTable();
hashMap.set("Hi", 1);
hashMap.set("HI", 2);
hashMap.set("hI", 3);
hashMap.set("H!", 4);
hashMap.set("H1", 5);
hashMap.set("Hiiii", 1);
hashMap.set("Hi", 10);
console.log(hashMap.keyMap);
console.log(hashMap.keys());
console.log(hashMap.values());
// console.log(hashMap.get("HI"));
// console.log(hashMap.get("H!"));
// console.log(hashMap.get("Hi"));
// console.log(hashMap.get("hI"));
// console.log(hashMap.get("Non exist"));
