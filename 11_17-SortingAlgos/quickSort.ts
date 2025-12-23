function quickSort<T = number>(
  arr: T[],
  //   @ts-ignore
  comparator: (a: T, b: T) => number = (a: number, b: number) => a - b,
  low = 0,
  high = arr.length - 1
): T[] {
  if (high - low < 1) return arr;

  const pivotIdx = partition(arr, comparator, low, high);
  quickSort(arr, comparator, low, pivotIdx - 1);
  quickSort(arr, comparator, pivotIdx + 1, high);
  return arr;
}

function partition<T = number>(
  arr: T[],
  //   @ts-ignore
  comparator: (a: T, b: T) => number = (a: number, b: number) => a - b,
  low: number = 0,
  high: number = arr.length - 1
): number {
  if (high - low < 1) return low;

  let swapIdx = low;
  for (let i = low + 1; i <= high; i++) {
    if (comparator(arr[low], arr[i]) > 0) {
      swapIdx++;
      const temp = arr[swapIdx];
      arr[swapIdx] = arr[i];
      arr[i] = temp;
    }
  }

  const temp = arr[low];
  arr[low] = arr[swapIdx];
  arr[swapIdx] = temp;
  return swapIdx;
}

// const test = [4, 2];
// var arr1 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
// var arr2 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];

// console.log(pivot(test));
// console.log(pivot(arr1));
// console.log(pivot(arr2));
// console.log(test);
// console.log(arr1);
// console.log(arr2);
// console.log(quickSort([5, 4, 2, 1]));
console.log(quickSort([13, 16, 30, 48, 47, 36, 41, 22, 44, 4]));
// console.log(
//   quickSort([
//     4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67,
//     4342, 32,
//   ])
// );
