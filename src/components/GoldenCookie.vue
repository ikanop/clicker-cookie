<script setup>
const emit = defineEmits(['clicked']);

function handleClick() {
  emit('clicked');
}
</script>

<template>
  <div class="golden-cookie" @click="handleClick">
    🍪✨
  </div>
</template>

<style scoped>
.golden-cookie {
position: absolute;          /* float over other elements */
left: 50%;                   /* center horizontally */
top: 50%;                    /* center vertically */
transform: translate(-50%, -50%);
width: 200px;                 /* clickable area */
height: 200px;                /* clickable area */
font-size: 40px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
user-select: none;
z-index: 999;                /* on top of other elements */
}
</style>