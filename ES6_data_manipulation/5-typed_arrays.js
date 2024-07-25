export default function createInt8TypedArray(length, position, value) {
  if (position >= length) {
    throw new Error('Position outside range');
  }

  const someBuffer = new DataView(new ArrayBuffer(length), 0, length);
  someBuffer.setInt8(position, value);
  return someBuffer;
}
