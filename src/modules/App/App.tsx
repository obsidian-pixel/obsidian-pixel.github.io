/// <reference types="react" />
import * as React from 'react';
const { useEffect } = React;
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollButton } from '../../components/ScrollButton/Scroll-Button';
import { HomePage } from '../../pages/HomePage';
import { ProjectsPage } from '../../pages/ProjectsPage';
import { PromptLibraryPage } from '../../pages/PromptLibraryPage';

const { lazy, Suspense } = React;
const Sidebar = lazy(() => import('../../components/Sidebar/Sidebar'));

const AppContent: React.FC = () => {
  const location = useLocation();
  const showHeader = location.pathname === '/';

  return (
    <div className={styles.app}>
      {showHeader && (
        <div className={styles.headerArea}>
          <Header />
        </div>
      )}
      <div className={styles.sidebarArea}>
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/prompts" element={<PromptLibraryPage />} />
        </Routes>
      </div>
      <div className={styles.footerArea}>
        <Footer />
      </div>
      <ScrollButton />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};