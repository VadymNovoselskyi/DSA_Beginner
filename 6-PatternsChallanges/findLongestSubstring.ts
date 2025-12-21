function findLongestSubstring(source: string) {
  const charIndexes: Record<string, number> = {};
  let longestSubstrLen = 0;
  let currentSubstrLen = 0;
  let substrStart = 0;

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (charIndexes[char] === undefined || charIndexes[char] < substrStart) {
      currentSubstrLen++;
      longestSubstrLen = Math.max(longestSubstrLen, currentSubstrLen);
    } else {
      currentSubstrLen = currentSubstrLen - (charIndexes[char] - substrStart);
      substrStart = charIndexes[char] + 1;
    }
    charIndexes[char] = i;
  }

  return longestSubstrLen;
}
