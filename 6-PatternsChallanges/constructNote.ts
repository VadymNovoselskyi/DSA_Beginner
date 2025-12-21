function constructNote(message: string, letters: string) {
  const lettersFreq: Record<string, number> = {};
  for (const letter of letters) {
    lettersFreq[letter] ??= 0;
    lettersFreq[letter]++;
  }

  for (const messageChar of message) {
    if (!(messageChar in lettersFreq) || lettersFreq[messageChar] === 0) {
      return false;
    }
    lettersFreq[messageChar]--;
  }
  return true;
}
