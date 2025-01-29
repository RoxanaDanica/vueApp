const express = require('express')
const cors = require('cors'); 
const app = express()
const port = 3000

const { connectDB, getStudents, getStudent, deleteStudent, createStudent, updateStudent } = require('./db');

app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => { // get all
  const students = await getStudents();
  res.send(students)
})

app.get('/student/:studentId', async(req, res) => { // get one student
  const studentId = parseInt(req.params.studentId);
  const student = await getStudent(studentId);
  console.log(student);
  if (student) {
     res.send(student[0]);
  } else {
    res.status(404)
    console.log('student not found');
  }
 
})

app.delete('/student/:studentId', async(req, res) => { // delete student
  const studentId = parseInt(req.params.studentId);
  const student = await deleteStudent(studentId);
  res.send(student); 
});

app.post('/student', async(req, res) => { // Add new student
  const { id, nume, prenume, materie } = req.body;
  const student = await createStudent(id,nume,prenume,materie); 

  console.log(student);
  res.status(200).send(student);

});

app.put('/student/:studentId', async(req, res) => { //update student
  const studentId = parseInt(req.params.studentId);
  const { nume, prenume, materie } = req.body;
  const student = await updateStudent(studentId,nume,prenume,materie);
   
  student.nume = nume;
  student.prenume = prenume; 
  student.materie = materie;

   res.status(200).send(student);

});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
