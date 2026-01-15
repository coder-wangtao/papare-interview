<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import MarkMarked from "./components/MarkMarked.vue";
import XmindViewer from "./components/XmindViewer.vue";
import OfficeComp from "./components/OfficeComp.vue";
</script>

<template>
  <OfficeComp />
  <XmindViewer url="http://image.yanhongzhi.com/record/test-1.xmind" />
  <!-- 分割线 -->
  <HelloWorld />
  <!-- 分割线 -->
  <MarkMarked />
</template>
