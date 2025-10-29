// Simple HTMLAudio controls for ambience (optional)
const playBtn = document.getElementById('playBtn');
const vol = document.getElementById('vol');
const audio = document.getElementById('amb');

let playing = false;

playBtn.addEventListener('click', () => {
  if (!audio) return;
  if (!playing) {
    audio.volume = parseFloat(vol.value || '0.5');
    audio.play().catch(()=>{});   // requires user gesture; this click counts
    playBtn.textContent = 'Pause';
    playing = true;
  } else {
    audio.pause();
    playBtn.textContent = 'Play';
    playing = false;
  }
});

vol.addEventListener('input', () => {
  if (audio) audio.volume = parseFloat(vol.value || '0.5');
});
