function bubbleSort(
  arr: number[],
  comparator: (a: number, b: number) => number = (a: number, b: number) => a - b
): number[] {
  let swapped;
  for (let i = arr.length - 1; i > 0; i--) {
    swapped = false;
    for (let j = 0; j < i; j++) {
      if (comparator(arr[j], arr[j + 1]) < 0) continue;
      const temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      swapped = true;
    }
    if (!swapped) break;
  }
  return arr;
}

// Orig:
// function bubbleSort(arr: number[]): number[] {
//   for (let i = arr.length - 1; i > 0; i-- ) {
//     for (let j = 0; j < i; j++) {
//       if (arr[j] < arr[j + 1]) continue;
//       const temp = arr[j];
//       arr[j] = arr[j + 1];
//       arr[j + 1] = temp;
//     }
//   }
//   return arr;
// }

// console.log(bubbleSort([5, 4, 2, 1]));
// console.log(bubbleSort([13, 16, 30, 48, 47, 36, 41, 22, 44, 4]));
