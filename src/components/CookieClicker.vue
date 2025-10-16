<script setup>
import {ref, onMounted, watch} from 'vue'
import Upgrade from './Upgrade.vue'
import {formatNumber} from "../utils/format.js";
import GoldenCookie from './GoldenCookie.vue'
import Reset from './reset.vue'
import {provide} from 'vue'

const cookies = ref(0)
const showGolden = ref(false)
const clickPower = ref(1)

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
  {name: 'Autoclicker', count: 0, price: 15, cps: 0.1, revealed: false},
  {name: 'Grandma', count: 0, price: 100, cps: 1, revealed: false},
  {name: 'Farm', count: 0, price: 1200, cps: 8, revealed: false},
  {name: 'Mine', count: 0, price: 12000, cps: 47, revealed: false},
  {name: 'Factory', count: 0, price: 130000, cps: 260, revealed: false},
  {name: 'Bank', count: 0, price: 1.4e6, cps: 1400, revealed: false},
  {name: 'Temple', count: 0, price: 2.0e7, cps: 7800, revealed: false},
  {name: 'Wizard Tower', count: 0, price: 3.3e8, cps: 44000, revealed: false},
  {name: 'Shipment', count: 0, price: 5.1e9, cps: 260000, revealed: false},
  {name: 'Alchemy Lab', count: 0, price: 7.5e10, cps: 1.6e6, revealed: false},
  {name: 'Portal', count: 0, price: 1.0e12, cps: 1.0e7, revealed: false},
  {name: 'Click Multiplier', count: 0, price: 100, cps: 0, revealed: true}
])

provide('cookies', cookies)
provide('upgrades', upgrades)

function buyUpgrade(upgrade) {
  if (cookies.value >= upgrade.price) {
    cookies.value -= upgrade.price
    upgrade.count++

    if (upgrade.name === 'Click Multiplier') {
      clickPower.value *= 2
      upgrade.price *= 5
    } else {
      upgrade.price *= 1.15
    }
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
        upg.revealed = savedUpg.revealed ?? false
      }
    })
  }
  spawnGoldenCookie()
})

watch(cookies, (newCookies) => {
  upgrades.value.forEach(upg => {
    if (!upg.revealed && newCookies >= upg.price * 0.9) {
      upg.revealed = true
    }
  })
})

watch([cookies, upgrades], () => {
  const saveData = {
    cookies: cookies.value,
    upgrades: upgrades.value.map(u => ({
      name: u.name,
      count: u.count,
      price: u.price,
      revealed: u.revealed
    }))
  }
  localStorage.setItem('cookieSave', JSON.stringify(saveData))
})
</script>

<template>
  <div>
    <h1>Cookies: {{ formatNumber(cookies) }}</h1>
    <div v-for="upgrade in upgrades" :key="upgrade.name">
      <Upgrade
        :name="upgrade.name"
        :count="upgrade.count"
        :cps="upgrade.cps"
        :price="upgrade.price"
        :revealed="upgrade.revealed"
        @buy="buyUpgrade(upgrade)"
      ></Upgrade>
    </div>
    <div class="btn">
      <button @click="cookies += clickPower">Bake Cookie</button>
      <reset/>
    </div>
    <GoldenCookie
      v-if="showGolden"
      @clicked="collectGoldenCookie"
    />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.btn {
  margin-top: 20px;
}
</style>