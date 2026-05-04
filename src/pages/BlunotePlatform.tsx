import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../AppContext';
import { BLUNOTE_PRIVACY_POLICY, BLUNOTE_TERMS_OF_SERVICE } from '../constants/blunoteLegal';

const ICON_BACK = <svg viewBox="0 0 16 16" style={{ width: '14px', height: '14px', fill: 'currentColor', flexShrink: 0 }}><path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" /></svg>;

export function BlunotePlatform() {
  const { platform } = useParams();
  const { t } = useAppContext();

  const isWindows = platform === 'windows';
  const platformName = isWindows ? 'Windows' : 'macOS';
  const icon = isWindows ? '🪟' : '🍎';
  const downloadUrl = isWindows 
    ? "https://download.nobluue.com/Win-Blunote.Setup.0.1.23_2.exe"
    : "https://download.nobluue.com/Blunote-0.1.23-arm64.dmg";
  const downloadLabel = isWindows ? "Download .exe" : "Download .dmg";

  const markdownComponents = {
    h1: ({ children }: any) => (
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)', marginBottom: '24px', letterSpacing: '-0.02em' }}>{children}</h1>
    ),
    h2: ({ children }: any) => {
      const content = Array.isArray(children) ? children[0] : children;
      if (typeof content === 'string' && /^\d+\./.test(content)) {
        const dotIndex = content.indexOf('.');
        const number = content.substring(0, dotIndex + 1);
        const title = content.substring(dotIndex + 1).trim();
        return (
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginTop: '40px', marginBottom: '16px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ color: 'var(--blue)', minWidth: '24px' }}>{number}</span>
            <span style={{ color: 'var(--text)' }}>{title}</span>
          </h2>
        );
      }
      return <h2 style={{ fontSize: '18px', fontWeight: 700, marginTop: '40px', marginBottom: '16px' }}>{children}</h2>;
    },
    p: ({ children }: any) => {
      const content = Array.isArray(children) ? children[0] : children;
      if (typeof content === 'string' && content.startsWith('Last updated:')) {
        return <p style={{ fontStyle: 'italic', color: 'var(--text3)', fontSize: '14px', marginBottom: '32px' }}>{children}</p>;
      }
      return <p style={{ marginBottom: '16px', lineHeight: '1.75' }}>{children}</p>;
    },
    a: ({ children, ...props }: any) => (
      <a {...props} style={{ color: 'var(--blue)', textDecoration: 'underline', fontWeight: 500, transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>{children}</a>
    ),
    li: ({ children }: any) => (
      <li style={{ marginBottom: '10px', paddingLeft: '4px', listStylePosition: 'outside' }}>{children}</li>
    ),
    ul: ({ children }: any) => (
      <ul style={{ paddingLeft: '24px', marginBottom: '20px', listStyleType: 'disc' }}>{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol style={{ paddingLeft: '24px', marginBottom: '20px' }}>{children}</ol>
    )
  };

  return (
    <>
      <style>{`
        .markdown-body ul li::marker {
          color: var(--blue);
          font-weight: 700;
        }
      `}</style>
      <nav className="top-nav">
        <div className="nav-inner" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link className="back" to="/blunote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text3)', textDecoration: 'none', padding: '4px 8px', borderRadius: 'var(--r-sm)', transition: 'background 0.2s, color 0.2s' }}>
            {ICON_BACK} Blunote
          </Link>
          <span className="breadcrumb" style={{ fontSize: '12px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text3)' }}>/</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>{platformName}</span>
          </span>
        </div>
      </nav>

      <div className="detail-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px 100px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        <div className="d-hero" style={{ alignItems: 'center', textAlign: 'center', flexDirection: 'column', gap: '24px' }}>
          <div style={{ fontSize: '64px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }}>{icon}</div>
          <div style={{ maxWidth: '580px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.03em' }}>Blunote for {platformName}</h1>
            <p style={{ color: 'var(--text2)', fontSize: '17px', lineHeight: 1.6 }}>
              {isWindows 
                ? "Seamless, secure note-taking for Windows. Your digital garden, perfectly synced and locally controlled." 
                : "A high-performance, native experience for macOS. The ultimate sanctuary for your thoughts and ideas."}
            </p>
          </div>
          
          <a 
            href={downloadUrl} 
            className="download-btn"
            style={{ 
              textDecoration: 'none', 
              padding: '14px 40px', 
              background: 'var(--blue)', 
              color: 'white', 
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              marginTop: '12px',
              boxShadow: '0 8px 24px rgba(36, 65, 255, 0.25)'
            }} 
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(36, 65, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(36, 65, 255, 0.25)';
            }}
            download
          >
            {downloadLabel}
          </a>
        </div>

        <div className="legal-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
          <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{t('Privacy & Terms', '隐私政策与服务条款')}</h2>
            <p style={{ fontSize: '14px', color: 'var(--text3)', marginTop: '8px' }}>{t('Please review our policies carefully.', '在使用应用前，请仔细阅读我们的政策条款。')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <section className="legal-section" style={{ background: 'var(--bg2)', borderRadius: '24px', padding: '48px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div className="markdown-body" style={{ color: 'var(--text2)' }}>
                <ReactMarkdown components={markdownComponents}>{BLUNOTE_PRIVACY_POLICY}</ReactMarkdown>
              </div>
            </section>

            <section className="legal-section" style={{ background: 'var(--bg2)', borderRadius: '24px', padding: '48px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div className="markdown-body" style={{ color: 'var(--text2)' }}>
                <ReactMarkdown components={markdownComponents}>{BLUNOTE_TERMS_OF_SERVICE}</ReactMarkdown>
              </div>
            </section>
          </div>
        </div>

        <footer style={{ textAlign: 'center', padding: '20px 0' }}>
            <Link to="/blunote" style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '12px' }}>
                Back to all downloads
            </Link>
        </footer>
      </div>
    </>
  );
}
