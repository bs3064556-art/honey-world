// ============================================================
// HONEYVERSE — "Our Story": the whole journey, played like a memory
// ============================================================

export type SpriteKind = 'ride' | 'walk';

export interface StoryChapter {
  id: string;
  title: string;
  caption: string;
  image: string;
  sprite?: { kind: SpriteKind; src: string };
  sticker?: string;
}

const IMG = '/images/story';
const STK = '/images/stickers';

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'office',
    title: 'That first glance at the office',
    caption: 'On an ordinary office day… I saw you, and everything felt a little more special. ☕💕',
    image: `${IMG}/1-office.jpg`,
    sticker: `${STK}/anime-1.png`,
  },
  {
    id: 'chat',
    title: 'Then the talks began',
    caption: 'You arrived like a senior developer… and somehow you became serious in my heart. First a "hi", then you became my favourite conversation. 💻💕',
    image: `${IMG}/2-chat.jpg`,
    sticker: `${STK}/anime-6.png`,
  },
  {
    id: 'ride',
    title: 'Scooty ride to Morni Hills',
    caption: 'I drove, you sat behind… mountain roads, cool air, and your laugh. Everything was perfect. 🛵🌄',
    image: `${IMG}/3-ride-bg.jpg`,
    sprite: { kind: 'ride', src: `${IMG}/ride-sprite.png` },
    sticker: `${STK}/anime-2.png`,
  },
  {
    id: 'hug',
    title: 'Where our love story began',
    caption: 'In the soft evening light, when you held me… it felt like the world paused right there. 🤗🌙',
    image: `${IMG}/4-hug.jpg`,
    sticker: `${STK}/anime-8.png`,
  },
  {
    id: 'kiss',
    title: 'That first kiss',
    caption: 'Just us, that little soft kiss, and the biggest heartbeat of my life. I will never forget it. 💋✨',
    image: `${IMG}/5-kiss.jpg`,
    sticker: `${STK}/anime-4.png`,
  },
  {
    id: 'walk',
    title: 'Those walks after office',
    caption: 'Leaving work hand in hand… petals, dusk, and just the two of us. 🌸',
    image: `${IMG}/6-walk-bg.jpg`,
    sprite: { kind: 'walk', src: `${IMG}/walk-sprite.png` },
    sticker: `${STK}/anime-5.png`,
  },
  {
    id: 'tickle',
    title: 'When I tease you',
    caption: 'I keep teasing you… you get so ticklish, and you blush so much my heart melts. My shy pookie! 🤍😊',
    image: `${IMG}/7-dropoff.jpg`,
    sticker: `${STK}/anime-3.png`,
  },
  {
    id: 'fed',
    title: 'From your own hands',
    caption: 'You feeding me with your own hands… I can never forget that. 🤍',
    image: `${IMG}/10-movie.jpg`,
    sticker: `${STK}/anime-7.png`,
  },
  {
    id: 'park',
    title: 'Hours in the park',
    caption: 'We sat in the park for hours… no rush, just cool air and time with you. 🌳⏳',
    image: `${IMG}/6-walk-bg.jpg`,
    sprite: { kind: 'walk', src: `${IMG}/walk-sprite.png` },
    sticker: `${STK}/anime-5.png`,
  },
  {
    id: 'propose',
    title: 'And a little proposal',
    caption: 'Today I ask… will you stay with me, always? 🌹💍',
    image: `${IMG}/9-propose.jpg`,
  },
];

export const STORY_FINALE = {
  title: 'Happy Birthday, Honey! 🎂',
  caption: 'Honey, you are my favourite story. Happy Birthday — I love you! ♾️💗',
};

export const CHAPTER_MS = 9000;
