import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const ICON_BACK = <svg viewBox="0 0 16 16" style={{ width: '14px', height: '14px', fill: 'currentColor', flexShrink: 0 }}><path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" /></svg>;

export function BlunoteSupport() {
  const { t } = useAppContext();

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link className="back" to="/blunote" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text3)', textDecoration: 'none', padding: '4px 8px', borderRadius: 'var(--r-sm)', transition: 'background 0.2s, color 0.2s' }}>
            {ICON_BACK} Blunote
          </Link>
          <span className="breadcrumb" style={{ fontSize: '12px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text3)' }}>/</span><span>Blunote</span>
            <span style={{ color: 'var(--text3)' }}>/</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>Support</span>
          </span>
        </div>
      </nav>

      <div className="detail-page" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '36px 20px 80px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="d-card" style={{ padding: '32px 24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text)', marginBottom: '16px' }}>Blunote Support</h1>
          <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '24px' }}>
            {t('If you encounter any issues or have questions regarding Blunote, please feel free to reach out to our support team.', '如果您在使用 Blunote 过程中遇到任何问题或有任何疑问，请随时联系我们的支持团队。')}
          </p>
          
          <div style={{ padding: '20px', background: 'var(--glass)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('Contact Email', '联系邮箱')}</div>
            <a href="mailto:note@nobluue.com" style={{ fontSize: '18px', fontWeight: 500, color: 'var(--blue)', textDecoration: 'none' }}>
              note@nobluue.com
            </a>
          </div>
        </div>

        <footer className="footer" style={{ marginTop: '28px', textAlign: 'center', fontSize: '11px', color: 'var(--text3)' }}>
          <p>no bluue &nbsp;·&nbsp; Powered by <a href="https://workers.cloudflare.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'none' }}>Cloudflare Workers</a></p>
        </footer>
      </div>
    </>
  );
}
