<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
const h1 = useTemplateRef("title");
onMounted(() => {
  console.log(h1.value?.title);
});
</script>

<template>
  <div ref="title">Test</div>
</template>
