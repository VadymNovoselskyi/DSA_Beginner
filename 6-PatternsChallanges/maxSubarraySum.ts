function maxSubarraySum(nums: number[], subarrayLength: number) {
  if (nums.length < subarrayLength) return null;

  let maxSum = 0;
  for (let i = 0; i < subarrayLength; i++) {
    maxSum += nums[i];
  }

  let currentSum = maxSum;
  for (let i = subarrayLength; i < nums.length; i++) {
    currentSum = currentSum - nums[i - subarrayLength] + nums[i];
    maxSum = Math.max(currentSum, maxSum);
  }
  return maxSum;
}
