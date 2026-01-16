const colorPicker = document.querySelector("input");
const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

function init() {
  const w = 500,
    h = 300;
  cvs.width = w * devicePixelRatio;
  cvs.height = h * devicePixelRatio;
  cvs.style.width = w + "px";
  cvs.style.height = h + "px";
}

init();

const shapes = [];

class Rectangle {
  constructor(color, startX, startY) {
    this.color = color; // 颜色
    this.startX = startX;
    this.startY = startY;
    this.endX = startX; // 拖动鼠标时会更新
    this.endY = startY; // 拖动鼠标时会更新
  }

  // 返回左边界
  get minX() {
    return Math.min(this.startX, this.endX); // 防止从右往左画导致坐标错误
  }

  // 返回上边界
  get minY() {
    return Math.min(this.startY, this.endY);
  }

  // 返回右边界
  get maxX() {
    return Math.max(this.startX, this.endX);
  }

  // 返回下边界
  get maxY() {
    return Math.max(this.startY, this.endY);
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio); // 移动画笔到左上角
    ctx.lineTo(this.maxX * devicePixelRatio, this.minY * devicePixelRatio); // 画到右上角
    ctx.lineTo(this.maxX * devicePixelRatio, this.maxY * devicePixelRatio); // 画到右下角
    ctx.lineTo(this.minX * devicePixelRatio, this.maxY * devicePixelRatio); // 画到左下角
    ctx.lineTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio); // 闭合回起点
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineCap = "square";
    ctx.lineWidth = 3 * devicePixelRatio;
    ctx.stroke();
  }
}

cvs.onmousedown = (e) => {
  const bouding = cvs.getBoundingClientRect(); // 获取画布cvs相对于浏览器窗口的位置和尺寸。
  const rect = new Rectangle(colorPicker.value, e.offsetX, e.offsetY);
  const shape = getShape(e.offsetX, e.offsetY);
  if (shape) {
    const { startX, startY, endX, endY } = shape;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    // 记录鼠标按下时的坐标（相对于画布左上角）。
    window.onmousemove = (e) => {
      //用来实现拖动矩形。
      const disX = e.clientX - bouding.left - mouseX;
      const disY = e.clientY - bouding.top - mouseY;
      shape.startX = startX + disX;
      shape.startY = startY + disY;
      shape.endX = endX + disX;
      shape.endY = endY + disY;
    };
  } else {
    shapes.push(rect);
    window.onmousemove = (e) => {
      rect.endX = e.clientX - bouding.left;
      rect.endY = e.clientY - bouding.top;
    };
  }

  window.onmouseup = () => {
    window.onmousemove = null;
    window.onmouseup = null;
  };
};

function getShape(x, y) {
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (
      x >= shapes[i].minX &&
      x <= shapes[i].maxX &&
      y >= shapes[i].minY &&
      y <= shapes[i].maxY
    ) {
      return shapes[i];
    }
  }
}

// 保证画布内容实时更新，无论是拖动矩形还是绘制新矩形，画面都会即时刷新。
function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, cvs.width, cvs.height); // 清空画布
  for (const shape of shapes) {
    shape.draw();
  }
}
draw();
