<template>
  <div id="app">
    <VirtualList :listData="data" :itemSize="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VirtualList from './components/VirtualList.vue'

let d = []
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i })
}

const data = ref(d)
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
</style>
