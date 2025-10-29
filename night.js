let stars = [];
let skaters = [];
let bars = [];
let smokes = [];
let nightSound, isPlaying = false;

function preload(){ 
  nightSound = loadSound('assets/night_ambience.mp3', ()=>{}, ()=>{});
}

function setup(){
  const c = createCanvas(windowWidth, windowHeight - 64);
  c.parent('scene');
  colorMode(HSL, 360, 100, 100, 1);

  // stars
  for(let i=0;i<120;i++){
    stars.push({x: random(width), y: random(height*0.5), a: random(0.6,1), s: random(1,2)});
  }

  // skaters
  for(let i=0;i<2;i++){
    skaters.push({x: random(-200,-50), y: random(height*0.55, height*0.7), spd: random(2.2,3.2)});
  }

  // equalizer bars
  for(let i=0;i<10;i++){
    bars.push({x: width*0.15 + i*14, h: random(10,80), t: random(TWO_PI)});
  }

  // smoke puffs
  for(let i=0;i<6;i++){
    smokes.push({x: width*0.12 + random(-10,10), y: height*0.7, r: random(6,14), t: random(1000)});
  }

  // audio UI
  select('#playBtn').mousePressed(()=>{
    if(!isPlaying){
      if (nightSound && nightSound.isLoaded()) {
        nightSound.loop();
        nightSound.setVolume(select('#vol').elt.value);
      }
      isPlaying=true; select('#playBtn').html('Pause');
    } else {
      if (nightSound) nightSound.pause();
      isPlaying=false; select('#playBtn').html('Play');
    }
  });
  select('#vol').input(()=>{ if(nightSound && nightSound.isLoaded()) nightSound.setVolume(select('#vol').elt.value); });
}

function draw(){
  // night gradient
  setGradient(color(230,30,7), color(230,30,0));
  drawArch();

  // stars twinkle
  noStroke();
  for(let s of stars){
    s.a += random(-0.02, 0.02);
    fill(0,0,100, constrain(s.a,0.6,1));
    circle(s.x, s.y, s.s);
  }

  // equalizer bars
  push();
  for(let b of bars){
    b.t += 0.08;
    const h = map(sin(b.t), -1, 1, 10, 80);
    fill(220, 80, 65);
    rect(b.x, height*0.8 - h, 10, h, 3);
  }
  pop();

  // skaters moving
  textSize(28); textAlign(CENTER,CENTER);
  for(let sk of skaters){
    sk.x += sk.spd;
    if(sk.x > width + 60){ sk.x = random(-200,-50); sk.y = random(height*0.55, height*0.7); }
    text('🛹', sk.x, sk.y);
  }

  // smoke puffs drifting
  for(let p of smokes){
    p.t += 1.5;
    const dy = map(noise(p.t*0.003), 0,1, -1, -2.5);
    const dx = map(noise(p.t*0.004+1000),0,1, 0.2, 1.2);
    p.x += dx; p.y += dy; p.r *= 1.002;
    fill(0,0,100, 0.15); noStroke(); circle(p.x,p.y,p.r);
    if(p.y < height*0.5) { p.y = height*0.7; p.x = width*0.12 + random(-10,10); p.r = random(6,14); }
  }

  drawCard(16, height-96, "Night vibe:\nLocals hang out, skate, live music,\nsoft smoke in the air.");
}

function setGradient(c1, c2){
  for(let y=0;y<height;y++){
    const inter = y/height;
    stroke( lerpColor(c1,c2,inter) );
    line(0,y,width,y);
  }
}

function drawArch(){
  // simple light arch
  push();
  const archY = height*0.2, archX = width*0.5;
  const topW=180, topH=40, pW=20, pH=100;
  fill(0,0,97); noStroke(); rectMode(CENTER);
  rect(archX, archY, topW, topH, 8);
  rect(archX - topW/2 + 14, archY + pH/2, pW, pH, 6);
  rect(archX + topW/2 - 14, archY + pH/2, pW, pH, 6);
  pop();
}

function drawCard(x,y,msg){
  push();
  rectMode(CORNER); noStroke();
  fill(0,0,0, .55); rect(x,y, 320, 90, 12);
  fill(0,0,100); textAlign(LEFT,TOP); textSize(14);
  text(msg, x+12, y+10);
  pop();
}

function windowResized(){ resizeCanvas(windowWidth, windowHeight - 64); }
