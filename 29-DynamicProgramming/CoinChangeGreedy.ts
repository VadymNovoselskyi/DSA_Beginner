// Greedy algo
function minCoinChange(coins: number[], amount: number): number[] {
  const result: number[] = [];
  for (let i = coins.length - 1; i >= 0; i--) {
    while (amount >= coins[i]) {
      result.push(coins[i]);
      amount -= coins[i];
    }
  }
  return result;
}

// DP algo iterative
function coinChange(coins: number[], amount: number): number {
  const results = new Array(amount + 1).fill(0);
  results[0] = 1;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      results[i] += results[i - coin];
    }
  }
  return results[amount];
}

// DP algo recursive
// doesnt work because of the same change being counted many times, and hashing is too expensive to store and look up
// function coinChange(
//   coins: number[],
//   amount: number,
//   memo: Record<number, number> = {}
// ): number {
//   if (amount === 0) return 1;

//   let result = 0;
//   for (const coin of coins) {
//     if (amount < coin) break;

//     if (memo[amount - coin] !== undefined) {
//       result += memo[amount - coin];
//       console.log(
//         `for coin: ${coin}; amount: ${amount - coin} memo is: ${memo[amount - coin]}`
//       );
//       continue;
//     }
//     const temp = coinChange(coins, amount - coin, memo);
//     memo[amount - coin] = temp;
//     result += temp;
//     // const temp = memo[amount - coin] ?? coinChange(coins, amount - coin, memo);
//     // memo[amount - coin] = temp;
//     // result += temp;
//     console.log(`for coin: ${coin}; amount: ${amount - coin} calc res is: ${temp}`);
//   }

//   console.log(`amount: ${amount} res is: ${result}`);
//   return result;
// }
