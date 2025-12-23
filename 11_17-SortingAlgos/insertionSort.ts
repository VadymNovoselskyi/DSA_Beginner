function insertionSort(
  arr: number[],
  comparator: (a: number, b: number) => number = (a: number, b: number) => a - b
): number[] {
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i];
    let j = i - 1;
    while (j >= 0 && comparator(arr[j], element) > 0) {
      arr[j + 1] = arr[j];
      arr[j] = element;
      j--;
    }
  }
  return arr;
}

console.log(insertionSort([5, 4, 2, 1]));
console.log(insertionSort([13, 16, 30, 48, 47, 36, 41, 22, 44, 4]));
console.log(insertionSort([4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32]));
