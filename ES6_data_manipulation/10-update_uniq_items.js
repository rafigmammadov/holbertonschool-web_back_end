export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) {
    throw new Error('More map data structure');
  }

  map.forEach((key, value) => {
    if (value === 1) {
      map.set(key, 100);
    }
  });
}
