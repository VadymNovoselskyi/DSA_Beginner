function mergeSort<T = number>(
  arr: T[],
  //   @ts-ignore
  comparator: (a: T, b: T) => number = (a: number, b: number) => a - b
): T[] {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  return merge(
    mergeSort(arr.slice(0, middle), comparator),
    mergeSort(arr.slice(middle), comparator),
    comparator
  );
}

function merge<T>(
  arr1: T[],
  arr2: T[],
  //   @ts-ignore
  comparator: (a: T, b: T) => number = (a: T, b: T) => a - b
): T[] {
  const result: T[] = [];
  let pointer1 = 0;
  let pointer2 = 0;

  while (pointer1 < arr1.length && pointer2 < arr2.length) {
    if (comparator(arr1[pointer1], arr2[pointer2]) < 0) {
      result.push(arr1[pointer1]);
      pointer1++;
    } else {
      result.push(arr2[pointer2]);
      pointer2++;
    }
  }

  while (pointer1 < arr1.length) {
    result.push(arr1[pointer1]);
    pointer1++;
  }
  while (pointer2 < arr2.length) {
    result.push(arr2[pointer2]);
    pointer2++;
  }
  return result;
}

// var arr1 = [1, 3, 4, 5];
// var arr2 = [2, 4, 6, 8];
// console.log(merge(arr1, arr2));

// console.log(mergeSort([5, 4, 2, 1]));
// console.log(mergeSort([13, 16, 30, 48, 47, 36, 41, 22, 44, 4]));
// console.log(
//   mergeSort([
//     4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67,
//     4342, 32,
//   ])
// );

// mergeSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
// mergeSort([0, -10, 7, 4]); // [-10, 0, 4, 7]
// mergeSort([1, 2, 3]); // [1, 2, 3]
// mergeSort([]);

// var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
// mergeSort(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

// var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

// function strComp(a: string, b: string) {
//   if (a < b) {
//     return -1;
//   } else if (a > b) {
//     return 1;
//   }
//   return 0;
// }

// console.log(mergeSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

// var moarKittyData = [
//   {
//     name: "LilBub",
//     age: 7,
//   },
//   {
//     name: "Garfield",
//     age: 40,
//   },
//   {
//     name: "Heathcliff",
//     age: 45,
//   },
//   {
//     name: "Blue",
//     age: 1,
//   },
//   {
//     name: "Grumpy",
//     age: 6,
//   },
// ];

// function oldestToYoungest(a, b) {
//   return b.age - a.age;
// }

// mergeSort(moarKittyData, oldestToYoungest);
