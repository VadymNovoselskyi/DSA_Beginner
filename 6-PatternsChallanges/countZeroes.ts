function countZeroes(nums: number[], total: number = 0) {
  if (nums.length === 1) {
    return nums[0] === 0 ? total + 1 : total;
  }

  const middle = Math.ceil(nums.length / 2);
  if (nums[middle] === 0) {
    return countZeroes(nums.slice(0, middle), total + (nums.length - middle));
  } else {
    return countZeroes(nums.slice(middle + 1), total);
  }
}
