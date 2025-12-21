function minSubArrayLen(nums: number[], minSum: number) {
  let minLen = Infinity;
  let currentLen = 0;
  let currentSum = 0;

  let left = 0;
  let right = 0;
  while (right < nums.length || currentSum - nums[left] >= minSum) {
    if (currentSum - nums[left] >= minSum) {
      currentSum -= nums[left];
      currentLen--;
      minLen = Math.min(minLen, currentLen);
      left++;
    } else {
      currentSum += nums[right];
      currentLen++;

      right++;
    }
  }
  return minLen === Infinity ? 0 : minLen;
}
