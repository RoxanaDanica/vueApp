<script>
    import MainButton from './MainButton.vue'

   export default {
    props: {
        id: Number,
        nume: String,
        prenume: String,
        materie: String
    },
    components: {
        MainButton
    },
    methods: {
        onClickDelete() {
            this.$emit('delete', this.id); 
        },
        onEdit() {
            console.log('edit', this.id);
        }
    }
   }
</script>

<template>

    <div class="cardWrapper">
        <p>Nume: {{ this.nume }}</p>
        <p>Prenume: {{ this.prenume }}</p>
        <p>Materie: {{ this.materie }}</p>
        <div class="buttons">
            <MainButton @click="onClickDelete()">Delete</MainButton>
            <MainButton @click="onEdit()">Edit</MainButton>
        </div>
    </div>

</template>

<style>
    .cardWrapper { height: auto; border: 1px solid red; padding: 15px; }
    .cardsContainer { display: flex; gap: 15px; width: 100%;  display: grid; grid-template-columns: repeat(3,1fr); }
    .buttons { display: flex; flex-direction: row; gap: 15px; padding-top: 10px; }
</style>