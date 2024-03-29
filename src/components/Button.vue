<script>
    export default{
        props : {
           buttonText: String,
           handleClick: Function,
        }
    }
</script>

<template>
    <button @click="handleClick()">{{buttonText}}</button>
</template>
