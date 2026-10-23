// ============================================================
// HONEYVERSE — Honey photo reel (56 frames, 56 unique captions)
// ============================================================

const TOTAL = 56; // even

/** every frame in the birthday memory video */
export const REEL_PHOTOS: string[] = Array.from({ length: TOTAL }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return `/images/gallery/reel/reel-${n}.jpg`;
});

/** 56 different romantic thoughts — one per frame, no repeats */
const CAPTIONS = [
  'Your smile… and my heart goes soft 💗',
  'Even in this photo, you are my favourite story 📖',
  'In the mountains, and in my heart — just you 🏔️',
  'Looking at you makes the world feel kinder 🌍',
  'My shy Honey… why are you this cute? 🥹',
  'I want to keep this moment forever ✨',
  'Your eyes are where I find my peace 🤍',
  'Every frame is you, every beat is my heart 💓',
  'Without you this day would feel incomplete 🎂',
  'Soft light, softer you… perfect combo 🌅',
  'I am lucky I found you 🍀',
  'Your laugh makes the whole day better 😊',
  'This look… straight to the heart 💘',
  'My birthday boy, you are the most special 🎁',
  'A little wind, a little love… and you 🍃',
  'One glance and I go “aww” 🥺',
  'Favourite chapter of our story: you 📚',
  'That shy smile — I am so gone for it 😌',
  'From here to forever — together ♾️',
  'Your presence is my comfort zone 🧸',
  'Nature is beautiful… you are more 🌿',
  'So much love hidden in this glance 💕',
  'Every trip feels right with you 🧳',
  'My heart says — stay right here 🫶',
  'You are my favourite notification 📱',
  'Any background… my focus is you 📸',
  'To me, you = home 🏠',
  'So calm, so cute… my Honey 🍯',
  'This photo and I fall for you again 😍',
  'A smile as soft as your words 💬',
  'I am always proud of you 🌟',
  'On your birthday, one wish — stay happy 🕯️',
  'Time with you feels fast and slow at once ⏳',
  'This pose? Absolute softie energy 🐣',
  'My heart’s default wallpaper: you 🖼️',
  'Every look adds a little more love 💗',
  'You are shy… still I will say it boldly: I love you 💌',
  'Mountains, sky, and you — full cinematic 🎬',
  'Behind this smile is my favourite person 🥰',
  'Without you the surprise feels incomplete 🎀',
  'A small photo, a big feeling 💭',
  'Looking at you I think — yes, this is it 💍',
  'My soft boy, Happy Birthday 🎈',
  'This frame is a page from my diary 🗒️',
  'Your calm vibe… my favourite kind of peace 😌',
  'Walking together, laughing together — that’s enough 🚶',
  'For you, my heart always says yes ✅',
  'This look melts me every time 🫠',
  'My Honey… you are my everyday magic 🪄',
  'The photo ends, the feeling doesn’t 💫',
  'The future looks soft pink with you 🌸',
  'One glance, a thousand butterflies 🦋',
  'You are my always, never a sometimes 💞',
  'This birthday, my gift is my whole heart 💝',
  'Last frames are you… first thought is you 🏁',
  'Happy Birthday, my forever Honey 💗🎂',
];

if (CAPTIONS.length !== TOTAL) {
  throw new Error(`REEL captions must be ${TOTAL}, got ${CAPTIONS.length}`);
}

export const REEL_CONTENT = {
  heading: 'Happy Birthday, Honey! 🎂💗',
  subtitle: 'Every photo of you… a soft line from my heart',
  frameMs: 2800,
  captions: CAPTIONS,
};
