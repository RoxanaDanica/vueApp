<template>
  <form class="mainForm">
    <input placeholder="Nume" type="text" v-model="student.nume"></input>
    <input placeholder="Prenume" type="text" v-model="student.prenume" />
    <input placeholder="Materie" type="text" v-model="student.materie"/>
    <div>
        <button type="button" @click="saveStud()" class="submitButtom">Submit</button>
    </div>
  </form>
</template>

<script>
    
export default {
  data() {
        return {
            student: { id: 0, nume: "Alex", prenume: "Popescu", materie: "Matematică" },
        }
    },
    methods: {
        saveStud() {
            console.log(this.student);
        }
    }
}
</script>
<style scoped>
    .mainForm { display: flex; flex-direction: column; gap: 10px; padding: 10px 0; }
    input { padding: 12px 10px; min-height: 20px; }
    .submitButtom { display: flex; width: auto; padding: 12px 10px; background: whitesmoke; }
    .submitButtom:hover { background-color: white; transition: 0.3 all; }
</style>