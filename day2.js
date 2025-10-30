// Day 2 — Skate lines (pure p5, simplified arch, no globalCompositeOperation)

let skaters = [];
let ramps = [];

function setup(){
  const w = Math.min(window.innerWidth, 900);
  const h = Math.min(window.innerHeight, 600);
  const c = createCanvas(w, h);
  c.parent('sketch');

  // skaters
  for (let i = 0; i < 7; i++) {
    const base = random(height * 0.56, height * 0.70);
    skaters.push({
      x: random(-240, -80),
      y: base,
      baseY: base,
      spd: random(2.0, 2.8),
      vy: 0,
      phase: random(TWO_PI),
    });
  }

  // ledges
  ramps = [
    { x: width * 0.30, y: height * 0.66, w: 120, h: 10 },
    { x: width * 0.62, y: height * 0.61, w: 160, h: 12 },
  ];

  textFont('system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial');
}

function windowResized(){
  resizeCanvas(Math.min(window.innerWidth, 900), Math.min(window.innerHeight, 600));
}

/* ---------- background + park shapes (day style) ---------- */
function bgGradient(c1, c2){
  noFill();
  for (let y = 0; y < height; y++){
    const t = y / height;
    stroke(lerpColor(c1, c2, t));
    line(0, y, width, y);
  }
}

function skyDay(){
  // soft sky → plaza glow
  bgGradient(color(200, 225, 255), color(248, 251, 255));
}

function archDaySimple(){
  // simplified arch (no compositing) so it works in all setups
  noStroke();
  // outer block
  fill(225);
  rect(width*0.58, height*0.33, width*0.26, height*0.40, 8);
  // inner block
  fill(245);
  rect(width*0.61, height*0.36, width*0.20, height*0.34, 8);

  // "cutout" illusion: draw a lighter ellipse to hint the arch opening
  fill(240);
  ellipse(width*0.71, height*0.57, width*0.16, height*0.28);

  // outline for readability
  noFill(); stroke(0,0,0,35); strokeWeight(2);
  rect(width*0.58, height*0.33, width*0.26, height*0.40, 8);
  // hint of inner arch edge
  stroke(0,0,0,25);
  arc(width*0.71, height*0.57, width*0.16, height*0.28, PI, TWO_PI);
}

function fountainDay(){
  noStroke();
  fill(180, 205, 235, 150);
  ellipse(width*0.40, height*0.76, width*0.32, height*0.06);
  fill(140, 180, 230, 90);
  for (let i=0;i<6;i++) ellipse(width*0.40, height*0.68 - i*8, 6, 20);
}
/* --------------------------------------------------------- */

function drawRamps(){
  noStroke();
  fill(60, 60, 80, 35); // plaza shadow tone
  for (const r of ramps){
    rect(r.x - r.w/2, r.y - r.h/2, r.w, r.h, 6);
  }
  // top highlight
  fill(255,255,255,90);
  for (const r of ramps){
    rect(r.x - r.w/2, r.y - r.h/2 - 2, r.w, 2, 4);
  }
}

function drawSkater(x, y, lean = 0){
  push();
  translate(x, y);
  rotate(lean);

  // board shadow
  noStroke(); fill(0,0,0,60);
  ellipse(4, 8, 26, 6);

  // board (day tint)
  fill(40, 40, 55, 140);
  rectMode(CENTER); rect(0, 0, 28, 4, 2);

  // wheels
  fill(40, 40, 55, 180);
  circle(-10, 3, 3); circle(10, 3, 3);

  // figure (ink lines for day)
  stroke(30, 35, 50); strokeWeight(2);
  line(0, -18, 0, -4);     // torso
  line(0, -4, -8, 4);      // legs
  line(0, -4,  8, 4);
  line(0, -14, -10, -8);   // arms
  line(0, -14,  10, -8);
  noStroke(); fill(30,35,50);
  circle(0, -22, 8);       // head
  pop();
}

function draw(){
  skyDay();
  archDaySimple();
  fountainDay();
  drawRamps();

  // motion
  for (let s of skaters){
    // hop over ramps
    let onRamp = false;
    for (const r of ramps){
      if (s.x > r.x - r.w/2 - 12 && s.x < r.x + r.w/2 + 12) { onRamp = true; break; }
    }
    if (onRamp && s.vy >= 0) s.vy = -2.3;  // takeoff
    s.vy += 0.10;                           // gravity
    s.y = s.baseY + s.vy;

    // forward + gentle lean
    s.x += s.spd;
    const lean = sin(frameCount * 0.06 + s.phase) * 0.12;

    drawSkater(s.x, s.y, lean);

    // recycle
    if (s.x > width + 80){
      s.x = random(-260, -100);
      s.baseY = random(height * 0.56, height * 0.70);
      s.y = s.baseY;
      s.vy = 0;
    }
  }

  // label
  noStroke(); fill(20);
  textSize(14);
  text('Day 2 • Skate lines across the plaza', 12, 24);
}
