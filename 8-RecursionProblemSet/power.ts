// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16

function power(num: number, pow: number): number {
  if (pow === 0) return 1;
  if (pow === 1) return num;
  return num * power(num, pow - 1);
}
