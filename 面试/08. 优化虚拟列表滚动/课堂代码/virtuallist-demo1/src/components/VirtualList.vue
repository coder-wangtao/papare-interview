<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <!-- 滚动条，总列表的高度 -->
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>

    <!-- 列表渲染区域 -->
    <!-- 通过 transform: translate3d 移动这个容器的位置，从而模拟滚动效果。 -->
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
import { ref, computed, onMounted, watch } from 'vue'

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
const start = ref(0) //数据的起始索引
const end = ref(0) //数据的结束索引

//列表的总高度(listData.length*itemSize)
const listHeight = computed(() => props.listData.length * props.itemSize)

// 可显示列表项数
const visibleCount = computed(() => Math.ceil(screenHeight.value / props.itemSize))

//根据滚动位置计算 infinite-list 容器的平移量，实现“滚动效果”。
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`)

// 获取当前可见数据的数组，只渲染 start ~ end 范围内的元素。
const visibleData = computed(() => {
  return props.listData.slice(start.value, Math.min(end.value, props.listData.length))
})

const scrollEvent = () => {
  // console.log('-----------------------')
  let scrollTop = list.value.scrollTop // scrollTop：滚动条滚动距离。
  start.value = Math.floor(scrollTop / props.itemSize) // 计算起始 item 索引。
  end.value = start.value + visibleCount.value // 计算结束 item 索引。

  // 计算滚动条偏移了多少个像素在当前 item 内。
  // 例子：
  // itemSize = 100
  // scrollTop = 250
  //
  console.log(scrollTop, scrollTop % props.itemSize)
  startOffset.value = scrollTop - (scrollTop % props.itemSize) // 平移容器，保证可见 item 对齐滚动条。
}

watch(startOffset, (newValue) => {
  console.log('新的值:', newValue)
})

// 组件挂载时获取可视区高度，并初始化 start 和 end。
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
