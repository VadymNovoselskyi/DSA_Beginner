function countUniqueValues(arr: number[]): number {
  if (!arr.length) return 0;
  
  let count = 1;
  let left = 0;
  let right = 1;
  while (right < arr.length) {
    if (arr[left] != arr[right]) {
      count++;
      left = right;
    }
    right++;
  }
  return count;
}
