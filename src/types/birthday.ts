// ============================================================
// HONEYVERSE — Shared TypeScript Types
// ============================================================

export type PageId =
  | 'welcome'
  | 'our-story'
  | 'unlock'
  | 'pookie-world'
  | 'birthday-wish'
  | 'questions'
  | 'love-notes'
  | 'memories'
  | 'birthday-video'
  | 'mystery-gift'
  | 'pookie-meter'
  | 'final-reveal';

export interface PageConfig {
  id: PageId;
  emoji: string;
  label: string;
}

export type HeartSurpriseKind =
  | 'bouquet'
  | 'dance'
  | 'kiss'
  | 'hug'
  | 'cake'
  | 'balloons'
  | 'letter'
  | 'ring'
  | 'cuddle'
  | 'stars'
  | 'butterfly'
  | 'moon';

export interface HeartSurprise {
  id: string;
  kind: HeartSurpriseKind;
  label: string;
  message: string;
  /** soft tint for the closed heart */
  tint: string;
}

export interface LoveNote {
  id: string;
  emoji: string;
  title: string;
  message: string;
  isSecret?: boolean;
}

export interface MemoryCard {
  id: string;
  src: string;
  alt: string;
  caption: string;
  subCaption?: string;
  rotation?: number;
}

export interface Question {
  id: string;
  flower: string;
  question: string;
  type: 'options' | 'text' | 'textarea' | 'options-with-text';
  options?: string[];
  placeholder?: string;
}

export interface WishOption {
  id: string;
  emoji: string;
  text: string;
}

export interface QuestionAnswers {
  [questionId: string]: string | string[];
}

export interface BirthdayWish {
  selectedWishId: string | null;
  customWish: string;
}

export interface AppState {
  currentPage: PageId;
  isUnlocked: boolean;
  isCurtainOpen: boolean;
  wish: BirthdayWish;
  answers: QuestionAnswers;
  openedHearts: string[];
  pookieMeterValue: number;
  isMusicEnabled: boolean;
}
