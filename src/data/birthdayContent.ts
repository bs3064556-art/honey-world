// ============================================================
// HONEYVERSE — Central Birthday Content Configuration
// Edit all your personal messages here! 💗
// ============================================================

import type { HeartSurprise, LoveNote, MemoryCard, Question, WishOption, PageConfig } from '../types/birthday';

export const CONFIG = {
  boyfriendName: 'Honey',
  myName: 'Pooja',
  birthdayDate: 'November 2',
  birthdayMonth: 10, // 0 = January … 10 = November (used by the calendar + countdown)
  birthdayDay: 2,
  /** DOB for age + cake candles (2 Nov 2000) */
  birthYear: 2000,
  // 🔐 PATTERN LOCK: Edit the correct pattern here.
  // Nodes are numbered 0–8, left-to-right, top-to-bottom:
  // [ 0 | 1 | 2 ]
  // [ 3 | 4 | 5 ]
  // [ 6 | 7 | 8 ]
  correctPattern: [0, 1, 2, 5, 8, 7, 6], // L-shape going around the top
};

/**
 * Year of life starting on this birthday.
 * DOB 2 Nov 2000 → in 2026 he completed 26 years, so the 27th year begins.
 * Candles on the cake use this number.
 */
export function getHoneyAge(asOf: Date = new Date()): number {
  return asOf.getFullYear() - CONFIG.birthYear + 1;
}

export const PAGES: PageConfig[] = [
  { id: 'welcome',      emoji: '🌷', label: 'Welcome'   },
  { id: 'unlock',       emoji: '🔐', label: 'Unlock'    },
  { id: 'pookie-world', emoji: '🧸', label: 'Pookie World' },
  { id: 'birthday-wish',emoji: '🎂', label: 'Birthday Wish' },
  { id: 'questions',    emoji: '💌', label: 'Questions'  },
  { id: 'love-notes',   emoji: '💗', label: 'Love Notes' },
  { id: 'memories',     emoji: '📸', label: 'Memories'   },
  { id: 'birthday-video', emoji: '🎬', label: 'Birthday Video' },
  { id: 'mystery-gift', emoji: '🎁', label: 'Gift'       },
  { id: 'pookie-meter', emoji: '😊', label: 'Pookie Meter'},
  { id: 'final-reveal', emoji: '❤️', label: 'Final Reveal'},
];

// ——————————————————————————————————————————————
// PAGE 1 — FLORAL CURTAINS
// ——————————————————————————————————————————————
// Closed rose curtain: only a "tap to open" button is shown on it.
export const CURTAIN_CONTENT = {
  teaser: 'Just one tap… and our world will open 🌹',
  buttonInitial: '🌹',
  buttonText: 'TAP TO OPEN',
};

// Revealed in the middle once the roses part to the left and right.
export const WELCOME_CONTENT = {
  welcome: 'Welcome',
  name: 'Honey!',
  lines: [
    'Today belongs only to you! 🎂',
    'So I built a little world… just for you... 🌹',
    'Shall we step inside? 🤭💗',
  ],
  buttonText: 'Come inside',
};

// ——————————————————————————————————————————————
// PAGE 2 — PATTERN LOCK
// ——————————————————————————————————————————————
export const PATTERN_LOCK_CONTENT = {
  heading: 'Trying to walk straight in? 😏',
  subheading: 'Unlock your pookie pass first!',
  hint: "Let's see how smart you are, birthday boy! 😂❤️",
  successMessage: 'YESSS! UNLOCKED! 😭💗',
  successSub: "When did you get this smart? Fine — it's your birthday, you're in! 😂🧸",
  errorMessage: 'Come on, birthday boy! 😂 Try a little harder, pookie! 💗',
  skipButtonText: "I'll just walk in 😂",
  continueButtonText: "LET'S GO IN 💗",
};

// ——————————————————————————————————————————————
// PAGE 3 — POOKIE WORLD HEART SURPRISES
// ——————————————————————————————————————————————
export const POOKIE_WORLD_CONTENT = {
  heading: "Welcome to Honey's Pookie World! 💗",
  subtitle: 'Only three rules here...',
  rule1: 'Smiling is compulsory 😌💗',
  rule2: 'No sulking allowed today! 😤→😊',
  rule3: 'Missing Pooja is not optional! 😂💋',
  hint: 'Tap each heart with the hammer… something pops out! 🔨✨',
};

