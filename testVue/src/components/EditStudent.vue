<template>
    <h3>{{ isNewStudent ? 'Add New Student' : 'Edit Student' }}</h3>
    <form @submit.prevent="updateStudent">
      <div v-if="isNewStudent">
        <label for="id">ID</label>
        <input type="text" v-model="student.id" id="id" />
      </div>

      <div>
        <label for="nume">Nume</label>
        <input type="text" v-model="student.nume" id="nume" />
      </div>
      <div>
        <label for="prenume">Prenume</label>
        <input type="text" v-model="student.prenume" id="prenume" />
      </div>
      <div>
        <label for="materie">Materie</label>
        <input type="text" v-model="student.materie" id="materie" />
      </div>
      <button type="submit">Save</button>
    </form>
</template>
<script>
export default {
data() {
  return {
      student: {  
        id: null,
        nume: '', 
        prenume: '',
        materie: '',
      },
        isNewStudent: false,
      }
  },
  mounted() {
    const id = this.$route.params.id; 
    if (id !== 'new') {
      this.fetchStudent(id);
    } else {
      this.isNewStudent = true; 
    }
    
  },
  methods: {
    fetchStudent(id) {
      fetch(`http://localhost:3000/student/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data,'data fetch');
          this.student = data;
        })
        .catch(err => console.log(err.message))
    },
    updateStudent() {
      const id = this.$route.params.id; 
      if (this.isNewStudent) {
        fetch('http://localhost:3000/student', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.student),
        })
          .then(res => {
            if (res.ok) {
              console.log('Student added successfully');
              this.$router.push('/');
            }
          })
         .catch(err => console.log(err.message));
      } else {
          fetch(`http://localhost:3000/student/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.student)
        })
          .then(res => {
            if (res.ok) {
              console.log('Student updated successfully');
              this.$router.push('/');
            }
          })
          .catch(err => console.log(err.message));
        }

    }
  }

}
</script>