const express = require('express')
const cors = require('cors'); 
const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

const students = [
  { id: 0, nume: "Alex", prenume: "Popescu", materie: "Matematică" },
  { id: 1, nume: "Maria", prenume: "Ionescu", materie: "Fizică" },
  { id: 2, nume: "Andrei", prenume: "Dumitrescu", materie: "Chimie" },
  { id: 3, nume: "Ioana", prenume: "Vasilescu", materie: "Biologie" },
  { id: 4, nume: "Radu", prenume: "Marin", materie: "Istorie" },
  { id: 5, nume: "Ana", prenume: "Georgescu", materie: "Geografie" },
  { id: 6, nume: "Cristian", prenume: "Pavel", materie: "Informatică" },
  { id: 7, nume: "Elena", prenume: "Nistor", materie: "Engleză" },
  { id: 8, nume: "Gabriel", prenume: "Popa", materie: "Sport" },
  { id: 9, nume: "Diana", prenume: "Rusu", materie: "Muzică" }
]

app.get('/', (req, res) => { // get all
  res.send(students);
})

app.get('/student/:studentId', (req, res) => { // get one student
  const studentId = parseInt(req.params.studentId);
  const student = students.find((student) => student.id === studentId)
  console.log(student);
  if (student) {
     res.send(student);
  } else {
    res.status(404)
    console.log('student not found');
  }
 
})

app.delete('/student/:studentId', (req, res) => { // delete student
  const studentId = parseInt(req.params.studentId);
  const studentIndex = students.findIndex((student) => student.id == studentId);

  if (studentIndex !== -1) {
    const removedStudent = students.splice(studentIndex, 1); 
    res.send(removedStudent); 
  } else {
    res.status(404).send('Student not found');
  }
});

app.post('/student', (req, res) => { // Add new student
  const { id, nume, prenume, materie } = req.body;

  const newStudent = { id, nume, prenume, materie };
  students.push(newStudent);
  console.log(newStudent);
  res.status(200).send(newStudent);

});

app.put('/student/:studentId', (req, res) => { //update student
  const studentId = parseInt(req.params.studentId);
  const { nume, prenume, materie } = req.body;
  const student = students.find((student) => student.id === studentId);
  
  student.nume = nume;
  student.prenume = prenume; 
  student.materie = materie;

   res.status(200).send(student);

});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})