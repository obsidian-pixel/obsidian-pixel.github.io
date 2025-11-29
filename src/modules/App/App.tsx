/// <reference types="react" />
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { ProjectsPage } from '../../pages/ProjectsPage';
import { PromptLibraryPage } from '../../pages/PromptLibraryPage';
import { Header } from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Footer } from '../../components/Footer/Footer';
import { ColorPickerApp } from '../../components/ColorPicker/ColorPickerApp';
import { ScrollbarBuilderPage } from '../../components/ScrollbarBuilder/ScrollbarBuilderPage';
import styles from './app.module.css';

const { memo } = React;

const AppContent: React.FC = memo(function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={styles.app}>
      <div className={styles.sidebarArea}>
        <Sidebar />
      </div>

      {isHomePage && (
        <div className={styles.headerArea}>
          <Header />
        </div>
      )}

      <main className={styles.contentArea}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/colorpicker" element={<ColorPickerApp />} />
          <Route path="/projects/scrollbar-builder" element={<ScrollbarBuilderPage />} />
          <Route path="/prompts" element={<PromptLibraryPage />} />
        </Routes>
      </main>

      <div className={styles.footerArea}>
        <Footer />
      </div>
    </div>
  );
});

export const App: React.FC = memo(function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
});
