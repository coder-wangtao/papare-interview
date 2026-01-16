// 初始化画布与图片
const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d", {
  willReadFrequently: true, // 告诉浏览器，我们后续会频繁读取画布像素
});
function init() {
  const img = new Image();
  img.onload = () => {
    cvs.width = img.width;
    cvs.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };
  img.src = "./redhat.jpeg";
}

init();

cvs.addEventListener("click", (e) => {
  // 1. 获取点击位置的颜色
  const x = e.offsetX, // 获取鼠标点击的坐标，相对于画布左上角
    y = e.offsetY;
  const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height); // 获取整个画布的像素数据。
  const clickColor = getColor(x, y, imgData.data);
  // 2. 改变颜色
  const targetColor = [0, 0, 0, 255];
  changeColor(x, y, targetColor, imgData.data, clickColor);
  ctx.putImageData(imgData, 0, 0);
});

function changeColor(x, y, targetColor, imgData, clickColor) {
  if (x < 0 || x >= cvs.width || y < 0 || y >= cvs.height) {
    // 检查边界，如果超出画布就返回。
    return;
  }
  const curColor = getColor(x, y, imgData); // 获取当前像素颜色。
  if (diff(clickColor, curColor) > 100) {
    // 如果当前颜色和点击颜色差距太大（阈值 100），就不填充，避免填充到不相近的颜色区域。
    return;
  }
  if (diff(curColor, targetColor) === 0) {
    // 如果当前颜色已经是目标颜色，就不再继续递归，避免无限循环。
    return;
  }
  const index = point2Index(x, y);
  imgData.set(targetColor, index);
  changeColor(x + 1, y, targetColor, imgData, clickColor);
  changeColor(x - 1, y, targetColor, imgData, clickColor);
  changeColor(x, y + 1, targetColor, imgData, clickColor);
  changeColor(x, y - 1, targetColor, imgData, clickColor);
}

function diff(color1, color2) {
  return (
    Math.abs(color1[0] - color2[0]) +
    Math.abs(color1[1] - color2[1]) +
    Math.abs(color1[2] - color2[2]) +
    Math.abs(color1[3] - color2[3])
  );
}

function point2Index(x, y) {
  return (y * cvs.width + x) * 4;
}

// 根据索引取出当前像素的 [R,G,B,A] 值。
function getColor(x, y, imgData) {
  const index = point2Index(x, y);
  return [
    imgData[index],
    imgData[index + 1],
    imgData[index + 2],
    imgData[index + 3],
  ];
}
