// isPalindrome('awesome') // false
// isPalindrome('foobar') // false
// isPalindrome('tacocat') // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

function isPalindrome(source: string): boolean {
  if (source.length <= 1) return true;
  return (
    source[0] === source[source.length - 1] &&
    isPalindrome(source.slice(1, source.length - 1))
  );
}
