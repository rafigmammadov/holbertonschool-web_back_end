const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const rows = data.trim().split('\n');

    if (rows.length === 0) {
      throw new Error('Cannot load the database');
    }

    const headers = rows[0].split(',');
    if (headers[0] !== 'firstname' || headers[1] !== 'lastname' || headers[2] !== 'age' || headers[3] !== 'field') {
      throw new Error('Invalid CSV format');
    }

    const students = {};
    let totalStudents = 0;

    for (let i = 1; i < rows.length; i += 1) {
      const fields = rows[i].split(',');
      if (fields.length >= 4 && !fields.some((field) => field.trim() === '')) {
        const [firstname, , , field] = fields;
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstname);
        totalStudents += 1;
      }
    }

    console.log(`Number of students: ${totalStudents}`);

    for (const [field, names] of Object.entries(students)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
