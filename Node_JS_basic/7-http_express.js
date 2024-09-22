const express = require('express');
const fs = require('fs');

const app = express();
const databaseFile = process.argv[2];

if (!databaseFile) {
  console.error('Please provide the database file as an argument');
  process.exit(1);
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');

  fs.readFile(databaseFile, 'utf8', (err, data) => {
    if (err) {
      res.end('Cannot load the database');
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim().length > 0);
    const students = lines.slice(1).map((line) => line.split(','));

    const fields = {
      CS: [],
      SWE: [],
    };

    students.forEach((student) => {
      const field = student[3];
      const name = student[0];

      if (fields[field]) {
        fields[field].push(name);
      }
    });

    let response = '';
    const totalStudents = students.length;
    response += `Number of students: ${totalStudents}\n`;

    Object.keys(fields).forEach((field) => {
      const studentList = fields[field];
      response += `Number of students in ${field}: ${studentList.length}. List: ${studentList.join(', ')}\n`;
    });

    res.end(response.trim());
  });
});

app.listen(1245, () => {
  console.log('Server listening at port 1245');
});

module.exports = app;
