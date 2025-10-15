<script setup>
import { ref, onMounted, watch } from 'vue'
import Upgrade from './Upgrade.vue'
import GoldenCookie from './GoldenCookie.vue'
import Reset from './reset.vue'
import { provide } from 'vue'

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
  {name: 'Autoclicker', count: 0, price: 15, cps: 0.1},
  {name: 'Grandma', count: 0, price: 100, cps: 1},
  {name: 'Farm', count: 0, price: 1200, cps: 8},
  {name: 'Mine', count: 0, price: 12000, cps: 47},
  {name: 'Factory', count: 0, price: 130000, cps: 260},
  {name: 'Bank', count: 0, price: 1.4e6, cps: 1400},
  {name: 'Temple', count: 0, price: 2.0e7, cps: 7800},
  {name: 'Wizard Tower', count: 0, price: 3.3e8, cps: 44000},
  {name: 'Shipment', count: 0, price: 5.1e9, cps: 260000},
  {name: 'Alchemy Lab', count: 0, price: 7.5e10, cps: 1.6e6},
  {name: 'Portal', count: 0, price: 1.0e12, cps: 1.0e7}
])

provide('cookies', cookies)
provide('upgrades', upgrades)

function buyUpgrade(upgrade) {
  if (cookies.value >= upgrade.price) {
    cookies.value -= upgrade.price
    upgrade.count++
    upgrade.price *= 1.15
  }
}

setInterval(() => {
  upgrades.value.forEach(upgrade => {
    cookies.value += upgrade.count * upgrade.cps
  })
}, 1000)

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



function formatNumber(num) {
  if (typeof num !== 'number' || isNaN(num)) return '0'

  const units = [
    { value: 1e30, symbol: 'N' },   // Nonillion
    { value: 1e27, symbol: 'O' },   // Octillion
    { value: 1e24, symbol: 'S' },   // Septillion
    { value: 1e21, symbol: 's' },   // Sextillion
    { value: 1e18, symbol: 'Qn' },  // Quintillion
    { value: 1e15, symbol: 'Q' },   // Quadrillion
    { value: 1e12, symbol: 'T' },   // Trillion
    { value: 1e9,  symbol: 'B' },   // Billion
    { value: 1e6,  symbol: 'M' },   // Million
    { value: 1e3,  symbol: 'K' }    // Thousand
  ]

  for (const unit of units) {
    if (num >= unit.value) {
      const formatted = (num / unit.value).toFixed(1).replace(/\.0$/, '')
      return `${formatted}${unit.symbol}`
    }
  }

  return num.toLocaleString()
}

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
      ></Upgrade>
    </div>
    <button @click="cookies++">Bake Cookie</button>
    <GoldenCookie
    v-if="showGolden"
    @clicked="collectGoldenCookie"
    />
    <reset/>
  </div>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>