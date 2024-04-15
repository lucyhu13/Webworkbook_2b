const offsetLerpSpeed = 0.3;
const margin = 20;

let lastFrameTime;
let pixelImg;
let imgPixels, imgLookup;
let colorIndex = 0;
let pixelSize = 10;
let mouseForce = 0;

let redLayer, greenLayer, blueLayer;

function preload() {
  pixelImg = loadImage("butterfly2.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  redLayer = createGraphics(width, height);
  greenLayer = createGraphics(width, height);
  blueLayer = createGraphics(width, height);

  redLayer.translate(width / 2, height / 2);
  greenLayer.translate(width / 2, height / 2);
  blueLayer.translate(width / 2, height / 2);

  redLayer.noStroke();
  greenLayer.noStroke();
  blueLayer.noStroke();

  pixelSize = floor(
    min(width / (pixelImg.width + margin), height / (pixelImg.height + margin))
  );

  pixelImg.loadPixels();
  imgLookup = new Map();
  imgPixels = [];

  for (let i = 0; i < pixelImg.pixels.length; i += 4) {
    const pixelAlpha = pixelImg.pixels[i + 3];
    if (pixelAlpha === 0) continue;

    const index = floor(i / 4);
    const x = index % pixelImg.width;
    const y = floor(index / pixelImg.width);
    const pos = createVector(
      x -
        pixelImg.width / 2 -
        pixelImg.width -
        (x / pixelImg.width) * pixelImg.width,
      y - pixelImg.height / 2
    );
    const imgPixel = {
      index,
      pos, // position
      offPosG: pos.copy(),
      offPosB: pos.copy(),
      vel: createVector(), // velocity
      origin: createVector(x - pixelImg.width / 2, y - pixelImg.height / 2), // origin
      rotation: 0,
      r: pixelImg.pixels[i],
      g: pixelImg.pixels[i + 1],
      b: pixelImg.pixels[i + 2],
    };
    imgPixels.push(imgPixel);
    imgLookup.set(index, imgPixel);
  }

  lastFrameTime = Date.now();
}

function draw() {
  const timeNow = Date.now();
  const dt = min(1, (timeNow - lastFrameTime) / 500);
  lastFrameTime = timeNow;
  const fc = timeNow / 60;
  const scaler = ((sin(fc / 20) + 1) / 2) * 0.1 + 0.95;
  const nMouseX = (mouseX - width / 2) / pixelSize;
  const nMouseY = (mouseY - height / 2) / pixelSize;

  translate(width / 2, height / 2);
  blendMode(BLEND);
  background(0);
  rectMode(CENTER);
  noStroke();

  redLayer.background(0);
  greenLayer.background(0);
  blueLayer.background(0);

  const nMouseVel = createVector(
    (mouseX - pmouseX) / pixelSize,
    (mouseY - pmouseY) / pixelSize
  );
  const mouseVelMag = nMouseVel.mag();
  if (mouseVelMag > 0.1) {
    mouseForce = flerp(mouseForce, 1, 0.2);
  } else {
    mouseForce = flerp(mouseForce, 0, 0.02);
  }

  blendMode(SCREEN);
  imgPixels.forEach((imgPixel) => {
    const { index, pos, offPosG, offPosB, vel, origin, neighbours, r, g, b } =
      imgPixel;

    offPosB.x = flerp(offPosB.x, offPosG.x, offsetLerpSpeed);
    offPosB.y = flerp(offPosB.y, offPosG.y, offsetLerpSpeed);
    offPosG.x = flerp(offPosG.x, pos.x, offsetLerpSpeed);
    offPosG.y = flerp(offPosG.y, pos.y, offsetLerpSpeed);

    vel.mult(0.925);

    const x =
      pos.x *
      scaler *
      (1 + noise(fc / 1000, pos.x * 0.05 + fc / 100, pos.y * 0.025) ** 6 * 1.5);
    const y =
      pos.y *
      scaler *
      (1 +
        noise(
          fc / 1000 + 55,
          pos.x * 0.01 + 33.33,
          pos.y * 0.05 + 77.77 + fc / 100
        ) **
          6 *
          1.5);

    imgPixel.rotation =
      (noise(
        pos.x * 0.01 + 234 - fc / 2000,
        fc / 800 + 300,
        pos.y * 0.01 + 85 - fc / 200
      ) *
        2 -
        1) **
      3;
    const offset = createVector(x, y).rotate(imgPixel.rotation);

    vel.x += (offset.x - pos.x) * 0.1;
    vel.y += (offset.y - pos.y) * 0.1;

    push();
    fill(0, 0, b);
    translate(offPosB.x * pixelSize, offPosB.y * pixelSize);
    rotate(imgPixel.rotation);
    square(0, 0, pixelSize);
    pop();

    push();
    fill(0, g, 0);
    translate(offPosG.x * pixelSize, offPosG.y * pixelSize);
    rotate(imgPixel.rotation);
    square(0, 0, pixelSize);
    pop();

    push();
    fill(r, 0, 0);
    rotate(imgPixel.rotation);
    square(pos.x * pixelSize, pos.y * pixelSize, pixelSize);
    pop();

    const diffx = nMouseX - pos.x;
    const diffy = nMouseY - pos.y;
    const d = (diffx * diffx + diffy * diffy) ** 0.5;
    const m = 1 / max(0.1, d);
    const effectiveDist = 50;
    if (d < effectiveDist) {
      const t = (effectiveDist - min(effectiveDist, d)) / effectiveDist;
      const t15 = t ** 15;
      vel.add(nMouseVel.copy().mult(t15 * mouseForce * 0.75));
    }

    vel.add(createVector(origin.x - pos.x, origin.y - pos.y).mult(0.1));

    vel.limit(2);

    pos.add(vel.x, vel.y);
  });
}

function flerp(a, b, t) {
  return a * (1 - t) + b * t;
}
