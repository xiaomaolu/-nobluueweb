import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'sunlit';
type Language = 'en' | 'zh';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, zh: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light' || saved === 'sunlit') return saved as Theme;
    } catch (e) {
      console.warn('localStorage access denied');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (e) {
      console.warn('localStorage access denied');
    }
    return navigator?.language?.startsWith('zh') ? 'zh' : 'en';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sunlit');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sunlit') {
      root.classList.add('sunlit');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    try {
      localStorage.setItem('lang', language);
    } catch (e) {}
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'sunlit';
      return 'light';
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (en: string, zh: string) => {
    return language === 'en' ? en : zh;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, toggleTheme, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
