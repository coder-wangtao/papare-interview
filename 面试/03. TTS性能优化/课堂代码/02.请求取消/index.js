let controller;
document.getElementById("startButton").addEventListener("click", () => {
  // 创建一个新的 AbortController 实例
  controller = new AbortController();
  const signal = controller.signal;

  // 发起 fetch 请求，并传递信号对象
  fetch("https://jsonplaceholder.typicode.com/posts", { signal })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("output").textContent = JSON.stringify(
        data,
        null,
        2
      );
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        document.getElementById("output").textContent = "Fetch aborted";
      } else {
        document.getElementById("output").textContent = "Fetch error: " + error;
      }
    });
});

document.getElementById("abortButton").addEventListener("click", () => {
  if (controller) {
    // 中止请求
    controller.abort();
  }
});
