import express from 'express';
import AppController from './controllers/AppController';
import StudentsController from './controllers/StudentsController';

const app = express();
const port = 1245;


app.get('/', AppController.getHomepage);
app.get('/students', StudentsController.getAllStudents);
app.get('/students/:major', StudentsController.getAllStudentsByMajor);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
