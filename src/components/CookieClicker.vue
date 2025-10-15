<script setup>
import { ref, onMounted, watch } from 'vue'
import Upgrade from './Upgrade.vue'
import GoldenCookie from './GoldenCookie.vue'

const cookies = ref(0)
const showGolden = ref(false)

function collectGoldenCookie() {
  const bonus = Math.floor(cookies.value * 0.15 + 13)
  cookies.value += bonus
  showGolden.value = false
}

function spawnGoldenCookie() {
  const delay = Math.random() * 10000 + 5000
  setTimeout(() => {
    if (Math.random() < 0.05) {
      showGolden.value = true
    setTimeout(() => {
      showGolden.value = false
    }, 10000)
  }
    spawnGoldenCookie()
  }, delay)
}

const upgrades = ref([
  {name: 'Grandma', count: 0, price: 100, cps: 1},
  {name: 'Autoclicker', count: 0, price: 15, cps: 0.1}
])

function buyUpgrade(upgrade) {
  if (cookies.value >= upgrade.price) {
    cookies.value -= upgrade.price
    upgrade.count++
    upgrade.price *= 1.15
  }
}

setInterval(() => {
  const grandma = upgrades.value.find(u => u.name === 'Grandma')
  if (grandma) {
    cookies.value += grandma.count * grandma.cps
  }
}, 1000)

setInterval(() => {
  const autoclicker = upgrades.value.find(u => u.name === 'Autoclicker')
  if (autoclicker) {
    cookies.value += autoclicker.count * autoclicker.cps
  }
}, 1000)

watch([cookies, upgrades ],() => {
  const saveData = {
    cookies: cookies.value,
    upgrades: upgrades.value.map(u => ({
      name: u.name,
      count: u.count,
      price: u.price
    }))
  }
  localStorage.setItem('cookieSave', JSON.stringify(saveData))
})

onMounted(() => {
  const saved = localStorage.getItem('cookieSave')
  if (saved) {
    const data = JSON.parse(saved)

    cookies.value = data.cookies ?? 0

    upgrades.value.forEach(upg => {
      const savedUpg = data.upgrades?.find(u => u.name === upg.name)
      if (savedUpg) {
        upg.price = savedUpg.price ?? upg.price
        upg.count = savedUpg.count ?? upg.count
      }
    })
  }
  spawnGoldenCookie()
})

</script>

<template>
  <div>
    <h1>Cookies: {{ Math.round(cookies).toLocaleString() }}</h1>
    <div v-for="upgrade in upgrades" :key="upgrade.name">
      <Upgrade
        :name="upgrade.name"
        :count="upgrade.count"
        :price="upgrade.price"
        @buy="buyUpgrade(upgrade)"
      />
    </div>
    <button @click="cookies++">Bake Cookie</button>
    <GoldenCookie
    v-if="showGolden"
    @clicked="collectGoldenCookie"
    />
  </div>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>