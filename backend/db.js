// DB psss: paSS123@
var mysql = require('mysql2/promise');


let connection = null;


async function connectDB() {
    const conn = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'paSS123@',
        database : 'vue_demo'
    });

    connection = conn;
}



async function getStudents() {
    try {
        const [results, fields] = await connection.execute(
            `SELECT students.*, materii.materie
            FROM students
            INNER JOIN student_materii ON students.id = student_materii.student_id
            INNER JOIN materii ON student_materii.materie_id = materii.id`);
        return results; 
    } catch (err) {
        throw new Error('Eroare la interogare: ' + err.message); 
    }
}

async function getStudent(studentId) {
    try {
        const [results, fields] = await connection.execute(
            `SELECT students.*, materii.materie
            FROM students
            INNER JOIN student_materii ON students.id = student_materii.student_id
            INNER JOIN materii ON student_materii.materie_id = materii.id
            WHERE students.id = ?`,
            [studentId]
        );
        return results;
    } catch (err) {
        throw new Error('Eroare la interogare: ' + err.message);
    }
} 

async function deleteStudent(studentId) {
    try {
        const [results, fields] = await connection.execute(
            `DELETE FROM students
            WHERE students.id = ?`,
            [studentId]
        );
        return results;
    } catch (err) {
        throw new Error('Eroare la interogare: ' + err.message);
    }
}

async function createStudent(id, nume, prenume, materie) {
    try {
        const [materieResult] = await connection.execute(
            'SELECT id FROM materii WHERE materie = ?',
            [materie]  
        );
        if (materieResult.length === 0) {
            throw new Error('Materia nu există în baza de date');
        }
        const materieId = materieResult[0].id;


        const [studentResult] = await connection.execute(
            `INSERT INTO students (id, nume, prenume) VALUES (?, ?, ?)`,
            [id, nume, prenume]
        );
        const [studentMaterieResult] = await connection.execute(
            `INSERT INTO student_materii (student_id, materie_id) VALUES (?, ?)`,
            [id, materieId]
        );

        return {
            studentResult,
            studentMaterieResult
        };
    } catch (err) {
        throw new Error('Eroare la interogare: ' + err.message);
    }
}

    async function updateStudent(studentId,nume, prenume, materie) {
        try {
            const [materieResult] = await connection.execute(
            'SELECT id FROM materii WHERE materie = ?',
            [materie]  
        );
        if (materieResult.length === 0) {
            throw new Error('Materia nu există în baza de date');
        }
        const materieId = materieResult[0].id;


        const [studentResult] = await connection.execute(
            `UPDATE students 
             SET nume = ?, prenume = ? 
             WHERE id = ?`,
            [nume, prenume, studentId]  
        );

        if (studentResult.affectedRows === 0) {
            throw new Error('Studentul nu a fost găsit sau nu a fost actualizat');
        }
        const [studentMaterieResult] = await connection.execute(
            `UPDATE student_materii 
             SET materie_id = ? 
             WHERE student_id = ?`,
            [materieId, studentId]  
        );

        return {
            studentResult,
            studentMaterieResult
        };
        } catch (err) {
            throw new Error('Eroare la interogare: ' + err.message);
        }
    }


module.exports = {
    connectDB,
    getStudents,
    getStudent,
    deleteStudent,
    createStudent,
    updateStudent
};

