<script setup>
import {inject} from 'vue'

const cookies = inject('cookies')
const upgrades = inject('upgrades')

function resetgame() {
  cookies.value = 0
  upgrades.value.forEach(upg => {
    upg.count = 0
    upg.price = getBasePrice(upg.name)
    upg.revealed = upg.name === 'Click Multiplier' ? true : false;
  })
  localStorage.removeItem('cookieSave')
}

function getBasePrice(name) {
  const base = [
    {name: 'Autoclicker', price: 15},
    {name: 'Grandma', price: 100},
    {name: 'Farm', price: 1200},
    {name: 'Mine', price: 12000},
    {name: 'Factory', price: 130000},
    {name: 'Bank', price: 1.4e6},
    {name: 'Temple', price: 2.0e7},
    {name: 'Wizard Tower', price: 3.3e8},
    {name: 'Shipment', price: 5.1e9},
    {name: 'Alchemy Lab', price: 7.5e10},
    {name: 'Portal', price: 1.0e12},
    {name: 'Click Multiplier', price: 100}
  ];
  return base.find(u => u.name === name)?.price ?? 0
}
</script>

<template>
  <button @click='resetgame'>Reset</button>
</template>

<style scoped>

</style>