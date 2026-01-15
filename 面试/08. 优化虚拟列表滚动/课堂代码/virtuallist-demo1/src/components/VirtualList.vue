<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  },
  itemSize: {
    type: Number,
    default: 200
  }
})

const list = ref(null)
const items = ref(null)

const screenHeight = ref(0)
const startOffset = ref(0)
const start = ref(0)
const end = ref(0)

const listHeight = computed(() => props.listData.length * props.itemSize)

const visibleCount = computed(() => Math.ceil(screenHeight.value / props.itemSize))

const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`)

const visibleData = computed(() => {
  return props.listData.slice(start.value, Math.min(end.value, props.listData.length))
})

const scrollEvent = () => {
  let scrollTop = list.value.scrollTop
  start.value = Math.floor(scrollTop / props.itemSize)
  end.value = start.value + visibleCount.value
  startOffset.value = scrollTop - (scrollTop % props.itemSize)
}

onMounted(() => {
  screenHeight.value = list.value.clientHeight
  start.value = 0
  end.value = start.value + visibleCount.value
})
</script>

<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
