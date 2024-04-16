let sound;
let button;
let isPlaying = false;
let fft, waveform;

function preload() {
  sound = loadSound("blessed.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);

  button = createButton("Play");
  button.position(width / 2, height * 0.6);
  button.mousePressed(toggleSound);

  fft = new p5.FFT();

  console.log(waveform);
}

function draw() {
  background(0);
  orbitControl();
  waveform = fft.waveform();
  let r = width * 0.3;

  for (let a = 0; a < 2 * PI; a += PI / 25) {
    let index = int(map(a, 0, 2 * PI, 0, waveform.length));
    let curH = abs(300 * waveform[index]);
    let x = r * cos(a);
    let y = r * sin(a);
    push();
    translate(x, y, curH / 2);
    rotateX(PI / 2);
    let c1 = color(150, 200, 200);
    let c2 = color(255, 13, 141);
    let rate = map(a, 0, 2 * PI, 0, 0.9);
    let col = lerpColor(c1, c2, rate);
    stroke(col);
    cylinder(10, 3 + curH);
    pop();
  }
}

function toggleSound() {
  if (isPlaying) {
    sound.pause();
    button.html("Play");
  } else {
    sound.play();
    button.html("Pause");
  }
  isPlaying = !isPlaying;
}
