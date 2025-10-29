let notes = [], people = [], bars = [];

function setup(){
  const w = Math.min(window.innerWidth, 900);
  const h = Math.min(window.innerHeight, 600);
  const c = createCanvas(w, h);
  c.parent('sketch');
  for(let i=0;i<10;i++) people.push({x: width*0.25+i*(width*0.05), y: height*0.72, ph: random(TWO_PI)});
  for(let i=0;i<16;i++) bars.push({x: width*0.1+i*(width*0.05), w: width*0.03});
}

function windowResized(){
  resizeCanvas(Math.min(window.innerWidth,900), Math.min(window.innerHeight,600));
}

function stars(){
  noStroke();
  for(let i=0;i<60;i++){
    const s=noise(i*10)*2+1, x=(i*53)%width, y=(i*97)%(height*0.5);
    fill(255,255,255, 180*(sin(frameCount*0.02+i)+1)/2 + 50);
    circle(x,y,s);
  }
}

function arch(){
  noStroke(); fill(20,40,70); rect(width*0.58,height*0.35,width*0.26,height*0.4,8);
  fill(30,60,110); rect(width*0.61,height*0.38,width*0.20,height*0.34,8);
  drawingContext.save(); drawingContext.globalCompositeOperation='destination-out';
  ellipse(width*0.71,height*0.60,width*0.16,height*0.28); drawingContext.restore();
}

function fountain(){
  noStroke(); fill(25,50,90); ellipse(width*0.4,height*0.78,width*0.32,height*0.06);
  fill(120,180,255,60); for(let i=0;i<6;i++) ellipse(width*0.4,height*0.70-i*8,6,20);
}

function busker(){
  push(); translate(width*0.32,height*0.72);
  stroke(230); strokeWeight(2); line(0,-20,0,10); line(0,10,-8,30); line(0,10,8,30); line(0,-10,-12,0); line(0,-10,16,-4);
  noStroke(); fill(230); circle(0,-28,10);
  push(); translate(10,-8); rotate(-0.2); fill(255,200,120); ellipse(0,0,22,16); rect(-4,-2,14,4,2); pop();
  pop();
}

function spawnNote(){ notes.push({x: width*0.32+random(-10,10), y: height*0.70, vy: random(-1.5,-0.7), a:255}); }

function drawNotes(){
  for(const n of notes){ n.y+=n.vy; n.a-=2; noStroke(); fill(170,210,255,n.a); textSize(16); text(['♪','♩','♫'][int(random(3))], n.x, n.y); }
  notes = notes.filter(n => n.a>0 && n.y>-20);
}

function crowd(){
  for(const p of people){
    const bob = sin(frameCount*0.05 + p.ph) * 3;
    push(); translate(p.x, p.y + bob);
    stroke(220); strokeWeight(2);
    line(0,-18,0,8); line(0,8,-7,26); line(0,8,7,26); line(0,-10,-10,2); line(0,-10,10,2);
    noStroke(); fill(220); circle(0,-24,8);
    pop();
  }
}

function eq(){
  noStroke();
  for(const b of bars){
    const h = map(noise(frameCount*0.02 + b.x*0.01), 0,1, 6, height*0.18);
    fill(90,140,230,180);
    rect(b.x, height*0.86 - h, b.w, h, 4);
  }
}

function draw(){
  background(10,15,28);
  stars(); arch(); fountain(); busker(); crowd(); eq();
  if(frameCount % 15 === 0) spawnNote();
  drawNotes();
  noStroke(); fill(231); textSize(14); text('Night 1 • Live Music', 12, 24);
}
