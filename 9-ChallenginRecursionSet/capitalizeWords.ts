function capitalizeWords(words: string[]): string[] {
  if (words.length === 0) return [];
  return [words[0].toUpperCase()].concat(capitalizeWords(words.slice(1)));
}

// Just for funzy
function capitalizedWord(word: string): string {
  if (word.length === 0) return "";
  return word[0].toUpperCase() + capitalizedWord(word.slice(1));
}

// let words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
