<template>
  <div class="container">
    <h1>问题页3</h1>
    <form id="page3Form">
      <div>
        <label for="question5">您的出生日期：</label>
        <input type="date" v-model="formData.birthdate" name="question5" />
      </div>
      <div>
        <label for="question6">您的邮箱：</label>
        <input
          v-model="formData.email"
          type="email"
          name="question6"
          placeholder="请填写您的邮箱"
        />
      </div>
      <div class="button-group">
        <button type="button" @click="prevPage">上一页</button>
        <button @click.prevent="submitForm">提交</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormStorage from '../utils/FormStorage'

const formData = ref({
  birthdate: '',
  email: ''
})
const formStorage = new FormStorage('page3Form', formData)

onMounted(() => {
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
const prevPage = () => {
  formStorage.saveData()
  router.push('/page2')
}

const resetFormData = () => {
  formData.value.birthdate = ''
  formData.value.email = ''
  // 如果有其他表单页面的数据，需要同时重置
  // 可以考虑从 localStorage 中加载每个表单页面的数据并重置
}

const submitForm = () => {
  FormStorage.clearAll()
  resetFormData()
  // 添加表单提交逻辑
  alert('Form submitted!')
}
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
}
</style>
