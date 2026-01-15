export function captureFrame(vdoFile,time = 0) {
  return new Promise((resolve) => {
    const vdo = document.createElement('video');
    // 设置参数指定时间
    vdo.currentTime = time;
    // 静音, 由于浏览器限制，只有静音才能自动播放
    vdo.muted = true;
    // 让video自动播放
    vdo.autoplay = true;
    // createObjectURL可以把二进制的文件数据转换为浏览器可以播放的临时URL
    vdo.src = URL.createObjectURL(vdoFile);
    // 监听视频是否准备好，可以播放，因为视频是异步加载的
    vdo.oncanplay = () => {
      // 创建canvas，用于绘制视频帧
      const cvs = document.createElement('canvas');
      cvs.width = vdo.videoWidth;
      cvs.height = vdo.videoHeight;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(vdo, 0, 0, cvs.width, cvs.height);

      // 返回blob对象和url
      cvs.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve({
          blob,
          url,
        });
      });
    };
  });
}
