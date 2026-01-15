<template>
  <div>
    <input type="file" @change="changeHandle"/>
    <vue-office-docx :src="src"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

let src = ref<string | ArrayBuffer | null>(null)

const changeHandle = (event:Event) => {
  let file = (event.target as HTMLInputElement).files![0]
  let fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)
  fileReader.onload = () => {
    src.value = fileReader.result
  }
}
</script>

<style scoped></style>
