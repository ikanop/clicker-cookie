<script setup>
  import { ref, onBeforeMount, onMounted } from 'vue';

  const targetButton = ref(null)
  const delay = 1000
  const isRunning = ref(false)
  let autoClicker = null

  function startAutoClicking() {
    if (!targetButton.value) {
      console.error('Target element not found')
      return
    }

    isRunning.value = true
    autoClicker = setInterval(() => {
      targetButton.value.click()
      console.log('Clicked!')
    }, delay)
  }
</script>

<template>

</template>

<style scoped>

</style>