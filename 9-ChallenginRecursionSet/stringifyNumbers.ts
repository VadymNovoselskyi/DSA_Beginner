function stringifyNumbers(
  obj: Readonly<Record<string, any>>,
  result: Record<string, any> = {},
  keyIndex: number = 0
): Record<string, any> {
  if (Object.keys(obj).length === 0 || Object.keys(obj).length <= keyIndex) {
    return result;
  }

  const key = Object.keys(obj)[keyIndex];
  const value = obj[key];
  keyIndex++;

  //   IS this REALLY the way?????????????
  if (Object.prototype.toString.call(value) === "[object Object]") {
    result[key] = stringifyNumbers(value);
  } else if (Number.isInteger(value)) {
    result[key] = (value as number).toString();
  } else result[key] = value;
  return stringifyNumbers(obj, result, keyIndex);
}

// let obj = {
//   num: 1,
//   test: [],
//   data: {
//     val: 4,
//     info: {
//       isRight: true,
//       random: 66,
//     },
//   },
// };

// console.log(JSON.stringify(stringifyNumbers(obj), null, 2));

// {
//     num: "1",
//     test: [],
//     data: {
//         val: "4",
//         info: {
//             isRight: true,
//             random: "66"
//         }
//     }
// }
