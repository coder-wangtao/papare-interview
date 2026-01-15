<template>
  <div id="xmind-container">
    <Loading v-if="showLoading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Loading from "./Loading.vue"

const showLoading = ref(true)

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  const { XMindEmbedViewer } = await import('xmind-embed-viewer')
  const viewer = new XMindEmbedViewer({
    el: '#xmind-container', // HTMLElement | HTMLIFrameElement | string
    // 如果在中国大陆境内速度慢，可以添加的参数 `region: 'cn'` 改为使用 xmind.cn 的图库作为依赖。
    region: 'cn' //optional, global(default) or cn
  })
  viewer.setStyles({
    width: '100%',
    height: '100%'
  })
  const callback = () => {
    showLoading.value = false
    viewer.removeEventListener('map-ready', callback)
  }
  viewer.addEventListener('map-ready', callback)
  fetch(props.url)
    .then(res => res.arrayBuffer())
    .then(file => {
      viewer.load(file)
    })
    .catch(_err => {
      showLoading.value = false
      viewer.removeEventListener('map-ready', callback)
    })
})
</script>

<style>
#xmind-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>