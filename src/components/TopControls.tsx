import { Moon, Sun, Trees } from 'lucide-react';
import { useAppContext } from '../AppContext';

export function TopControls() {
  const { theme, setTheme, language, setLanguage } = useAppContext();

  return (
    <>
      <div className="top-controls-left">
        <div className="lang-toggle" role="group" aria-label="Language">
          <button
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button
            className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
            onClick={() => setLanguage('zh')}
          >
            中
          </button>
        </div>
      </div>
      <div className="top-controls-right">
        <div className="theme-toggle-group" role="group" aria-label="Theme">
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
            title="Light Mode"
          >
            <Sun className="w-[15px] h-[15px]" />
          </button>
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
            title="Dark Mode"
          >
            <Moon className="w-[15px] h-[15px]" />
          </button>
          <button
            className={`theme-btn ${theme === 'sunlit' ? 'active' : ''}`}
            onClick={() => setTheme('sunlit')}
            title="Sunlit Mode"
          >
            <Trees className="w-[15px] h-[15px]" />
          </button>
        </div>
      </div>
    </>
  );
}
