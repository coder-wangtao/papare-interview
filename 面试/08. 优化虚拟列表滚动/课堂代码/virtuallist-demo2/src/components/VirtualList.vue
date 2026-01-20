<template>
  <div ref="list" :style="{ height }" class="infinite-list-container" @scroll="scrollEvent">
    <!-- 占位 -->
    <div ref="phantom" class="infinite-list-phantom"></div>
    <div ref="content" class="infinite-list">
      <div
        class="infinite-list-item"
        ref="items"
        :id="item._index"
        :key="item._index"
        v-for="item in visibleData"
      >
        <slot ref="slot" :item="item.item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, computed } from 'vue'

const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  },
  // 每一项的“预估高度”
  estimatedItemSize: {
    type: Number,
    required: true
  },
  height: {
    type: String,
    default: '100%'
  }
})

const list = ref(null)
const phantom = ref(null)
const content = ref(null)
const items = ref([])

const screenHeight = ref(0)
const start = ref(0)
const end = ref(0)
let positions = []

const _listData = computed(() => {
  return props.listData.map((item, index) => ({
    _index: `_${index}`,
    item
  }))
})

// 最多能显示多少条
const visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / props.estimatedItemSize)
})

// 真正渲染的数据
const visibleData = computed(() => {
  return _listData.value.slice(start.value, end.value)
})

//一开始以预估高度做初始化
// 虚拟列表的灵魂
// {
//   index,      // 原始索引
//   height,     // 当前真实高度
//   top,        // 距顶部距离
//   bottom      // top + height
// }
const initPositions = () => {
  positions = props.listData.map((d, index) => ({
    index,
    height: props.estimatedItemSize,
    top: index * props.estimatedItemSize,
    bottom: (index + 1) * props.estimatedItemSize
  }))
}

// 根据 scrollTop 找起始 index（二分查找）
const getStartIndex = (scrollTop = 0) => {
  return binarySearch(positions, scrollTop)
}

const binarySearch = (list, value) => {
  let start = 0
  let end = list.length - 1
  let tempIndex = null
  while (start <= end) {
    let midIndex = parseInt((start + end) / 2)
    let midValue = list[midIndex].bottom
    if (midValue === value) {
      return midIndex + 1
    } else if (midValue < value) {
      start = midIndex + 1
    } else if (midValue > value) {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex
      }
      end = end - 1
    }
  }
  return tempIndex
}

const updateItemsSize = () => {
  items.value.forEach((node) => {
    let rect = node.getBoundingClientRect()
    let height = rect.height // 获取真实高度
    let index = +node.id.slice(1)
    let oldHeight = positions[index].height
    let dValue = oldHeight - height
    if (dValue) {
      positions[index].bottom -= dValue
      positions[index].height = height

      for (let k = index + 1; k < positions.length; k++) {
        positions[k].top = positions[k - 1].bottom
        positions[k].bottom -= dValue
      }
    }
  })
}

const setStartOffset = () => {
  let startOffset = start.value >= 1 ? positions[start.value - 1].bottom : 0
  content.value.style.transform = `translate3d(0,${startOffset}px,0)`
}

const scrollEvent = () => {
  let scrollTop = list.value.scrollTop
  start.value = getStartIndex(scrollTop)
  end.value = start.value + visibleCount.value
  setStartOffset()
}

onMounted(() => {
  screenHeight.value = list.value.clientHeight
  start.value = 0
  end.value = start.value + visibleCount.value
  initPositions()
})

onUpdated(() => {
  requestAnimationFrame(() => {
    if (!items.value || !items.value.length) {
      return
    }
    // 修正真实高度
    updateItemsSize()
    let height = positions[positions.length - 1].bottom
    phantom.value.style.height = height + 'px'
    setStartOffset()
  })
})
</script>

<style scoped>
.infinite-list-container {
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
}

.infinite-list-item {
  padding: 5px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
