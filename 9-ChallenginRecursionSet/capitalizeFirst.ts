function capitalizeFirst(words: string[]): string[] {
  if (words.length === 0) return [];
  return [words[0].charAt(0).toUpperCase() + words[0].slice(1)].concat(
    capitalizeFirst(words.slice(1))
  );
}

// capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']
