const board = document.querySelector(".canvas");
const color = document.getElementsByClassName("color");
const random = document.getElementById("randomcolor");
const range = document.getElementById("jsRange");
const Fill = document.querySelector(".a-paint");
const Save = document.querySelector(".a-save");
const Clear = document.querySelector(".a-clear");

const ctx = board.getContext("2d");

const INITAL_COLOR = "#f2f2f2";
board.style.cursor = "url(images/paint.png),pointer";

ctx.lineWidth = 1.5;
ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;

board.width = 700;
board.height = 500;

let push = false;
let fill = false;

function startDrawing() {
  push = true;
}
function stopDrawing() {
  push = false;
}

function moveMouse(event) {
  const X = event.offsetX;
  const Y = event.offsetY;
  if (!push) {
    ctx.beginPath();
    ctx.moveTo(X, Y);
  } else {
    ctx.lineTo(X, Y);
    ctx.stroke();
  }
}

function handleColorChange(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}

function handleRange(event) {
  ctx.lineWidth = event.target.value;
}

function handleFillClick(event) {
  if (fill === true) {
    Fill.innerText = "FILL";
    fill = false;
    board.style.cursor = "url(images/paint.png),pointer";
  } else {
    Fill.innerText = "Paint";
    fill = true;
    board.style.cursor = "url(images/fill.png),pointer";
  }
}

function fillAllCanvas() {
  if (fill) {
    ctx.fillRect(0, 0, board.width, board.height);
  }
}

function handleContext() {
  const image = board.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Painting🎨";
  link.click();
}
function handleCM(event) {
  event.preventDefault();
}

function handleClear() {
  ctx.fillStyle = INITAL_COLOR;
  ctx.fillRect(0, 0, board.width, board.height);
}

function handleRandom(event) {
  const first = Math.floor(Math.random() * 256);
  const second = Math.floor(Math.random() * 256);
  const third = Math.floor(Math.random() * 256);
  event.target.backgroundColor = `rgb(${first},${second},${third})`;
  ctx.strokeStyle = event.target.backgroundColor;
  ctx.fillStyle = event.target.backgroundColor;
}

if (board) {
  board.addEventListener("mousedown", startDrawing); // 마우스를 누를때
  board.addEventListener("mouseup", stopDrawing); // 마우스를 눌렀다 놓을경우
  board.addEventListener("mousemove", moveMouse); // 마우스를 움직일 경우
  board.addEventListener("mouseleave", stopDrawing); //마우스가 떠날 경우
  board.addEventListener("click", fillAllCanvas);
  board.addEventListener("contextmenu", handleCM);
}

Array.from(color).forEach((color) =>
  color.addEventListener("click", handleColorChange)
);

if (range) {
  range.addEventListener("input", handleRange);
}

if (Fill) {
  Fill.addEventListener("click", handleFillClick);
}

if (Save) {
  Save.addEventListener("click", handleContext);
}

if (Clear) {
  Clear.addEventListener("click", handleClear);
}

if (random) {
  random.addEventListener("click", handleRandom);
}
