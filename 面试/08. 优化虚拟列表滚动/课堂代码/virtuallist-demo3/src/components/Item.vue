<template>
  <p>
    <span style="color: red">{{ item.id }}</span
    >{{ item.value }}
  </p>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped></style>
