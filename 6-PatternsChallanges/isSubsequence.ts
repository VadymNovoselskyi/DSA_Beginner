function isSubsequence(substr: string, sourceStr: string) {
  let substrAt = 0;
  let sourceAt = 0;

  while (sourceAt < sourceStr.length) {
    if (substr[substrAt] !== sourceStr[sourceAt]) {
      sourceAt++;
    } else if (substrAt == substr.length - 1) return true;
    else {
      substrAt++;
      sourceAt++;
    }
  }
  return false;
}
