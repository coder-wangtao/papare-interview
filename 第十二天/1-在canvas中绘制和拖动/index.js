const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// DPR 越高，图片要“像素越大但显示越小”，才会清晰
// 图片真实像素 = CSS尺寸 × devicePixelRatio
function init() {
  cvs.width = window.innerWidth * devicePixelRatio;
  cvs.height = window.innerHeight * devicePixelRatio;
}

class Point {
  constructor() {
    this.r = 6;
    this.x = getRandom(0, cvs.width - this.r); // 随机初始位置x
    this.y = getRandom(0, cvs.height - this.r); // 随机初始位置y
    this.xSpeed = getRandom(-50, 50); //x方向速度
    this.ySpeed = getRandom(-50, 50); //y方向速度
    this.lastDrawTime = null; //上一帧时间
  }
  draw() {
    if (this.lastDrawTime) {
      const duration = (Date.now() - this.lastDrawTime) / 1000;
      const xDis = this.xSpeed * duration;
      const yDis = this.ySpeed * duration;
      let x = this.x + xDis;
      let y = this.y + yDis;
      if (x > cvs.width - this.r / 2) {
        x = cvs.width - this.r / 2;
        this.xSpeed = -this.xSpeed;
      } else if (x < 0) {
        x = 0;
        this.xSpeed = -this.xSpeed;
      }
      if (y > cvs.height - this.r / 2) {
        y = cvs.height - this.r / 2;
        this.ySpeed = -this.ySpeed;
      } else if (y < 0) {
        y = 0;
        this.ySpeed = -this.ySpeed;
      }
      this.x = x;
      this.y = y;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    this.lastDrawTime = Date.now();
  }
}

class Graph {
  constructor(pointNumber = 30, maxDis = 200) {
    this.points = new Array(pointNumber).fill(0).map(() => new Point());
    this.maxDis = maxDis;
  }
  draw() {
    requestAnimationFrame(() => {
      this.draw();
    });
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      p1.draw();
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2); // 计算点与点之间距离并画线
        if (d > this.maxDis) {
          continue;
        }
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        ctx.strokeStyle = `rgba(200,200,200,${1 - d / this.maxDis})`;
        ctx.stroke();
      }
    }
  }
}

init();
const g = new Graph();
g.draw();

window.addEventListener("resize", () => {
  init();
  const g = new Graph(); // 重新生成点
  g.draw();
});
