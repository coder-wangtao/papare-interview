btn.onclick = function () {
  // 检查浏览器是否支持Web Speech API
  if ("speechSynthesis" in window) {
    // 1. 创建一个SpeechSynthesisUtterance实例
    // const u = new SpeechSynthesisUtterance("funny mud pee");
    const u = new SpeechSynthesisUtterance("你好，今天能够为你做什么");
    // 2. 设置语音属性
    // u.lang = 'en-US';
    u.lang = 'zh-CN';
    u.rate = 1; // 语速
    u.pitch = 1; // 音调
    u.volume = 1; // 音量

    // 3. 启动语音合成
    window.speechSynthesis.speak(u);
  } else {
    console.log("Sorry, your browser doesn't support text to speech.");
  }
};
