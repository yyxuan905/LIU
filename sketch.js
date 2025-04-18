let input;
let slider;
let button;
let dropdown;
let iframe;
let textContent = "💌🌷🍰";
let textSizeValue = 32;
let isBouncing = false;
let yOffsets = [];
let bounceCounter = 0;

function setup() { //這是一個設定函數，只會執行一次
  // 建立一個畫布，充滿整個視窗，背景顏色為#8d99ae
  createCanvas(windowWidth, windowHeight);
  background('#8d99ae');

  // 創建一個輸入文字框
  input = createInput(textContent); //產生一個輸入框
  input.position(10, 10); //設定輸入框的位置
  input.size(300, 80);
  input.style('font-size', '24px');
  input.style('background-color', '#bcd4e6');
  input.input(updateText); // 當輸入框內容改變時，呼叫 updateText 函數

  // 創建一個滑桿
  slider = createSlider(12, 30, 32); // 最小值12，最大值30，初始值32
  slider.position(320, 10); //設定滑桿的位置
  slider.style('width', '300px');

  // 創建一個按鈕
  button = createButton('跳動');
  button.position(640, 10);
  button.mousePressed(toggleBounce);

  // 創建一個下拉式選單
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(100);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(openLink);

  // 創建一個 iframe
  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 120);
}

function updateText() {
  textContent = this.value();
}

function toggleBounce() {
  isBouncing = !isBouncing;
  if (isBouncing) {
    yOffsets = Array(Math.ceil(height / (textAscent() + textDescent()))).fill(0).map(() => random(-5, 5));
  }
}

function openLink() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://edcollege.tku.edu.tw/Front/Academic_Units/Department-of-Educational-Technology/Page.aspx?id=QtntyBGmS1k=');
  }
}

function draw() { //這是一個繪圖函數，會一直執行
  background('#8d99ae'); // 設定背景顏色為#8d99ae
  textSizeValue = slider.value(); // 根據滑桿的值設定文字大小
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  fill(255);
  stroke(0);
  strokeWeight(1);

  let textW = textWidth(textContent + " ");
  let textH = textAscent() + textDescent();
  let yStart = 100;

  for (let y = yStart, i = 0; y < height; y += textH, i++) {
    let yOffset = isBouncing ? yOffsets[i] : 0;
    for (let x = 0; x < width; x += textW) {
      text(textContent, x, y + yOffset);
    }
    if (isBouncing && bounceCounter % 10 === 0) { // 控制跳動頻率
      yOffsets[i] = random(-5, 5);
    }
  }
  bounceCounter++;
}