var counter;

function setup() {
createCanvas(windowWidth, windowHeight);
background(255,255,255);
counter=0;
textSize(20);
}

function draw() {
if (mouseIsPressed) {
strokeWeight(10)
stroke(255,0,0);
line(mouseX, mouseY, pmouseX, pmouseY);
}
}
function keyPressed(){
counter++;
fill(0);
circle(mouseX, mouseY, 5);
text(counter, mouseX,mouseY);
}
