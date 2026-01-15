<template>
  <VirtualList :listData="data" :estimatedItemSize="100" v-slot="slotProps">
    <Item :item="slotProps.item" />
  </VirtualList>
</template>

<script setup>
import { ref } from 'vue'
import VirtualList from './components/VirtualList.vue'
import Item from './components/Item.vue'
import { faker } from '@faker-js/faker'

// 生成数据
const data = ref([])
for (let id = 0; id < 1000; id++) {
  data.value.push({
    id,
    value: faker.lorem.sentences() // 长文本
  })
}
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
