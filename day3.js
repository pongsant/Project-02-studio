let benches = [];
let eaters = [];
let pigeons = [];

function setup(){
  const c = createCanvas(windowWidth, windowHeight - 64);
  c.parent('scene'); colorMode(RGB,255);

  // three benches
  const y0 = height*0.65; benches = [width*0.3, width*0.5, width*0.7].map(x => ({x, y: y0}));

  // people eating
  for (let b of benches){
    eaters.push({x: b.x-20, y: b.y-14, t: random(TWO_PI), emoji: random(['🍔','🌭','🍕'])});
    eaters.push({x: b.x+20, y: b.y-14, t: random(TWO_PI), emoji: random(['🥤','🍟','🍜'])});
  }

  // pigeons milling around
  for (let i=0;i<6;i++){
    pigeons.push({x: random(width*0.2,width*0.8), y: random(height*0.6,height*0.75), t: random(1000)});
  }
}

function draw(){
  bgGradient(color(255), color(235,244,255));
  drawArch(false);

  // benches
  noStroke(); fill(60,60,60,120);
  for (let b of benches){ rect(b.x-60, b.y-8, 120, 16, 6); rect(b.x-62, b.y+8, 124, 6, 3); }

  // eaters (gentle bob)
  textAlign(CENTER,CENTER); textSize(20);
  for (let e of eaters){
    e.t += 0.03; const bob = sin(e.t)*1.5;
    text('🧍', e.x, e.y + bob);
    text(e.emoji, e.x, e.y - 20 + bob);
  }

  // pigeons (little waddle)
  textSize(18);
  for (let p of pigeons){
    p.t += 0.01;
    p.x += map(noise(p.t),0,1,-0.6,0.6);
    p.y += map(noise(p.t+1000),0,1,-0.3,0.3);
    text('🐦', p.x, p.y);
  }

  caption("Daytime: people eat and chill on benches; pigeons patrol for crumbs.");
}

// helpers
function bgGradient(c1,c2){ for(let y=0;y<height;y++){ const t=y/height; stroke(lerpColor(c1,c2,t)); line(0,y,width,y);} }
function drawArch(light=false){ push(); const y=height*0.2,x=width*0.5; noStroke(); rectMode(CENTER); fill(light?255:20); rect(x,y,180,40,8); rect(x-180/2+14,y+100/2,20,100,6); rect(x+180/2-14,y+100/2,20,100,6); pop(); }
function caption(msg){ push(); noStroke(); fill(255,255,255,220); rect(16,16,380,64,12); fill(10); textAlign(LEFT,TOP); textSize(14); text(msg, 28,24); pop(); }
