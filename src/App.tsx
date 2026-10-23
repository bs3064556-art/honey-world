import { useState, useCallback, useEffect } from 'react';
import type { PageId, QuestionAnswers } from './types/birthday';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useHeartTrail } from './hooks/useHeartTrail';

import { PageTransition } from './components/common/PageTransition';
import { MusicToggle } from './components/common/MusicToggle';
import { FloralCurtains } from './components/curtains/FloralCurtains';

import { WelcomePage } from './pages/WelcomePage';
import { StoryPage } from './pages/StoryPage';
import { UnlockPage } from './pages/UnlockPage';
import { PookieWorldPage } from './pages/PookieWorldPage';
import { BirthdayWishPage } from './pages/BirthdayWishPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { LoveNotesPage } from './pages/LoveNotesPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { BirthdayVideoPage } from './pages/BirthdayVideoPage';
import { MysteryGiftPage } from './pages/MysteryGiftPage';
import { PookieMeterPage } from './pages/PookieMeterPage';
import { FinalRevealPage } from './pages/FinalRevealPage';

import './App.css';

function App() {
  // Refresh / reload hamesha starting se (horror → flowers → welcome)
  const [currentPage, setCurrentPage] = useState<PageId>('welcome');
  const [, setIsUnlocked] = useLocalStorage<boolean>('honeyverse_isUnlocked', false);
  const [answers, setAnswers] = useLocalStorage<QuestionAnswers>('honeyverse_answers', {});
  const [openedHearts, setOpenedHearts] = useLocalStorage<string[]>('honeyverse_openedHearts', []);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [curtain, setCurtain] = useState<'closed' | 'opening' | 'gone'>('closed');

  useEffect(() => {
    try {
      window.localStorage.removeItem('honeyverse_currentPage');
      window.localStorage.setItem('honeyverse_isUnlocked', JSON.stringify(false));
    } catch {
      /* ignore */
    }
    setIsUnlocked(false);
  }, [setIsUnlocked]);

  useHeartTrail(true);

  const goToPage = useCallback((pageId: PageId) => {
    if (pageId === 'welcome') {
      setCurtain('closed');
      setIsMusicEnabled(false);
    }
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /** Honey taps horror door — unlocks audio (user gesture) then flowers start */
  const handleHorrorTap = useCallback(() => {
    setIsMusicEnabled(true);
  }, []);

  const handleCurtainOpen = useCallback(() => {
    setCurtain('opening');
  }, []);

  const handleCurtainDone = useCallback(() => setCurtain('gone'), []);

  const handleHeartOpen = useCallback((id: string) => {
    setOpenedHearts(prev => (prev.includes(id) ? prev : [...prev, id]));
  }, [setOpenedHearts]);

  const handleUnlock = useCallback(() => {
    setIsUnlocked(true);
    goToPage('pookie-world');
  }, [setIsUnlocked, goToPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage revealed={curtain !== 'closed'} onNext={() => goToPage('our-story')} />;
      case 'our-story':
        return <StoryPage onNext={() => goToPage('unlock')} />;
      case 'unlock':
        return <UnlockPage onNext={handleUnlock} onNavigate={goToPage} />;
      case 'pookie-world':
        return <PookieWorldPage onNext={() => goToPage('birthday-wish')} onNavigate={goToPage} />;
      case 'birthday-wish':
        return (
          <BirthdayWishPage
            onNext={() => goToPage('questions')}
            onNavigate={goToPage}
          />
        );
      case 'questions':
        return (
          <QuestionsPage
            answers={answers}
            onAnswerChange={setAnswers}
            onNext={() => goToPage('love-notes')}
            onNavigate={goToPage}
          />
        );
      case 'love-notes':
        return (
          <LoveNotesPage
            openedHearts={openedHearts}
            onHeartOpen={handleHeartOpen}
            onNext={() => goToPage('memories')}
            onNavigate={goToPage}
          />
        );
      case 'memories':
        return <MemoriesPage onNext={() => goToPage('birthday-video')} onNavigate={goToPage} />;
      case 'birthday-video':
        return <BirthdayVideoPage onNext={() => goToPage('mystery-gift')} onNavigate={goToPage} />;
      case 'mystery-gift':
        return <MysteryGiftPage onNext={() => goToPage('pookie-meter')} onNavigate={goToPage} />;
      case 'pookie-meter':
        return <PookieMeterPage onNext={() => goToPage('final-reveal')} onNavigate={goToPage} />;
      case 'final-reveal':
        return <FinalRevealPage onNavigate={goToPage} />;
      default:
        return <WelcomePage revealed={curtain !== 'closed'} onNext={() => goToPage('our-story')} />;
    }
  };

  return (
    <div className="honeyverse-app">
      <MusicToggle
        isEnabled={isMusicEnabled}
        onToggle={() => setIsMusicEnabled(!isMusicEnabled)}
      />
      <PageTransition pageKey={currentPage}>
        {renderCurrentPage()}
      </PageTransition>
      {curtain !== 'gone' && (
        <FloralCurtains
          isOpening={curtain === 'opening'}
          onHorrorTap={handleHorrorTap}
          onOpenClick={handleCurtainOpen}
          onDone={handleCurtainDone}
        />
      )}
    </div>
  );
}

export default App;
