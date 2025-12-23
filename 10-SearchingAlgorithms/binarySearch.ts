function binarySearch(arr: number[], target: number) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const middle = low + Math.floor((high - low) / 2);
    if (arr[middle] < target) low = middle + 1;
    else if (arr[middle] > target) high = middle - 1;
    else return middle;
  }
  return -1;
}
