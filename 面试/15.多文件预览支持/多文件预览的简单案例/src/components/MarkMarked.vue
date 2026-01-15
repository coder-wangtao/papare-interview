<script lang="ts" setup>
import { ref } from "vue";
import md_content from "../assets/vite-12.md?raw";
import { onMounted } from "vue";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
//高亮代码样式
import "highlight.js/styles/github-dark.css";

const contentDetails = ref();

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "shell";
      return hljs.highlight(code, { language }).value;
    },
  })
);

onMounted(() => {
  contentDetails.value = marked.parse(md_content);
});
</script>

<template>
  <div>
    <div v-html="contentDetails"></div>
  </div>
</template>