/** Labels stay mysterious — no spoilers on the hearts themselves */
export const HEART_SURPRISES: HeartSurprise[] = [
  {
    id: 'bouquet',
    kind: 'bouquet',
    label: 'Heart 1',
    message: 'For you… just this — you are special. 🌹',
    tint: '#ff6b9d',
  },
  {
    id: 'dance',
    kind: 'dance',
    label: 'Heart 2',
    message: 'Today belongs to us… shall we dance a little? 🎵',
    tint: '#e86f98',
  },
  {
    id: 'kiss',
    kind: 'kiss',
    label: 'Heart 3',
    message: 'Catch this soft one from me… 😚',
    tint: '#ff4d7a',
  },
  {
    id: 'hug',
    kind: 'hug',
    label: 'Heart 4',
    message: 'Come here first… a tight hug is pending! 🤗',
    tint: '#f06292',
  },
  {
    id: 'cake',
    kind: 'cake',
    label: 'Heart 5',
    message: 'A celebration is a must, boss! 🎉✨',
    tint: '#ff8fb1',
  },
  {
    id: 'balloons',
    kind: 'balloons',
    label: 'Heart 6',
    message: 'Look up… the whole sky is in your name today! 💗',
    tint: '#d9567f',
  },
  {
    id: 'letter',
    kind: 'letter',
    label: 'Heart 7',
    message: 'Sweet tooth? Here — all the chocolates are yours! 🍫',
    tint: '#c2185b',
  },
  {
    id: 'ring',
    kind: 'ring',
    label: 'Heart 8',
    message: 'I want to celebrate this day with you every year… forever. ✨',
    tint: '#ad1457',
  },
  {
    id: 'cuddle',
    kind: 'cuddle',
    label: 'Heart 9',
    message: 'Soft petals, soft heart… just you. 💕',
    tint: '#e91e63',
  },
  {
    id: 'stars',
    kind: 'stars',
    label: 'Heart 10',
    message: 'Every night with you feels a little magical. 🌟',
    tint: '#ff5c8a',
  },
  {
    id: 'butterfly',
    kind: 'butterfly',
    label: 'Heart 11',
    message: 'Butterflies every time I come near you… every single time. 🦋',
    tint: '#ff7aad',
  },
  {
    id: 'moon',
    kind: 'moon',
    label: 'Heart 12',
    message: 'Even the moon would blush at love this soft… yours. 🌙',
    tint: '#e8457a',
  },
];

// ——————————————————————————————————————————————
// PAGE 4 — BIRTHDAY WISH
// ——————————————————————————————————————————————
export const BIRTHDAY_WISH_CONTENT = {
  heading: 'Finally! Birthday Cake Time! 🎂💗',
  instruction: 'Honey, close your eyes… make a wish from the heart! ✨',
  makeWishButton: 'MAKE A WISH ✨',
  afterWishMessage: 'May every wish of yours come true. 🥹❤️',
  afterWishSub: 'Just save one tiny piece of cake for me! 😂🎂',
  questionLabel: 'What is your heart wishing for this birthday, my Honey? 💭💗',
  saveButton: 'Save My Wish 💌',
  savedMessage: '✨ Wish saved! May it come true! 🌷',
};

export const WISH_OPTIONS: WishOption[] = [
  { id: 'forever',  emoji: '💍', text: 'To stay with you always… forever kind of love' },
  { id: 'us',       emoji: '💗', text: 'Just our little world — nothing else needed' },
  { id: 'memories', emoji: '🌙', text: 'Every evening, every hug, every little talk with you' },
  { id: 'heart',    emoji: '💌', text: 'Your heart stays mine… that is all I wish' },
];

