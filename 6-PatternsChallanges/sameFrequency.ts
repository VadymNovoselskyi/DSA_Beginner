function sameFrequency(num1: number, num2: number) {
  const numFreq1: Record<string, number> = {};
  const numFreq2: Record<string, number> = {};
  for (const char of num1.toString()) {
    numFreq1[char] ??= 0;
    numFreq1[char]++;
  }
  for (const char of num2.toString()) {
    numFreq2[char] ??= 0;
    numFreq2[char]++;
  }

  for (const [char, freq] of Object.entries(numFreq1)) {
    if (!(char in numFreq2) || numFreq2[char] !== freq) return false;
  }
  return true;
}
