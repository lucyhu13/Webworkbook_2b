function setup() {
createCanvas(800,900);
background(222);

}


function draw() {
  //hair
  fill(0);
  rect(170,380,460,320);
  triangle(200,380,200,700,150,700);
   triangle(600,380,600,700,650,700);
   

    
  //ear
  noStroke();
  fill(255,212,202);
  ellipse(width/2-200, height/2,100);
  ellipse(width/2 +200, height/2,100);
  
  
  //face
   fill(255,232,222);
   noStroke();
  ellipse(width/2, height/2, 400, 400);

    
  //hair
  fill(0);
  arc(400,390,460,450,radians(180),radians(360));
  
  
  //eyes  
  noStroke();
  fill(255);
  ellipse(width/2 + 80, height/2 - 30, 70, 60);
  ellipse(width/2 - 80, height/2 - 30, 70, 60);
  
  //black eye
  fill(0);
  ellipse(width/2 - 75, height/2 - 30, 40, 40); 
  ellipse(width/2 + 75, height/2 - 30, 40, 40);
  
  
  //glasses
  noFill();
  stroke(255,0,0);
  ellipse(width/2 -80, height/2 - 5, 80, 80);
  ellipse(width/2 +80, height/2 - 5, 80, 80);
  
   arc(width/2, height/2 -20, 80, 40, PI, TWO_PI);
   
   //nose
     noStroke();
    fill(255,212,202);
     ellipse(width/2 , height/2 +10, 40, 40);
     
  
  //mouth
 noFill();
  stroke(0);
  arc(width/2, height/2 + 80, 80, 40, 0, PI);
  
  //frinch
  noStroke();
  fill(255,232,222)
  triangle(450,290,208,390,595,390);
  
    
   //neck
   fill(255,232,222);
   noStroke();
    rect(width/2 - 45, height/2 + 190,80,70);


}
