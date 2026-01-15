<template>
  <div class="container">
    <h1>问题页2</h1>
    <form id="page2Form">
      <div>
        <label for="question3">您的爱好：</label>
        <div>
          <label><input type="checkbox" v-model="formData.hobbies" value="reading" /> 阅读</label>
          <label><input type="checkbox" v-model="formData.hobbies" value="sports" /> 运动</label>
          <label><input type="checkbox" v-model="formData.hobbies" value="music" /> 音乐</label>
        </div>
      </div>
      <div>
        <label for="question4">您最喜欢的颜色：</label>
        <input
          v-model="formData.favoriteColor"
          type="text"
          name="question4"
          placeholder="请填写您最喜欢的颜色"
        />
      </div>
      <div>
        <label for="question5">您的职业：</label>
        <input
          v-model="formData.profession"
          type="text"
          name="question5"
          placeholder="请填写您的职业"
        />
      </div>
      <div>
        <label for="question6">您是否喜欢旅行：</label>
        <div>
          <label><input type="radio" v-model="formData.likesTravel" value="yes" /> 是</label>
          <label><input type="radio" v-model="formData.likesTravel" value="no" /> 否</label>
        </div>
      </div>
      <div>
        <label for="question7">请简要介绍一下自己：</label>
      </div>
      <textarea
        v-model="formData.introduction"
        name="question7"
        placeholder="请简要介绍一下自己"
        rows="4"
      ></textarea>
      <div class="button-group">
        <button type="button" @click="prevPage">上一页</button>
        <button type="submit" @click.prevent="nextPage">下一页</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormStorage from '../utils/FormStorage'

const formData = ref({
  hobbies: [],
  favoriteColor: '',
  profession: '',
  likesTravel: '',
  introduction: ''
})
const formStorage = new FormStorage('page2Form', formData)

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
  router.push('/page1')
}

const nextPage = () => {
  formStorage.saveData()
  router.push('/page3')
}
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
}
</style>
