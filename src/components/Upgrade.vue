<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
  name: String,
  count: Number,
  price: Number
})

defineEmits(['buy'])
</script>

<template>
  <div>
    <p>{{ name }}: {{ count }}</p>
    <button @click="$emit('buy')">
      Buy {{ name }} ({{ Math.floor(price) }} cookies)
    </button>
  </div>
</template>

<style scoped>

</style>