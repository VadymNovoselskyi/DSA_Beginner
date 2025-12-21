function findPair(nums: number[], targetDiff: number) {
  const freqTable: Record<number, number> = {};

  for (const num of nums) {
    freqTable[num] ??= 0;
    freqTable[num]++;
  }

  for (const [num, freq] of Object.entries(freqTable)) {
    if (
      (targetDiff !== 0 && Number(num) + targetDiff in freqTable) ||
      (targetDiff === 0 && freq > 1)
    ) {
      return true;
    }
  }
  return false;
}
