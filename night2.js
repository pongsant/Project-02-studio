let smoke = [];

function setup(){
  const w = Math.min(window.innerWidth, 900);
  const h = Math.min(window.innerHeight, 600);
  const c = createCanvas(w, h);
  c.parent('sketch');
}

function windowResized(){
  resizeCanvas(Math.min(window.innerWidth,900), Math.min(window.innerHeight,600));
}

function stars(){
  noStroke();
  for(let i=0;i<50;i++){
    const x=(i*71)%width, y=(i*43)%(height*0.5);
    const a=180*(sin(frameCount*0.03+i)+1)/2 + 40;
    fill(255,255,255,a); circle(x,y,1.5+noise(i)*1.5);
  }
}

function arch(){
  noStroke(); fill(22,38,70); rect(width*0.62,height*0.30,width*0.24,height*0.46,10);
  fill(30,58,110); rect(width*0.65,height*0.34,width*0.18,height*0.40,8);
  drawingContext.save(); drawingContext.globalCompositeOperation='destination-out';
  ellipse(width*0.74,height*0.62,width*0.14,height*0.26); drawingContext.restore();
}

function bench(){
  push(); translate(width*0.28,height*0.72);
  noStroke(); fill(40,60,90);
  rect(-120,-10,240,10,3); rect(-120,-32,240,8,3); rect(-115,0,10,28,3); rect(105,0,10,28,3);
  pop();
}

function person(){
  push(); translate(width*0.18,height*0.70);
  stroke(230); strokeWeight(2);
  line(0,-16,0,6); line(0,6,14,10); line(14,10,28,12); line(0,-8,-12,-2);
  noStroke(); fill(230); circle(0,-22,9);
  noStroke(); fill(255,200,120); circle(18,8,3);
  pop();
}

function spawnSmoke(){
  smoke.push({
    x: width*0.18+18+random(-2,2),
    y: height*0.70+8+random(-2,2),
    vx: random(-0.2,0.3),
    vy: random(-1.1,-0.5),
    r: random(6,14),
    a: 230
  });
}

function drawSmoke(){
  for(const s of smoke){
    s.x += s.vx + 0.05*sin(frameCount*0.02 + s.y*0.01);
    s.y += s.vy;
    s.a -= 1.3;
    s.r += 0.05;
    noStroke(); fill(140,200,160,s.a);
    circle(s.x, s.y, s.r);
  }
  smoke = smoke.filter(s => s.a>6 && s.y>-20);
}

function draw(){
  background(10,15,28);
  stars(); arch(); bench(); person();
  if(frameCount % 3 === 0) spawnSmoke();
  drawSmoke();
  noStroke(); fill(231); textSize(14); text('Night 2 • Smoking Hangout (stylized)', 12, 24);
}
