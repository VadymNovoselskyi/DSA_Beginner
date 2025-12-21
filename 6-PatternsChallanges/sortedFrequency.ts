function sortedFrequency(nums: number[], target: number) {
  const lowestBounds = getLowestBounds(nums, target);
  if (lowestBounds === nums.length - 1 && nums[nums.length - 1] !== target) {
    return -1;
  }

  const highestBounds = getHighestBounds(nums, target);

  return highestBounds - lowestBounds + 1;
}

function getLowestBounds(
  nums: number[],
  target: number,
  indexOffset: number = 0
) {
  if (nums.length === 0 || nums.length === 1) return indexOffset;

  const middle = Math.floor(nums.length / 2);
  if (nums[middle] < target) {
    return getLowestBounds(
      nums.slice(middle + 1),
      target,
      indexOffset + middle + 1
    );
  } else {
    return getLowestBounds(nums.slice(0, middle), target, indexOffset);
  }
}

function getHighestBounds(
  nums: number[],
  target: number,
  indexOffset: number = 0
) {
  if (nums.length === 0) return indexOffset;
  if (nums.length === 1) {
    return nums[0] === target ? indexOffset : indexOffset - 1;
  }

  const middle = Math.floor(nums.length / 2);
  if (nums[middle] <= target) {
    return getHighestBounds(
      nums.slice(middle + 1),
      target,
      indexOffset + middle + 1
    );
  } else {
    return getHighestBounds(nums.slice(0, middle), target, indexOffset);
  }
}
