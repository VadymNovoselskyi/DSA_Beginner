function areThereDuplicates<T extends string | number>(...args: T[]) {
  const argsFreq: Partial<Record<T, number>> = {};

  for (const arg of args) {
    if (arg in argsFreq) return true;
    argsFreq[arg] = 1;
  }
  return false;
}
