<script setup>
import {defineProps, defineEmits} from 'vue'
import {formatNumber} from "../utils/format.js";

defineProps({
  name: String,
  count: Number,
  price: Number,
  revealed: Boolean,
  cps: Number
})

defineEmits(['buy'])
</script>

<template>
  <div>
    {{
      revealed
        ? `${name}: ${count} (CPS: ${formatNumber(cps * count)})` : '???'
    }}
    <button v-if="revealed" @click="$emit('buy')">
      {{ name }} ({{ formatNumber(price) }} cookies)
    </button>
    <button v-else>
      ??? ({{ formatNumber(price) }} cookies)
    </button>
  </div>
</template>

<style scoped>
</style>