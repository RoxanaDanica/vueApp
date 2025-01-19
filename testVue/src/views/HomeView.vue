<script>
import { RouterLink, RouterView } from 'vue-router'
import Card from '../components/Card.vue'
import MainButton from '../components/MainButton.vue';

export default {
  components: {
    Card,
    MainButton
  },
  data() {
    return {
      students: [],
      // students: [
      //   { id: 0, nume: "Alex", prenume: "Popescu", materie: "Matematică" },
      //   { id: 1, nume: "Maria", prenume: "Ionescu", materie: "Fizică" },
      //   { id: 2, nume: "Andrei", prenume: "Dumitrescu", materie: "Chimie" },
      //   { id: 3, nume: "Ioana", prenume: "Vasilescu", materie: "Biologie" },
      //   { id: 4, nume: "Radu", prenume: "Marin", materie: "Istorie" },
      //   { id: 5, nume: "Ana", prenume: "Georgescu", materie: "Geografie" },
      //   { id: 6, nume: "Cristian", prenume: "Pavel", materie: "Informatică" },
      //   { id: 7, nume: "Elena", prenume: "Nistor", materie: "Engleză" },
      //   { id: 8, nume: "Gabriel", prenume: "Popa", materie: "Sport" },
      //   { id: 9, nume: "Diana", prenume: "Rusu", materie: "Muzică" }
      // ]
    };
  },

  mounted() {
    fetch('http://localhost:5173/')
      .then(res => res.json())
      .then(data => this.students = data)
      .catch(err => console.log(err.message));
    
  },
  methods: {
    addNewStud() {
      console.log('add function');
    },
    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
    },
    editStudent(id) {
      this.$router.push(`/student/${id}/edit`);
    }
  }
}
</script>

<template>
  <div class="addBtn"> 
    <RouterLink to="/student/1" @click="addNewStud()"><MainButton>Add student</MainButton></RouterLink>
  </div>
  <div class="cardsContainer">
    <Card v-for="student in students" :key="student.id" :id="student.id" :nume="student.nume" :prenume="student.prenume"
      :materie="student.materie" @delete="deleteStudent()" @edit="editStudent()"></Card>
  </div>
</template>

<style>
  .addBtn { padding: 15px 0; }
</style>