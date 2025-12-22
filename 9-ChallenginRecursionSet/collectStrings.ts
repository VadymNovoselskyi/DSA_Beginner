function collectStrings(
  obj: Record<string, any>,
  result: string[] = []
): string[] {
  if (Object.keys(obj).length === 0) return result;

  const value = obj[Object.keys(obj)[0]];
  delete obj[Object.keys(obj)[0]];

  if (value instanceof Object) {
    collectStrings(value, result);
  } else if (typeof value === "string") {
    result.push(value);
  }

  return collectStrings(obj, result);
}

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

console.log(collectStrings(obj)); // ["foo", "bar", "baz"])
