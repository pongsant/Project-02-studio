// Day 2 — Skate lines (same background as walker scene)

let skaters = [];
let ramps = [];

function setup() {
  const c = createCanvas(windowWidth, windowHeight - 64);
  c.parent('scene');
  colorMode(RGB, 255, 255, 255, 1);
  rectMode(CENTER);
  textFont('system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial');

  for (let i = 0; i < 7; i++) {
    const base = random(height * 0.55, height * 0.70);
    skaters.push({
      x: random(-240, -80),
      y: base,
      baseY: base,
      spd: random(2.0, 3.0),
      vy: 0,
      phase: random(TWO_PI),
    });
  }

  ramps = [
    { x: width * 0.3, y: height * 0.68, w: 120, h: 10 },
    { x: width * 0.62, y: height * 0.62, w: 160, h: 12 },
  ];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 64);
}

function draw() {
  // gradient background + path like your walker scene
  bgGradient(color(255,255,255), color(235,242,255));
  drawArch(false);
  noStroke();
  fill(0,0,0,0.05);
  rect(width/2, height*0.6, width, 60); // path strip

  // ramps
  noStroke();
  fill(80, 80, 80, 40);
  for (const r of ramps) rect(r.x, r.y, r.w, r.h, 6);

  // skaters
  for (let s of skaters) {
    let onRamp = false;
    for (const r of ramps) {
      if (s.x > r.x - r.w / 2 - 12 && s.x < r.x + r.w / 2 + 12) onRamp = true;
    }
    if (onRamp && s.vy >= 0) s.vy = -2.3;
    s.vy += 0.10;
    s.y = s.baseY + s.vy;
    s.x += s.spd;
    const lean = sin(frameCount * 0.06 + s.phase) * 0.12;
    drawSkater(s.x, s.y, lean);
    if (s.x > width + 80) {
      s.x = random(-260, -100);
      s.baseY = random(height * 0.55, height * 0.70);
      s.y = s.baseY;
      s.vy = 0;
    }
  }

  caption("Daytime: skaters weaving through the plaza under the arch.");
}

/* ===== helpers (same as walker style) ===== */
function bgGradient(c1, c2){
  for(let y=0; y<height; y++){
    const t = y/height;
    stroke(lerpColor(c1, c2, t));
    line(0, y, width, y);
  }
}

function drawArch(light=false){
  push();
  const y = height*0.2, x = width*0.5;
  noStroke(); rectMode(CENTER);
  fill(light ? 255 : 20);
  rect(x, y, 180, 40, 8); // top beam
  rect(x - 180/2 + 14, y + 100/2, 20, 100, 6); // left leg
  rect(x + 180/2 - 14, y + 100/2, 20, 100, 6); // right leg
  pop();
}

function caption(msg){
  push();
  noStroke();
  fill(255,255,255,220);
  rect(16,16,360,64,12);
  fill(10);
  textAlign(LEFT,TOP);
  textSize(14);
  text(msg, 28,24);
  pop();
}

function drawSkater(x, y, lean = 0){
  push();
  translate(x, y);
  rotate(lean);
  noStroke(); fill(0,0,0,40); ellipse(4, 8, 26, 6);
  fill(50); rect(0, 0, 28, 4, 2);
  stroke(30); strokeWeight(2);
  line(0, -18, 0, -4);
  line(0, -4, -8, 4);
  line(0, -4,  8, 4);
  line(0, -14, -10, -8);
  line(0, -14,  10, -8);
  noStroke(); fill(30);
  circle(0, -22, 8);
  pop();
}
