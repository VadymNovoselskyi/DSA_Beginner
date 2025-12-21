function findAllDuplicates(nums: number[]) {
  const freqTable: Record<number, number> = {};

  for (const num of nums) {
    freqTable[num] ??= 0;
    freqTable[num]++;
  }

  const res: number[] = [];
  for (const [num, freq] of Object.entries(freqTable)) {
    if (freq > 1) res.push(Number(num));
  }
  return res
}
