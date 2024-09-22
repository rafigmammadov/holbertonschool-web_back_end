const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, rejects) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        rejects(new Error('Cannot load the database'));
        return;
      }

      const rows = data.trim().split('\n');

      if (rows.length === 0) {
        rejects(new Error('Cannot load the database'));
        return;
      }

      const headers = rows[0].split(',');
      if (headers[0] !== 'firstname' || headers[1] !== 'lastname' || headers[2] !== 'age' || headers[3] !== 'field') {
        rejects(new Error('Invalid CSV format'));
        return;
      }

      const studentsByField = {};
      let totalStudents = 0;

      rows.slice(1).forEach((row) => {
        const columns = row.split(',');

        if (columns.length === 4 && columns.every((column) => column.trim() !== '')) {
          const [firstname, , , field] = columns;

          if (!studentsByField[field]) {
            studentsByField[field] = [];
          }

          studentsByField[field].push(firstname);
          totalStudents += 1;
        }
      });

      console.log(`Number of students: ${totalStudents}`);

      for (const [field, names] of Object.entries(studentsByField)) {
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }

      resolve();
    });
  });
}
module.exports = countStudents;
