<template>
    <h3>Edit student</h3>
    <form @submit.prevent="updateStudent">
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
            }
        }
    },
    created() {
    // watch the params of the route to fetch the data again
      this.$watch(
        () => this.$route.params.id,
        this.fetchData,
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
      )
  },
    methods: {
        // getStudent() {
        //     const studentId = this.$route.params.id;
        //     const student = this.$parent.students.find(student => student.id === parseInt(studentId));
        // }
    }

}
</script>