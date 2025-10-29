let walkers = [];
let flashes = [];

function setup(){
  const c = createCanvas(windowWidth, windowHeight - 64);
  c.parent('scene');
  colorMode(RGB,255,255,255,1);

  // seed walkers across two lanes
  for (let i=0;i<20;i++){
    walkers.push({
      x: random(-200, width+200),
      y: random(height*0.55, height*0.75),
      spd: random(1.0, 2.2),
      takingPhoto: random() < 0.18,
      t: random(TWO_PI)
    });
  }
}

function draw(){
  bgGradient(color(255,255,255), color(235,242,255));
  drawArch(false);

  // path hint
  noStroke(); fill(0,0,0,0.05);
  rect(0, height*0.6, width, 60);

  // walkers
  textAlign(CENTER,CENTER); textSize(20);
  for (let w of walkers){
    w.x += w.spd;
    w.t += 0.03;
    const bob = sin(w.t)*2;

    // tourist emoji
    text('🧍', w.x, w.y + bob);

    // camera chance
    if (w.takingPhoto && frameCount % 90 === 0 && random()<0.6){
      flashes.push({x: w.x + random(-10,10), y: w.y-26, life: 18});
    }

    if (w.x > width+80){ w.x = -120; w.y = random(height*0.55, height*0.75); w.spd = random(1.0,2.2); w.takingPhoto = random()<0.18;}
  }

  // camera flashes
  for (let f of flashes){
    noStroke(); fill(255, 240, 120, map(f.life,0,18,0,0.9));
    circle(f.x, f.y, map(f.life,0,18,40,6));
    f.life--;
  }
  flashes = flashes.filter(f => f.life>0);

  // caption
  caption("Daytime: steady flow of tourists; quick photo flashes near the arch.");
}

// === helpers (repeat per file) ===
function bgGradient(c1, c2){ for(let y=0;y<height;y++){ const t=y/height; stroke(lerpColor(c1,c2,t)); line(0,y,width,y);} }
function drawArch(light=false){ push(); const y=height*0.2,x=width*0.5; noStroke(); rectMode(CENTER); fill(light?255:20); rect(x,y,180,40,8); rect(x-180/2+14,y+100/2,20,100,6); rect(x+180/2-14,y+100/2,20,100,6); pop(); }
function caption(msg){ push(); noStroke(); fill(255,255,255,220); rect(16,16,360,64,12); fill(10); textAlign(LEFT,TOP); textSize(14); text(msg, 28,24); pop(); }
