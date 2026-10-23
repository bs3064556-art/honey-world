// Voice + birthday tune — works offline (Web Audio melody + browser TTS)

const DUCK_EVENT = 'honeyverse:duck';

/** Tell the background music to get quieter / louder (so the voice is clearly heard). */
export function duckMusic(duck: boolean) {
  window.dispatchEvent(new CustomEvent<boolean>(DUCK_EVENT, { detail: duck }));
}
export { DUCK_EVENT };

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise(resolve => {
    const synth = window.speechSynthesis;
    const now = synth.getVoices();
    if (now.length) return resolve(now);
    const done = () => resolve(synth.getVoices());
    synth.addEventListener('voiceschanged', done, { once: true });
    window.setTimeout(done, 1500);
  });
}

const FEMALE_NAMES =
  /female|woman|swara|heera|kalpana|neerja|priya|veena|lekha|zira|hazel|susan|aria|jenny|sonia|libby|natasha|samantha|karen|tessa|moira|fiona|victoria|allison|ava|serena|kalyani|aditi|raveena|google (\u0939\u093f\u0928\u094d\u0926\u0940|hindi)|google uk english female|google us english/i;
const MALE_NAMES =
  /\bmale\b|madhur|ravi|hemant|prabhat|kajal_m|rishi|david|mark|george|james|richard|guy|ryan|daniel|alex|fred|thomas|oliver|brian|eric|christopher|liam|connor|aaron|arthur|diego|google uk english male/i;

const isMale = (v: SpeechSynthesisVoice) => MALE_NAMES.test(v.name) && !/female/i.test(v.name);

function pickVoice(voices: SpeechSynthesisVoice[], langPrefixes: string[]): SpeechSynthesisVoice | undefined {
  for (const prefix of langPrefixes) {
    const inLang = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
    const female = inLang.find(v => FEMALE_NAMES.test(v.name) && !isMale(v));
    if (female) return female;
    const notMale = inLang.find(v => !isMale(v));
    if (notMale) return notMale;
  }
  return voices.find(v => FEMALE_NAMES.test(v.name) && !isMale(v));
}

const isFemaleVoice = (v?: SpeechSynthesisVoice) => Boolean(v && FEMALE_NAMES.test(v.name) && !isMale(v));

/** Happy Birthday melody (C major) — always plays even if TTS fails */
function playBirthdayTune(): Promise<void> {
  return new Promise(resolve => {
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) {
        resolve();
        return;
      }
      const ctx = new Ctx();
      void ctx.resume();

      // note frequencies + durations (seconds)
      const melody: [number, number][] = [
        [261.63, 0.28], // C  Hap-
        [261.63, 0.28], // C  py
        [293.66, 0.55], // D  birth-
        [261.63, 0.55], // C  day
        [349.23, 0.55], // F  to
        [329.63, 1.0],  // E  you
        [261.63, 0.28], // C  Hap-
        [261.63, 0.28], // C  py
        [293.66, 0.55], // D  birth-
        [261.63, 0.55], // C  day
        [392.0, 0.55],  // G  to
        [349.23, 1.0],  // F  you
        [261.63, 0.28], // C  Hap-
        [261.63, 0.28], // C  py
        [523.25, 0.55], // C5 birth-
        [440.0, 0.55],  // A  day
        [349.23, 0.55], // F  dear
        [329.63, 0.55], // E  Ho-
        [293.66, 1.0],  // D  ney
        [466.16, 0.28], // Bb Hap-
        [466.16, 0.28], // Bb py
        [440.0, 0.55],  // A  birth-
        [349.23, 0.55], // F  day
        [392.0, 0.55],  // G  to
        [349.23, 1.15], // F  you
      ];

      let t = ctx.currentTime + 0.05;
      const master = ctx.createGain();
      master.gain.value = 0.18;
      master.connect(ctx.destination);

      for (const [freq, dur] of melody) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.9, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.92);
        osc.connect(g);
        g.connect(master);
        osc.start(t);
        osc.stop(t + dur);
        t += dur;
      }

      const endMs = Math.ceil((t - ctx.currentTime) * 1000) + 80;
      window.setTimeout(() => {
        void ctx.close().catch(() => {});
        resolve();
      }, endMs);
    } catch {
      resolve();
    }
  });
}

let speaking = false;
let resumeTimer: number | null = null;

function stopResumeHack() {
  if (resumeTimer != null) {
    window.clearInterval(resumeTimer);
    resumeTimer = null;
  }
}

/** Chrome often pauses speechSynthesis mid-utterance — keep nudging it awake. */
function startResumeHack(synth: SpeechSynthesis) {
  stopResumeHack();
  resumeTimer = window.setInterval(() => {
    if (synth.speaking && synth.paused) synth.resume();
    // some Chromium builds need a no-op resume even when not flagged paused
    if (synth.speaking) synth.resume();
  }, 250);
}

/**
 * Plays the Happy Birthday tune, then says "Happy Birthday <name>!" in English.
 * Safe to call again — cancels any previous greeting first.
 */
export async function speakBirthday(name: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // always allow a fresh play (replay button / second blow)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  speaking = false;
  stopResumeHack();

  duckMusic(true);
  speaking = true;

  // 1) musical Happy Birthday (always works with a user gesture)
  await playBirthdayTune();

  if (!('speechSynthesis' in window)) {
    speaking = false;
    duckMusic(false);
    return true;
  }

  const synth = window.speechSynthesis;
  synth.cancel();
  // unlock voices after user gesture
  try {
    synth.resume();
  } catch {
    /* ignore */
  }

  const voices = await loadVoices();
  const enVoice = pickVoice(voices, ['en-in', 'en-gb', 'en-us', 'en']);
  const enPitch = isFemaleVoice(enVoice) ? 1.12 : 1.65;

  const lines: { text: string; voice?: SpeechSynthesisVoice; lang: string; rate: number; pitch: number }[] = [
    {
      text: `Happy Birthday ${name}! Happy Birthday to you!`,
      voice: enVoice,
      lang: enVoice?.lang ?? 'en-IN',
      rate: 0.92,
      pitch: enPitch,
    },
    {
      text: `Many many happy returns of the day, ${name}! May all your wishes come true. I love you!`,
      voice: enVoice,
      lang: enVoice?.lang ?? 'en-IN',
      rate: 0.94,
      pitch: enPitch,
    },
  ];

  startResumeHack(synth);

  return new Promise<boolean>(resolve => {
    const finish = () => {
      speaking = false;
      stopResumeHack();
      duckMusic(false);
      resolve(true);
    };

    // if TTS silently fails (no voices / blocked), still finish
    let started = false;
    const safety = window.setTimeout(() => {
      if (!started) finish();
    }, 12000);

    lines.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line.text);
      if (line.voice) u.voice = line.voice;
      u.lang = line.lang;
      u.rate = line.rate;
      u.pitch = line.pitch;
      u.volume = 1;
      u.onstart = () => {
        started = true;
      };
      if (i === lines.length - 1) {
        u.onend = () => {
          window.clearTimeout(safety);
          finish();
        };
        u.onerror = () => {
          window.clearTimeout(safety);
          finish();
        };
      }
      synth.speak(u);
    });

    // kick Chrome after queueing
    window.setTimeout(() => {
      try {
        synth.resume();
      } catch {
        /* ignore */
      }
    }, 60);
  });
}
