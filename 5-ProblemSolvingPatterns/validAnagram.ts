function validAnagram(source: string, target: string) {
  const sourceFreqTable: Record<string, number> = {};
  const targetFreqTable: Record<string, number> = {};

  for (let char of source) {
    sourceFreqTable[char] ??= 0;
    sourceFreqTable[char]++;
  }
  for (let char of target) {
    targetFreqTable[char] ??= 0;
    targetFreqTable[char]++; 
  }

  for (const [char, freq] of Object.entries(sourceFreqTable)) {
    if (!(char in targetFreqTable) || !(targetFreqTable[char] == freq)) {
      return false;
    }
  }
  return true;
}

console.log(validAnagram("aba", "baa"));
console.log(validAnagram("aba", "aaa"));
console.log(validAnagram("aba", "bb"));