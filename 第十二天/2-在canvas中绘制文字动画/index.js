const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");

// DPR 越高，图片要“像素越大但显示越小”，才会清晰
// 图片真实像素 = CSS尺寸 × devicePixelRatio
function init() {
  cvs.width = window.innerWidth * devicePixelRatio;
  cvs.height = window.innerHeight * devicePixelRatio;
}

init();

const fontSize = 40 * devicePixelRatio;
const columnCount = Math.floor(cvs.width / fontSize);
const charIndex = new Array(columnCount).fill(0);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.fillStyle = "#6be445";
  ctx.textBaseline = "top";
  for (let i = 0; i < columnCount; i++) {
    const text = getRandomChar();
    const x = i * fontSize;
    const y = charIndex[i] * fontSize;
    ctx.fillText(text, x, y);
    if (y > cvs.height && Math.random() > 0.99) {
      charIndex[i] = 0;
    } else {
      charIndex[i]++;
    }
  }
}

function getRandomChar() {
  const str = 'console.log("hello world")';
  return str[Math.floor(Math.random() * str.length)];
}

draw();
setInterval(draw, 50);
