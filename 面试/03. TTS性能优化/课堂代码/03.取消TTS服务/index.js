const segments = document.querySelectorAll(".segment");
let currentController = null; // 当前的 AbortController

segments.forEach((segment) => {
  segment.addEventListener("mouseenter", () => {
    const text = segment.dataset.segment;

    // 如果有未完成的请求，取消它
    if (currentController) {
      currentController.abort();
    }

    // 创建一个新的 AbortController
    currentController = new AbortController();
    const signal = currentController.signal;

    // 发起新的请求
    fetchTTS(text, signal)
      .then((result) => {
        console.log(`TTS result for ${text}:`, result);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log(`TTS request for ${text} was aborted`);
        } else {
          console.error(`TTS request for ${text} failed`, error);
        }
      });
  });
});

async function fetchTTS(segment, signal) {
  // 模拟一个 TTS 请求
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      resolve(`TTS result for: ${segment}`);
    }, Math.random() * 2000); // 随机延迟模拟请求时间

    // 监听取消信号
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new Error("Request was aborted"));
    });
  });
}
