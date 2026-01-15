<script setup lang="ts">
// const only_office_url = "https://yingside.onlyoffice.com/s/64rLjQ2g-BD63Pt";

const url =
  "http://image.yanhongzhi.com/record/vite%E5%8F%8C%E5%BC%95%E6%93%8E.pptx";
</script>

<template>
  <!-- <iframe
    src="http://image.yanhongzhi.com/record/tomorrow.pdf"
    width="100%"
    height="400"
  >
  </iframe> -->


  <!-- Refused to display 'https://www.ted.com/' in a frame 
   because it set 'X-Frame-Options' to 'sameorigin'. -->
  <!-- <iframe
    src="https://www.ted.com/"
    title="iframe Example 1"
    width="400"
    height="300"
  >
  </iframe> -->

  <!-- <iframe
    style="width: 100%; min-height: 700px"
    :src="only_office_url"
    width="100%"
    height="100%"
    frameborder="1"
  /> -->

  <iframe
    style="width: 100%; min-height: 700px"
    :src="`https://view.officeapps.live.com/op/view.aspx?src=${url}`"
    width="100%"
    height="100%"
    frameborder="1"
  /> 
</template>
