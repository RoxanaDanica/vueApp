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
    };
  },
  mounted() {
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(data => this.students = data)
      .catch(err => console.log(err.message));
  },
  methods: {
    addNewStud() {
      console.log('add function');
    },
    deleteStudent(id) {
      console.log(id);
      fetch(`http://localhost:3000/student/${id}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (res.ok) {
          this.students = this.students.filter(student => student.id !== id);
          console.log('Student deleted');
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  },
    editStudent(id) {
      console.log("Navigating to student:", id);
      this.$router.push(`/student/${id}`);
    }
  }
}
</script>

<template>
  <div class="addBtn"> 
    <RouterLink to="/student/new" @click="addNewStud()"><MainButton>Add student</MainButton></RouterLink>
  </div>
  <div class="cardsContainer">
    <Card v-for="student in students" :key="student.id" :id="student.id" :nume="student.nume" :prenume="student.prenume"
      :materie="student.materie" @delete="deleteStudent(student.id)" @edit="editStudent(student.id)"></Card>
  </div>
</template>

<style>
  .addBtn { padding: 15px 0; }
</style>