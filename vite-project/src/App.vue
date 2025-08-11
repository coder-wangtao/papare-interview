<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import FormPage from "./views/FormPage.vue";
const h1 = useTemplateRef("title");
onMounted(() => {
  console.log(h1.value?.title);
});
</script>

<template>
  <!-- <div ref="title">Test</div> -->
  <FormPage />
</template>

<style scoped lang="scss">
.tip {
  margin: 1px 0;
  font-size: 10px;
}
.tip-warning {
  @extend .tip;
  color: orange;
}
.tip-error {
  @extend .tip;
  color: red;
}

.tip-success {
  @extend .tip;
  color: green;
}
</style>
