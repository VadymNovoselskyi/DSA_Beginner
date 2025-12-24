function radixSort(nums: number[]) {
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

// Orig:
// function radixSort(nums: number[]) {
//   const rounds = mostDigits(nums);

//   const buckets: number[][] = Array.from({ length: 10 }, (v, i) => []);
//   for (let i = 0; i < rounds; i++) {
//     for (const num of nums) {
//       buckets[getDigit(num, i)].push(num);
//     }

//     let count = 0;
//     for (const bucket of buckets) {
//       let element = bucket.shift();

//       while (element !== undefined) {
//         nums[count] = element;
//         count++;
//         element = bucket.shift();
//       }
//     }
//   }
//   return nums;
// }

function mostDigits(nums: number[]) {
  let max = 0;
  for (const num of nums) {
    max = Math.max(max, digitCount(num));
  }
  return max;
}

function digitCount(num: number) {
  return Math.floor(Math.log10(num)) + 1;
}

function getDigit(num: number, i: number) {
  return Math.floor((num % Math.pow(10, i + 1)) / Math.pow(10, i));
}

console.log(radixSort([8, 6, 1, 12])); // [1, 6, 8, 12]
console.log(radixSort([10, 100, 1, 1000, 10000000])); // [1, 10, 100, 1000, 10000000]
console.log(
  radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593])
);
// [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]
