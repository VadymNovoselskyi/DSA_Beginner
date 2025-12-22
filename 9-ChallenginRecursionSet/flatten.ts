function flatten(list: any[]): any[] {
  if (list.length === 0) return [];

  let element = list.shift();
  if (element instanceof Array) {
    return flatten(element).concat(flatten(list));
  }

  return [element].concat(flatten(list));
}

// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3
