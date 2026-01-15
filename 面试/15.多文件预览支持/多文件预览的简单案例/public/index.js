import { captureFrame } from './captureFrame.js';

const inp = document.querySelector('input[type=file]');

inp.onchange = (e) => {
  const file = e.target.files[0];
  for (let i = 0; i < 10; i++) {
    captureFrame(file, i * 1).then((result) => {
      previewImage(result.url);
    });
  }
};

function previewImage(url) {
  const img = document.createElement('img');
  img.src = url;
  document.body.appendChild(img);
}


// 直接预览视频
// inp.onchange = (e) => {
//   const file = e.target.files[0];
//   previewVideo(file)
// };

// function previewVideo(vdoFile){
//   const vdo = document.createElement('video');
//   // 静音, 由于浏览器限制，只有静音才能自动播放
//   vdo.muted = true;
//   // 让video自动播放
//   vdo.autoplay = true;
//   // createObjectURL可以把二进制的文件数据转换为浏览器可以播放的临时URL
//   vdo.src = URL.createObjectURL(vdoFile);
//   document.body.appendChild(vdo);
// }
