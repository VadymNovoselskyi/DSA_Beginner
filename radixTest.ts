// benchmark-radix.ts
// Run:
//   npx ts-node benchmark-radix.ts
// or:
//   tsc benchmark-radix.ts && node benchmark-radix.js
//
// Optional (more stable):
//   node --expose-gc benchmark-radix.js

import { performance } from "perf_hooks";

/* ===================== Helpers (non-negative ints) ===================== */

function mostDigits(nums: number[]): number {
  let max = 1;
  for (let i = 0; i < nums.length; i++) {
    let n = nums[i];
    if (n === 0) continue;
    let d = 0;
    while (n > 0) {
      d++;
      n = (n / 10) | 0;
    }
    if (d > max) max = d;
  }
  return max;
}

function getDigit(num: number, place: number): number {
  // num assumed non-negative integer
  const pow = Math.pow(10, place);
  return ((num / pow) | 0) % 10 | 0;
}

/* ===================== Your radix sorts (as written) ===================== */

// A) rebuild nums each round + shift
function radixSortShiftRebuild(nums: number[]) {
  const rounds = mostDigits(nums);
  const buckets: number[][] = Array.from({ length: 10 }, () => []);

  for (let i = 0; i < rounds; i++) {
    for (const num of nums) buckets[getDigit(num, i)].push(num);

    nums = [];
    for (const bucket of buckets) {
      let element = bucket.shift();
      while (element !== undefined) {
        nums.push(element);
        element = bucket.shift();
      }
    }
  }
  return nums;
}

// B) write back into same nums + shift
function radixSortShiftInPlace(nums: number[]) {
  const rounds = mostDigits(nums);
  const buckets: number[][] = Array.from({ length: 10 }, () => []);

  for (let i = 0; i < rounds; i++) {
    for (const num of nums) buckets[getDigit(num, i)].push(num);

    let count = 0;
    for (const bucket of buckets) {
      let element = bucket.shift();
      while (element !== undefined) {
        nums[count++] = element;
        element = bucket.shift();
      }
    }
  }
  return nums;
}

function radixSortOwnCount(nums: number[]) {
  if (nums.length <= 1) return nums;
  const rounds = mostDigits(nums);

  for (let i = 0; i < rounds; i++) {
    const buckets: number[][] = Array.from({ length: 10 }, (v, i) => []);
    for (const num of nums) {
      buckets[getDigit(num, i)].push(num);
    }

    let count = 0;
    for (const bucket of buckets) {
      let bucketIdx = 0;
      let element = bucket[bucketIdx];

      while (element !== undefined) {
        nums[count++] = element;
        element = bucket[++bucketIdx];
      }
    }
  }
  return nums;
}

/* ===================== “Perfect-ish” radix (stable counting, no shift) ===================== */
/**
 * LSD radix sort for non-negative 32-bit-ish integers.
 * O(d * (n + base)), stable, minimal allocations:
 * - one output array reused
 * - one counts array per digit
 */
function radixSortCounting(nums: number[]) {
  const n = nums.length;
  if (n <= 1) return nums;

  const maxD = mostDigits(nums);
  const out = new Array<number>(n);

  let pow10 = 1;
  for (let d = 0; d < maxD; d++) {
    const counts = new Array<number>(10).fill(0);

    for (let i = 0; i < n; i++) {
      const digit = ((nums[i] / pow10) | 0) % 10 | 0;
      counts[digit]++;
    }

    for (let k = 1; k < 10; k++) counts[k] += counts[k - 1];

    for (let i = n - 1; i >= 0; i--) {
      const v = nums[i];
      const digit = ((v / pow10) | 0) % 10 | 0;
      out[--counts[digit]] = v;
    }

    for (let i = 0; i < n; i++) nums[i] = out[i];
    pow10 *= 10;
  }

  return nums;
}

/* ===================== Benchmark harness ===================== */

function makeRandomArray(
  n: number,
  seed = 123456,
  maxVal = 1_000_000_000
): number[] {
  let x = seed | 0;
  const out = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    x = (1103515245 * x + 12345) | 0;
    out[i] = (x >>> 0) % maxVal; // non-negative
  }
  return out;
}

function makeFewUniques(n: number, uniques = 50, seed = 42): number[] {
  const a = makeRandomArray(n, seed, uniques);
  return a;
}

function makeNearlySorted(n: number, swaps = 1000, seed = 7): number[] {
  const a = makeRandomArray(n, seed, 1_000_000_000).sort((x, y) => x - y);
  let x = seed | 0;
  for (let s = 0; s < swaps; s++) {
    x = (1103515245 * x + 12345) | 0;
    const i = (x >>> 0) % n;
    x = (1103515245 * x + 12345) | 0;
    const j = (x >>> 0) % n;
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

function isSorted(a: number[]): boolean {
  for (let i = 1; i < a.length; i++) if (a[i - 1] > a[i]) return false;
  return true;
}

function bench(
  name: string,
  fn: (a: number[]) => number[],
  inputs: number[][],
  runs: number
) {
  // warmup
  for (let i = 0; i < Math.min(2, inputs.length); i++) fn(inputs[i].slice());

  const times: number[] = [];
  for (let r = 0; r < runs; r++) {
    const t0 = performance.now();
    for (const base of inputs) {
      const a = base.slice();
      const out = fn(a);
      if (!isSorted(out)) throw new Error(`${name} produced unsorted output`);
    }
    const t1 = performance.now();
    times.push(t1 - t0);

    // @ts-ignore
    if (global.gc) global.gc();
  }

  times.sort((a, b) => a - b);
  const avg = times.reduce((s, x) => s + x, 0) / times.length;
  const med = times[(times.length / 2) | 0];
  console.log(`${name}: avg ${avg.toFixed(2)}ms | median ${med.toFixed(2)}ms`);
}

function runCase(title: string, base: number[], cases = 5, runs = 7) {
  console.log(
    `\n=== ${title} | n=${base.length} | cases=${cases} | runs=${runs} ===`
  );
  const inputs: number[][] = [];
  for (let i = 0; i < cases; i++) inputs.push(base);

  bench("A) shift + rebuild", radixSortShiftRebuild, inputs, runs);
  bench("B) shift + in-place writeback", radixSortShiftInPlace, inputs, runs);
  bench("C) counting", radixSortOwnCount, inputs, runs);
  bench("Perfect) counting (stable)", radixSortCounting, inputs, runs);

  bench("Native .sort()", (a) => a.sort((x, y) => x - y), inputs, runs);
}

function main() {
  runCase("Random", makeRandomArray(5_000, 1), 4, 7);
  runCase("Few uniques", makeFewUniques(5_000, 50, 2), 4, 7);
  runCase("Nearly sorted", makeNearlySorted(5_000, 1000, 3), 4, 7);
}

main();
