<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  name: String,
  count: Number,
  price: Number
})

defineEmits(['buy'])

// Format number for display: integers below 1K, units above
function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0';

  if (num < 1000) return Math.floor(num).toString();

  const units = ["K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","Ud","Dd","Td","Qad","Qid"];
  let scaled = num;
  let unitIndex = -1;

  while (scaled >= 1000 && unitIndex < units.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }

  return scaled.toFixed(1).replace(/\.0$/, '') + units[unitIndex];
}
</script>

<template>
  <div>
    <p>{{ name }}: {{ count }}</p>
    <button @click="$emit('buy')">
      Buy {{ name }} ({{ formatNumber(price) }} cookies)
    </button>
  </div>
</template>

<style scoped>
</style>