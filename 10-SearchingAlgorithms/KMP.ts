function findSubstring(source: string, pattern: string): number {
  if (!pattern.length) return 0;

  const lps = getPrefixSuffix(pattern);
  let patternIdx = 0;

  let i = 0;
  while (i < source.length) {
    if (source[i] === pattern[patternIdx]) {
      if (patternIdx === pattern.length - 1) return i - patternIdx;
      patternIdx++;
      i++;
    } else if (patternIdx !== 0) {
      patternIdx = lps[patternIdx - 1];
    } else {
      i++;
    }
  }
  return -1;
}

function getPrefixSuffix(source: string): number[] {
  if (!source.length) return [];

  const result: number[] = [0];
  let patternIdx = 0;
  let i = 1;
  while (i < source.length) {
    if (source[patternIdx] === source[i]) {
      result[i] = patternIdx + 1;
      patternIdx++;
      i++;
    } else if (patternIdx === 0) {
      result[i] = 0;
      i++;
    } else patternIdx = result[patternIdx - 1];
  }
  return result;
}
