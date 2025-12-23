function selectionSort(
  arr: number[],
  comparator: (a: number, b: number) => number = (a: number, b: number) => a - b
): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (comparator(arr[minIdx], arr[j]) > 0) {
        minIdx = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }
  return arr;
}

// console.log(selectionSort([5, 4, 2, 1]));
// console.log(selectionSort([13, 16, 30, 48, 47, 36, 41, 22, 44, 4]));
// console.log(selectionSort([4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32]));
