let font;
let time = "000";
let diceSize = 140;
let running = false;
let initialTime;
let interval = 1000; //one second

function setup() {
  frameRate(100);
  font = "Calibri";
  createCanvas(windowWidth, windowHeight);
  background(194, 39, 45);
  noLoop();
}

function draw() {
  let side1 = int(random(1, 7));
  let side2 = int(random(1, 7));

  background(246, 255, 235);
  drawDice(width / 4, height / 2, side1);
  drawDice(width - width / 4, height / 2, side2);
  drawShpae(side1, side2);
}

function drawDice(x, y, side) {
  noStroke();
  fill(255, 41, 126);
  rectMode(CENTER);
  rect(x, y, diceSize, diceSize, diceSize / 5);
  fill(50);
  drawDots(x, y, side);
}

function drawDots(x, y, side) {
  if (side == 1 || side == 3 || side == 5 || side == 7 || side == 9)
    ellipse(x, y, diceSize / 5, diceSize / 5);
  if (side >= 2) {
    ellipse(x - diceSize / 4, y - diceSize / 4, diceSize / 5, diceSize / 5);
    ellipse(x + diceSize / 4, y + diceSize / 4, diceSize / 5, diceSize / 5);
  }
  if (side >= 4) {
    ellipse(x - diceSize / 4, y + diceSize / 4, diceSize / 5, diceSize / 5);
    ellipse(x + diceSize / 4, y - diceSize / 4, diceSize / 5, diceSize / 5);
  }
  if (side == 6 || side == 7 || side == 8 || side == 9) {
    ellipse(x, y - diceSize / 4, diceSize / 5, diceSize / 5);
    ellipse(x, y + diceSize / 4, diceSize / 5, diceSize / 5);
  }
  if (side == 8 || side == 9) {
    ellipse(x - diceSize / 4, y, diceSize / 5, diceSize / 5);
    ellipse(x + diceSize / 4, y, diceSize / 5, diceSize / 5);
  }
}

function mousePressed() {
  redraw();
}

function drawShpae(side1, side2) {
  if (side1 + side2 > 6) {
    fill(255, 0, 0);
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    triangle(x - 50, y + 30, x, y - 30, x + 50, y + 30);
  }
  if (side1 + side2 == 6) {
    fill(247, 30, 219);
    triangle(100, 300, 200, 200, 300, 300);
  }
  if (side1 + side2 < 6) {
    fill(0, 255, 0);
    rect(150, 250, 100, 100);
  }
  if (side1 == 1 && side2 == 1) {
    fill(255, 255, 0);
    triangle(100, 300, 200, 200, 300, 300);
  }
  if (side1 == 1 || side2 == 1) {
    fill(255, 165, 0);
    ellipse(200, 300, 100, 100);
  }
}

// The mouseWheel function is not typically used in p5.js for input related to the functionality you described,
// so it can be omitted unless you have a specific use case for it.
