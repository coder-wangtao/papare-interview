<script setup lang="ts">
import { ElForm } from "element-plus";
import { ref } from "vue";
//获取ElForm组件实例的类型
const useComRef = <T extends new (...args: any[]) => void>() => {
  return ref<InstanceType<T>>();
};

const formRef = useComRef<typeof ElForm>();
formRef.value?.validate();
</script>

<template></template>

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
