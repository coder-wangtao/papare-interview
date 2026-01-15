<template>
  <div class="container">
    <h1>问题页1</h1>
    <form id="page1Form">
      <div>
        <label for="question1">您的姓名：</label>
        <input
          v-model="formData.username"
          type="text"
          name="question1"
          placeholder="请填写您的姓名"
        />
      </div>
      <div>
        <label for="question2">您的性别：</label>
        <select name="question2" v-model="formData.gender">
          <option value="male">男</option>
          <option value="female">女</option>
          <option value="secret">保密</option>
        </select>
      </div>
      <button class="single" @click.prevent="nextPage">下一页</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormStorage from '../utils/FormStorage'

const formData = ref({
  username: '',
  gender: 'secret'
})
const formStorage = new FormStorage('page1Form', formData)

onMounted(() => {
  console.log('mounted1')
  formStorage.init()
})

watch(
  formData,
  () => {
    formStorage.debouncedSaveData() // 使用防抖保存数据
  },
  { deep: true }
)

const router = useRouter()
const nextPage = () => {
  // 切换路由之前先保存一下数据
  formStorage.saveData()
  router.push('/page2')
}
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
}
</style>
