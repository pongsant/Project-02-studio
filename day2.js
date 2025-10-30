// Day 2 — Skate lines (same structure/style as your walkers code)

let skaters = [];
let sparks = [];

function setup(){
  const c = createCanvas(windowWidth, windowHeight - 64);
  c.parent('scene');
  colorMode(RGB, 255, 255, 255, 1);

  // seed skaters across the same two lanes
  for (let i = 0; i < 20; i++){
    skaters.push({
      x: random(-200, width + 200),
      y: random(height * 0.55, height * 0.75),
      spd: random(1.6, 2.8),
      doingTrick: random() < 0.22, // sometimes “ollie” → sparks
      t: random(TWO_PI)
    });
  }
}

function draw(){
  // background + arch identical to your walkers scene
  bgGradient(color(255,255,255), color(235,242,255));
  drawArch(false);

  // path hint strip
  noStroke(); fill(0,0,0,0.05);
  rect(0, height*0.6, width, 60);

  // skaters (emoji), gentle bob
  textAlign(CENTER, CENTER);
  textSize(22);
  for (let s of skaters){
    s.x += s.spd;
    s.t += 0.035;
    const bob = sin(s.t) * 2;

    // skateboard emoji
    text('🛹', s.x, s.y + bob);

    // occasional trick → little spark burst
    if (s.doingTrick && frameCount % 70 === 0 && random() < 0.55){
      sparks.push({ x: s.x + random(-8,8), y: s.y + 4, life: 16 });
    }

    // recycle off right edge
    if (s.x > width + 80){
      s.x = -120;
      s.y = random(height * 0.55, height * 0.75);
      s.spd = random(1.6, 2.8);
      s.doingTrick = random() < 0.22;
    }
  }

  // sparks (like camera flashes but near the ground)
  for (let p of sparks){
    noStroke();
    fill(255, 200, 80, map(p.life, 0, 16, 0, 0.9));
    circle(p.x, p.y, map(p.life, 0, 16, 22, 4));
    p.life--;
  }
  sparks = sparks.filter(p => p.life > 0);

  // caption box
  caption("Daytime: skate lines crossing the plaza; occasional board sparks.");
}

/* === helpers (identical signatures to your walkers file) === */
function bgGradient(c1, c2){
  for (let y = 0; y < height; y++){
    const t = y / height;
    stroke(lerpColor(c1, c2, t));
    line(0, y, width, y);
  }
}

function drawArch(light=false){
  push();
  const y = height*0.2, x = width*0.5;
  noStroke(); rectMode(CENTER);
  fill(light ? 255 : 20);
  rect(x, y, 180, 40, 8);
  rect(x - 180/2 + 14, y + 100/2, 20, 100, 6);
  rect(x + 180/2 - 14, y + 100/2, 20, 100, 6);
  pop();
}

function caption(msg){
  push();
  noStroke();
  fill(255,255,255,220);
  rect(16, 16, 360, 64, 12);
  fill(10);
  textAlign(LEFT, TOP);
  textSize(14);
  text(msg, 28, 24);
  pop();
}
