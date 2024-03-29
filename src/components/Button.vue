<script>
    export default{
        name: 'Butoon' ,
        methods : {
            createItem(){
                this.$emit('click')
            }
        }
    }
</script>

<template>
    <button @click="createItem()">Add item</button>
</template>
