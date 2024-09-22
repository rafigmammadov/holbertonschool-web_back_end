const http = require('http');
const fs = require('fs');
const path = require('path');

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const rows = data.trim().split('\n');
      if (rows.length <= 1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const headers = rows[0].split(',');
      if (headers[0] !== 'firstname' || headers[1] !== 'lastname' || headers[2] !== 'age' || headers[3] !== 'field') {
        reject(new Error('Invalid CSV format'));
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

      let output = `Number of students: ${totalStudents}\n`;
      for (const [field, names] of Object.entries(studentsByField)) {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      resolve(output.trim());
    });
  });
}

// create server
const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const databasePath = path.resolve(process.argv[2]);

    countStudents(databasePath)
      .then((output) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`This is the list of our students\n${output}`);
      })
      .catch((err) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`This is the list of our students\n${err.message}`);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server listening at port 1245');
});

module.exports = app;
