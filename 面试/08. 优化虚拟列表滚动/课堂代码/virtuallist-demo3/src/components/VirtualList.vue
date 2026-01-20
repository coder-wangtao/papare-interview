<template>
  <div ref="list" :style="{ height }" class="infinite-list-container" @scroll="scrollEvent">
    <!-- 用来撑起滚动条高度 -->
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
import { ref, computed, onMounted, onUpdated, watch, nextTick } from 'vue'

const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  },
  // 预估每条高度，用于初始化和计算可视条数
  estimatedItemSize: {
    type: Number,
    required: true
  },
  //预渲染上下 buffer 的倍数，让滚动更平滑
  bufferScale: {
    type: Number,
    default: 1
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

const positions = ref([])

// 用 _index 作为唯一 key。
const _listData = computed(() => {
  return props.listData.map((item, index) => ({
    _index: `_${index}`,
    item
  }))
})

// 根据预估高度计算最多可显示多少条。
const visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / props.estimatedItemSize)
})
// 起始 可视区能显示的条目数（预估计算）。
const aboveCount = computed(() => {
  return Math.min(start.value, props.bufferScale * visibleCount.value)
})
// 结束 index 下方额外渲染条数。
const belowCount = computed(() => {
  return Math.min(props.listData.length - end.value, props.bufferScale * visibleCount.value)
})

const visibleData = computed(() => {
  let startIdx = start.value - aboveCount.value
  let endIdx = end.value + belowCount.value
  return _listData.value.slice(startIdx, endIdx)
})
// 初始化每条 item 的位置和高度（预估）。
const initPositions = () => {
  positions.value = props.listData.map((d, index) => ({
    index,
    height: props.estimatedItemSize,
    top: index * props.estimatedItemSize,
    bottom: (index + 1) * props.estimatedItemSize
  }))
}

// 根据 scrollTop 找 startIndex（二分查找）
const getStartIndex = (scrollTop = 0) => {
  return binarySearch(positions.value, scrollTop)
}

// positions 中找到第一个 bottom >= scrollTop 的 item。
const binarySearch = (list, value) => {
  let start = 0
  let end = list.length - 1
  let tempIndex = null

  while (start <= end) {
    let midIndex = Math.floor((start + end) / 2)
    let midValue = list[midIndex].bottom
    if (midValue === value) {
      return midIndex + 1
    } else if (midValue < value) {
      start = midIndex + 1
    } else if (midValue > value) {
      if (tempIndex === null || tempIndex > midIndex) {
        tempIndex = midIndex
      }
      end = midIndex - 1
    }
  }
  return tempIndex
}

// 每条 item 实际高度变化时更新 positions。
const updateItemsSize = () => {
  let nodes = items.value
  nodes.forEach((node) => {
    // 这里的操作只针对渲染在 DOM 上的条目，而不是整个列表，保证性能。
    let rect = node.getBoundingClientRect()
    let height = rect.height
    let index = +node.id.slice(1)
    let oldHeight = positions.value[index].height
    let dValue = oldHeight - height
    if (dValue) {
      // 之前记录比实际高，需要向下调整后面 item
      positions.value[index].bottom = positions.value[index].bottom - dValue // 修正底部位置。
      // 之前记录比实际低，需要向下扩展

      positions.value[index].height = height
      // 更新当前条目之后的所有条目。
      for (let k = index + 1; k < positions.value.length; k++) {
        // 下一个条目的 top = 前一个条目的 bottom。
        positions.value[k].top = positions.value[k - 1].bottom
        // 更新后续条目的 bottom
        positions.value[k].bottom = positions.value[k].bottom - dValue
      }
    }
  })
}

// 设置 transform 偏移
// “当前渲染的第一条 DOM（含上方 buffer）”对齐到它在完整列表中的真实位置。
const setStartOffset = () => {
  let startOffset
  if (start.value >= 1) {
    // size = 「你多渲染出来的上方 buffer 一共占了多少像素」
    let size =
      positions.value[start.value].top -
      (positions.value[start.value - aboveCount.value]
        ? positions.value[start.value - aboveCount.value].top
        : 0)
    startOffset = positions.value[start.value - 1].bottom - size
  } else {
    startOffset = 0
  }
  content.value.style.transform = `translate3d(0,${startOffset}px,0)`
}

// 滚动事件处理
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
  nextTick(() => {
    if (!items.value || !items.value.length) {
      return
    }
    // 更新真实 item 高度
    updateItemsSize()
    let height = positions.value[positions.value.length - 1].bottom
    // 更新 phantom 高度
    phantom.value.style.height = height + 'px'
    // 偏移 content
    setStartOffset()
  })
})

watch(() => props.listData, initPositions)
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
  /* height:200px; */
}
</style>
