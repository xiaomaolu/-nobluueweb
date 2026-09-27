import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const ICON_BACK = <svg viewBox="0 0 16 16" style={{ width: '14px', height: '14px', fill: 'currentColor', flexShrink: 0 }}><path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" /></svg>;
const ICON_NOTION = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', fill: 'currentColor', display: 'block' }}><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" /></svg>;

export function VibeCoding() {
  const { t } = useAppContext();

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link className="back" to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text3)', textDecoration: 'none', padding: '4px 8px', borderRadius: 'var(--r-sm)', transition: 'background 0.2s, color 0.2s' }}>
            {ICON_BACK} no bluue
          </Link>
          <span className="breadcrumb" style={{ fontSize: '12px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text3)' }}>/</span><span>AI Life</span>
            <span style={{ color: 'var(--text3)' }}>/</span><span>Vibe Coding</span>
            <span style={{ color: 'var(--text3)' }}>/</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>Notion Website Clipper</span>
          </span>
        </div>
      </nav>

      <div className="detail-page">
        <div className="d-hero">
          <div className="d-hero-icon">{ICON_NOTION}</div>
          <div>
            <div className="d-hero-kicker">Vibe Coding</div>
            <h1 className="d-hero-title">Notion Website Clipper</h1>
            <div className="d-hero-badge">
              <span className="d-live-dot"></span>
              Chrome extension · Notion Integration
            </div>
          </div>
        </div>

        <div className="d-card">
          <div className="label label--section">About</div>
          <div className="prose">
            <p>A Notion-integrated Chrome extension designed to capture web content and covers effortlessly.</p>
            <p>Clip what you read on the web directly into your own Notion database — with smart extraction, auto-tagging, and zero friction.</p>
          </div>
        </div>

        <div className="d-card">
          <div className="label label--section">Key Features</div>
          <div className="feat-list">
            <div className="feat-item">
              <span className="feat-num">01</span>
              <div>
                <div className="feat-title">Smart Extraction</div>
                <div className="feat-desc">Automatically identifies body text and cover images from any page.</div>
              </div>
            </div>
            <div className="feat-item">
              <span className="feat-num">02</span>
              <div>
                <div className="feat-title">Auto-Processing</div>
                <div className="feat-desc">Supports auto-tagging and text recognition out of the box.</div>
              </div>
            </div>
            <div className="feat-item">
              <span className="feat-num">03</span>
              <div>
                <div className="feat-title">Customizable</div>
                <div className="feat-desc">Easily configure your own Notion API integration and target database.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-card">
          <div className="label label--section">Privacy Policy</div>
          <div className="privacy">
            <div className="privacy-eff">Effective date: 1 March 2026</div>
            <h3>1. What this Extension does</h3>
            <p>A Notion‑integrated Chrome extension that captures web content and covers from the pages you visit and sends them to your own Notion database via the official Notion API.</p>
            <h3>2. Data we access and process</h3>
            <p><strong style={{ color: 'var(--text2)' }}>Web page content</strong> — selected text, page title, URL, and detected cover images.</p>
            <p><strong style={{ color: 'var(--text2)' }}>Notion metadata</strong> — your target database ID and name, and any user‑defined tags you configure.</p>
            <p><strong style={{ color: 'var(--text2)' }}>Configuration data</strong> — your Notion integration token/API key, database IDs, and extension settings.</p>
            <h3>3. Local storage — no developer server</h3>
            <p>All configuration data is stored locally in your browser via Chrome extension storage APIs. The Extension does not send your data to any server controlled by the developer. The only remote destination is the Notion API endpoint you configure.</p>
            <h3>4. How data is shared</h3>
            <p>The Extension does not sell or rent your data. Data is transferred only to Notion for the core functionality of saving content to your workspace. Data is not used for unrelated purposes or to determine creditworthiness.</p>
            <h3>5. Permissions</h3>
            <p><strong style={{ color: 'var(--text2)' }}>Active tab / host URLs</strong> — to read the page title, URL, body text, and images you choose to save.</p>
            <p><strong style={{ color: 'var(--text2)' }}>Storage</strong> — to save your configuration locally in the browser.</p>
            <h3>6. Your choices and control</h3>
            <p>You can disable or uninstall the Extension at any time from your browser's extension settings. To manage content in Notion, use Notion's own interface.</p>
            <h3>7. Children's privacy</h3>
            <p>This Extension is intended for general productivity use and is not directed to children under 13.</p>
            <h3>8. Changes to this policy</h3>
            <p>Changes will be reflected on this page with an updated "Effective date."</p>
            <h3>9. Contact</h3>
            <p>Questions? Email: <a href="mailto:web3@nobluue.com" style={{ color: 'var(--blue)', textDecoration: 'none' }}>web3@nobluue.com</a></p>
          </div>
        </div>

        <footer className="footer" style={{ marginTop: '28px', textAlign: 'center', fontSize: '11px', color: 'var(--text3)' }}>
          <p>no bluue &nbsp;·&nbsp; Powered by <a href="https://workers.cloudflare.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'none' }}>Cloudflare Workers</a></p>
        </footer>
      </div>
    </>
  );
}