// ——————————————————————————————————————————————
// PAGE 5 — PERSONAL QUESTIONS
// ——————————————————————————————————————————————
export const QUESTIONS_CONTENT = {
  heading: 'A Little Something 💌',
  subheading: 'Every flower hides a question...',
  thankYouMessage: 'Thank you, Honey! 🥹❤️',
  thankYouSub: 'Your answers are a tiny treasure to me. 💌',
};

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    flower: '🌸',
    question: 'Honey, how do you feel being with me? 🥹💗',
    type: 'options',
    options: [
      'Happy and comfortable 😊',
      'Loved and understood ❤️',
      'Silly and playful with you 😂',
      'All of the above! 🥹💗',
      "I'll say it in my own words 💌",
    ],
  },
  {
    id: 'q2',
    flower: '🌺',
    question: 'Which of my habits do you love the most? 🤭',
    type: 'options-with-text',
    options: [
      'When I bother you 😂',
      'When I take care of you 🥹',
      'My smile 😊',
      'My cute little talks 💗',
    ],
    placeholder: 'Or write something else... 💌',
  },
  {
    id: 'q3',
    flower: '🌼',
    question: 'Which memory of us still makes you smile today? 📸💗',
    type: 'textarea',
    placeholder: 'Write your favourite memory here... 🥹',
  },
  {
    id: 'q4',
    flower: '🌷',
    question: 'If you had to give me a cute nickname, what would it be? 🤭🎀',
    type: 'text',
    placeholder: 'Any name! 🥹💗',
  },
  {
    id: 'q5',
    flower: '💐',
    question: 'One thing you want to tell me… but maybe haven’t said yet... 💌',
    type: 'textarea',
    placeholder: 'Write from the heart, just between us... 🤍',
  },
];

// ——————————————————————————————————————————————
// PAGE 6 — LOVE NOTES / HEART CARDS
// ——————————————————————————————————————————————
export const LOVE_NOTES_CONTENT = {
  heading: 'Little Things I Love About You... 🥹❤️',
  subtitle: 'Honestly the list is endless, Honey! 😂💗',
  subtitle2: 'But let’s reveal a few secrets...',
  allOpenedMessage: 'See, Honey? You’re my favourite notification and my favourite person! 😂💗',
  instruction: 'Click every heart! 💗',
};

export const LOVE_NOTES: LoveNote[] = [
  {
    id: 'ln1',
    emoji: '😊',
    title: 'Your Smile',
    message: 'Your smile instantly makes my mood better.',
  },
  {
    id: 'ln2',
    emoji: '🥹',
    title: 'Your Caring Nature',
    message: 'Your little caring ways mean everything to me.',
  },
  {
    id: 'ln3',
    emoji: '😂',
    title: 'You Make Me Laugh',
    message: 'Even normal talks become funny with you.',
  },
  {
    id: 'ln4',
    emoji: '📸',
    title: 'Our Little Moments',
    message: 'Sometimes the smallest memory makes my heart so happy.',
  },
  {
    id: 'ln5',
    emoji: '🤍',
    title: 'Your Presence',
    message: 'Simple moments feel special when you are there.',
  },
  {
    id: 'ln6',
    emoji: '🧸',
    title: 'Just Being YOU',
    message: 'You never need to be anyone else. You are special as you are.',
  },
  {
    id: 'ln7',
    emoji: '✨',
    title: '🎀 A Little Secret...',
    message: 'I am so lucky you are in my life. Thank you, Honey. 🥹💗',
  },
  {
    id: 'ln8',
    emoji: '🌙',
    title: 'Late Night Talks',
    message: 'Those quiet night messages… it feels like the world pauses and only we remain.',
  },
  {
    id: 'ln9',
    emoji: '💕',
    title: 'My Safe Place',
    message: 'Coming to you makes my heart lighter. You are my favourite peace, Honey.',
  },
  {
    id: 'ln10',
    emoji: '💻',
    title: 'My Shy Coder',
    message: 'Behind all that quiet code is the softest heart I know. I fell for that shy smile, Honey. 💗',
  },
  {
    id: 'ln11',
    emoji: '☕',
    title: 'Quiet Comfort',
    message: 'Sitting quietly with you feels like talking. So much calm… 🥹🤍',
  },
  {
    id: 'ln12',
    emoji: '🌈',
    title: 'My Everyday Softness',
    message: 'One soft word from you lightens my whole day. You are my favourite calm. 🌈💗',
  },
];

// ——————————————————————————————————————————————
// PAGE 7 — MEMORIES / POLAROID GALLERY
// ——————————————————————————————————————————————
export const MEMORIES_CONTENT = {
  heading: 'Our Little Memories 📸🌷',
  bottomMessage: 'Photos only show the moments...',
  bottomSub: 'But the feeling behind them is ours alone. 🥹❤️',
};

