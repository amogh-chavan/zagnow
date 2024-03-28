export function hasDuplicates(arr: any[]): boolean {
  const map = new Map();
  for (const item of arr) {
    if (map.has(item)) {
      return true;
    }
    map.set(item, 1);
  }
  return false;
}
