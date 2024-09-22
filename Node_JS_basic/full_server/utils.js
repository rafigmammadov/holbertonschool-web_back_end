import fs from 'fs/promises';
import path from 'path';

export async function readDatabase(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const data = await fs.readFile(absolutePath, 'utf-8');
    const lines = data.trim().split('\n');
    const fields = {};

    lines.slice(1).forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

    return fields;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}
