export function isAscendingOrder(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

export function pick<T extends object>(obj: T, props: Array<keyof T>): Partial<T> {
  const result: Partial<T> = {};
  props.forEach((prop) => {
    result[prop] = obj[prop];
  });
  return result;
}
