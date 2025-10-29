let zzz = [], twinkles = [];

function setup(){
  const w = Math.min(window.innerWidth, 900);
  const h = Math.min(window.innerHeight, 600);
  const c = createCanvas(w, h);
  c.parent('sketch');
  for(let i=0;i<70;i++){
    twinkles.push({x: random(width), y: random(height*0.5), s: random(1,2.5), t: random(TWO_PI)});
  }
}

function windowResized(){
  resizeCanvas(Math.min(window.innerWidth,900), Math.min(window.innerHeight,600));
}

function stars(){
  noStroke();
  for(const s of twinkles){
    const a = 120*(sin(frameCount*0.03 + s.t)+1)/2 + 40;
    fill(255,255,255,a); circle(s.x, s.y, s.s);
  }
}

function arch(){
  noStroke(); fill(20,36,68); rect(width*0.12,height*0.28,width*0.22,height*0.48,10);
  fill(28,56,108); rect(width*0.15,height*0.32,width*0.16,height*0.42,8);
  drawingContext.save(); drawingContext.globalCompositeOperation='destination-out';
  ellipse(width*0.23,height*0.60,width*0.12,height*0.24); drawingContext.restore();
}

function bench(){
  push(); translate(width*0.55,height*0.72);
  noStroke(); fill(42,62,94);
  rect(-130,-8,260,10,3); rect(-130,-30,260,8,3); rect(-125,2,10,28,3); rect(115,2,10,28,3);
  pop();
}

function sleeper(){
  push(); translate(width*0.48,height*0.70);
  stroke(230); strokeWeight(2);
  line(-20,-4,30,-4); // torso
  line(30,-4,52,0);   // legs
  line(-10,-6,-24,-2); line(-8,-6,6,-10); // arms
  noStroke(); fill(230); circle(-26,-6,10); // head
  pop();
}

function spawnZ(){
  zzz.push({x: width*0.44, y: height*0.62, vy: random(-0.9,-0.5), a:255, ch: random(['Z','Z','z'])});
}

function drawZ(){
  for(const z of zzz){
    z.y += z.vy; z.a -= 2;
    noStroke(); fill(220, z.a); textSize(16); text(z.ch, z.x, z.y);
  }
  zzz = zzz.filter(z => z.a>8 && z.y>-20);
}

function draw(){
  background(10,15,28);
  stars(); arch(); bench(); sleeper();
  if(frameCount % 24 === 0) spawnZ();
  drawZ();
  noStroke(); fill(231); textSize(14); text('Night 3 • Sleeping on Bench', 12, 24);
}