// 📌 Photos in public/images/gallery/photo-1…6.jpg (even count)
export const MEMORIES: MemoryCard[] = [
  { id: 'm1', src: '/images/gallery/photo-1.jpg', alt: 'Honey on the mountain road', caption: 'My blessed boy in the mountains 💗', subCaption: '🏔️', rotation: -3 },
  { id: 'm2', src: '/images/gallery/photo-2.jpg', alt: 'Honey looking at the mountains', caption: 'You watching the view… me watching you 🥹', subCaption: '🌄', rotation: 2 },
  { id: 'm3', src: '/images/gallery/photo-3.jpg', alt: 'Honey thumbs up in the hills', caption: 'Double thumbs up = double cute 😂❤️', subCaption: '👍', rotation: -1 },
  { id: 'm4', src: '/images/gallery/photo-4.jpg', alt: 'Honey by the carved pillar', caption: 'Keeping this moment forever 📸', subCaption: '✨', rotation: 3 },
  { id: 'm5', src: '/images/gallery/photo-5.jpg', alt: 'Honey by the mossy rocks', caption: 'Nature + Honey = perfect combo 🌿', subCaption: '🪨', rotation: -2 },
  { id: 'm6', src: '/images/gallery/photo-6.jpg', alt: 'Honey overlooking the valley', caption: 'Happy Birthday, Honey! 🎂💗', subCaption: '🎂', rotation: 1 },
];

// ——————————————————————————————————————————————
// PAGE 8 — MYSTERY GIFT
// ——————————————————————————————————————————————
export const MYSTERY_GIFT_CONTENT = {
  heading: 'Okay Honey...',
  subheading: 'One last surprise is waiting! 👀🎁',
  question: 'Ready to open your mystery gift?',
  buttonText: 'OPEN MY GIFT 🎁💗',
  revealMessage: 'Surpriseee! 🎉💗',
  revealSub: 'Big or small — the love behind a gift is what makes it special. 🥹🌷',
};

// ——————————————————————————————————————————————
// BONUS PAGE — POOKIE METER
// ——————————————————————————————————————————————
export const POOKIE_METER_CONTENT = {
  heading: 'How Much Are You Blushing, Birthday Boy? 🤭💗',
  loading: 'Loading...',
  levels: [
    { min: 0,   max: 10,  emoji: '😎', message: "I'm not shy at all!" },
    { min: 11,  max: 30,  emoji: '🙂', message: 'Okay… maybe a little! 🤭' },
    { min: 31,  max: 55,  emoji: '🥹', message: 'Honey… your cheeks are pink! 😂💗' },
    { min: 56,  max: 75,  emoji: '😳', message: 'Stop… your cheeks are on fire! 😭❤️' },
    { min: 76,  max: 99,  emoji: '🥵', message: 'POOKIE OVERLOAD! 🧸💗' },
    { min: 100, max: 100, emoji: '💗', message: 'MAXIMUM POOKIE MODE ACTIVATED! 🧸💗✨' },
  ],
};

// ——————————————————————————————————————————————
// PAGE 10 — FINAL FLOWER REVEAL
// ——————————————————————————————————————————————
export const FINAL_REVEAL_CONTENT = {
  teaser: 'Honey...',
  teaserSub: 'I had one last thing to tell you. 🥹💗',
  buttonText: 'OPEN YOUR LAST SURPRISE 🌷',
  hugButtonText: 'HUG ME ONE MORE TIME 🧸❤️',
  afterHugMessage: 'The surprise ends… but my love for you never will! 🤭💗',
  // ✏️ Edit the love letter here:
  loveLetter: `Happy Birthday, Honey. ❤️

I need you to hear this clearly — I didn't just like you. I fell for you. Hard. Softly. Completely. And today, on your birthday, I want every word to land in your heart like a promise.

You walked into my world like a quiet storm… and somehow you stayed. Conversations turned into comfort. Comfort turned into care. Care turned into this love I can't pretend is small. I am so proudly, wildly, deeply in love with you.

Today is YOUR day. Not shared. Not half. Yours. So take this soft kiss, this tight hug, and every bit of my care — all of it belongs to you. I hope you feel chosen. I hope you feel safe. I hope you feel loved in the boldest, warmest way.

I wish you a year that rises with you — success that finds you, peace that stays with you, and joy that never runs out. Dream louder. Believe harder. Keep that smile that undoes me every single time. No matter the ups and downs, I want you standing tall, soft-hearted, and never alone.

Thank you for being the most special part of my life — for the quiet talks, the laughs, the little moments that somehow became everything. You are not just in my story. You are the part I never want to rewrite.

So here's my birthday wish for you, Honey:
May you be happy. May you be loved. May you be endlessly proud of the man you are becoming.
And may you always feel my arms, my heart, and my love wrapped around every version of you.

Happy Birthday once again.
I love you — boldly, beautifully, and without pause. 💗

Yours,
Pooja 🌷❤️`,
};
