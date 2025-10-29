let ripples = [];
let icons = [];
let saxPulse = 0;
let daySound, isPlaying = false;

function preload() {
  // Won’t error if file missing; add assets/day_ambience.mp3 to hear it
  daySound = loadSound('assets/day_ambience.mp3', ()=>{}, ()=>{});
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight - 64);
  c.parent('scene');
  colorMode(HSL, 360, 100, 100, 1);

  // Fountain ripple seeds
  for (let i = 0; i < 3; i++) {
    ripples.push({r: 40 + i*30, speed: 0.6 + i*0.15, alpha: 0.35});
  }

  // Floating “tourist” emojis
  const emotes = ['📸','🎒','🎭','🎨'];
  for (let i = 0; i < emotes.length; i++) {
    icons.push({
      t: random(TWO_PI),
      x: map(i,0,emotes.length-1,width*0.2,width*0.8),
      yBase: random(height*0.5, height*0.8),
      emoji: emotes[i],
      spd: random(0.6,1.1)
    });
  }

  // Audio UI
  select('#playBtn').mousePressed(() => {
    if (!isPlaying) {
      if (daySound && daySound.isLoaded()) {
        daySound.loop();
        daySound.setVolume(select('#vol').elt.value);
      }
      isPlaying = true;
      select('#playBtn').html('Pause');
    } else {
      if (daySound) daySound.pause();
      isPlaying = false;
      select('#playBtn').html('Play');
    }
  });
  select('#vol').input(() => {
    if (daySound && daySound.isLoaded()) daySound.setVolume(select('#vol').elt.value);
  });
}

function draw() {
  // day sky gradient
  setGradient(color(210,100,99), color(210,60,92));
  drawArch();

  // Fountain + ripples
  push();
  translate(width*0.5, height*0.55);
  noFill(); stroke(220,10,25, 0.3); ellipse(0,0, 260,260);
  for (let r of ripples) {
    stroke(210,40,25, r.alpha);
    ellipse(0,0, r.r*2, r.r*2);
    r.r += r.speed;
    if (r.r > 180) r.r = 40;
  }
  pop();

  // Performer pulse
  saxPulse = (saxPulse + 0.02) % TWO_PI;
  const pulse = map(sin(saxPulse), -1, 1, 0.8, 1.3);
  push();
  translate(width*0.68, height*0.62);
  noFill(); stroke(35,100,60, .45);
  ellipse(0,0, 120*pulse, 120*pulse);
  noStroke(); textAlign(CENTER,CENTER); textSize(28);
  text('🎷',0,0-2);
  pop();

  // Floating emojis
  noStroke(); textAlign(CENTER, CENTER); textSize(28);
  for (let p of icons) {
    p.t += 0.01 * p.spd;
    const y = p.yBase + sin(p.t) * 12;
    text(p.emoji, p.x, y);
  }

  drawCard(16,16, "Afternoon vibe:\nPerformers, photos by the arch,\ncrowds near the fountain.");
}

function setGradient(c1, c2) {
  for (let y=0; y<height; y++) {
    const inter = y/height;
    stroke( lerpColor(c1,c2,inter) );
    line(0,y,width,y);
  }
}

function drawArch() {
  // simple arch (top + two pillars)
  push();
  const archY = height*0.21, archX = width*0.5;
  const topW = 180, topH = 40, pW = 20, pH = 100;
  fill(0,0,10); noStroke(); rectMode(CENTER);
  rect(archX, archY, topW, topH, 8);
  rect(archX - topW/2 + 14, archY + pH/2, pW, pH, 6);
  rect(archX + topW/2 - 14, archY + pH/2, pW, pH, 6);
  pop();
}

function drawCard(x,y,msg){
  push();
  rectMode(CORNER); noStroke();
  fill(0,0,100, .85); rect(x,y, 300, 80, 12);
  fill(0,0,10); textAlign(LEFT,TOP); textSize(14);
  text(msg, x+12, y+10);
  pop();
}

function windowResized(){ resizeCanvas(windowWidth, windowHeight - 64); }
