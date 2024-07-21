export default function appendToEachArrayValue(array, appendString) {
  const result = [];

  let index = 0;

  for (const value of array) {
    result[index] = appendString + value;

    index += 1;
  }

  return result;
}
