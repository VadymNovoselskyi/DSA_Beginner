function averagePair(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = (nums[left] + nums[right]) / 2.0;
    if (sum < target) left++;
    else if (sum > target) right--;
    else return true;
  }
  return false
}
