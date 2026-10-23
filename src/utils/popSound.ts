/** Balloon / party blast pop via Web Audio (no extra mp3 needed) */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctx) ctx = new Ctx();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Short airy “pop / blast” for balloon bursts */
export function playBalloonPop(pitch = 1) {
  const ac = getCtx();
  if (!ac) return;

  const t0 = ac.currentTime;
  const noiseLen = 0.18;
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * noiseLen), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.22));
  }

  const noise = ac.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ac.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 900 * pitch;
  noiseFilter.Q.value = 0.7;
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.55, t0);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, t0 + 0.16);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ac.destination);
  noise.start(t0);
  noise.stop(t0 + noiseLen);

  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(220 * pitch, t0);
  osc.frequency.exponentialRampToValueAtTime(60 * pitch, t0 + 0.12);
  const oscGain = ac.createGain();
  oscGain.gain.setValueAtTime(0.35, t0);
  oscGain.gain.exponentialRampToValueAtTime(0.01, t0 + 0.12);
  osc.connect(oscGain);
  oscGain.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + 0.14);
}

/** Soft curtain-open whoosh */
export function playCurtainWhoosh() {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime;
  const osc = ac.createOscillator();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, t0);
  osc.frequency.exponentialRampToValueAtTime(90, t0 + 0.5);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.01, t0);
  g.gain.linearRampToValueAtTime(0.12, t0 + 0.08);
  g.gain.exponentialRampToValueAtTime(0.01, t0 + 0.55);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + 0.55);
}
