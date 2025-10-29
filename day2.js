let skaters = [];
let ramps = [];

function setup(){
  const c = createCanvas(windowWidth, windowHeight - 64);
  c.parent('scene'); colorMode(RGB,255);
  for(let i=0;i<6;i++){ skaters.push({x: random(-200,-40), y: random(height*0.55,height*0.7), spd: random(2.2,3.1)}); }
  ramps = [
    {x: width*0.3, y: height*0.65, w: 80, h: 10},
    {x: width*0.6, y: height*0.6, w: 120, h: 12}
  ];
}

function draw(){
  bgGradient(color(255), color(230,240,255));
  drawArch(false);

  // ramps
  noStroke(); fill(0,0,0,30);
  for (let r of ramps){ rect(r.x - r.w/2, r.y - r.h/2, r.w, r.h, 6); }

  // skaters
  textAlign(CENTER,CENTER); textSize(26);
  for(let s of skaters){
    // tiny hop when near ramp
    let hop = 0;
    for (let r of ramps){
      if (s.x > r.x - r.w/2 - 15 && s.x < r.x + r.w/2 + 15) hop = -10;
    }
    s.x += s.spd; s.y += lerp(0, hop, 0.08);
    text('🛹', s.x, s.y);
    if(s.x > width+60){ s.x = random(-220,-60); s.y = random(height*0.55,height*0.7); }
  }

  caption("Daytime: casual skate lines crossing the plaza.");
}

// helpers
function bgGradient(c1,c2){ for(let y=0;y<height;y++){ const t=y/height; stroke(lerpColor(c1,c2,t)); line(0,y,width,y);} }
function drawArch(light=false){ push(); const y=height*0.2,x=width*0.5; noStroke(); rectMode(CENTER); fill(light?255:20); rect(x,y,180,40,8); rect(x-180/2+14,y+100/2,20,100,6); rect(x+180/2-14,y+100/2,20,100,6); pop(); }
function caption(msg){ push(); noStroke(); fill(255,255,255,220); rect(16,16,360,64,12); fill(10); textAlign(LEFT,TOP); textSize(14); text(msg, 28,24); pop(); }
