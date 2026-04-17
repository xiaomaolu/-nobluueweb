import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { PricePanel } from '../components/PricePanel';
import { FishLayer } from '../components/FishLayer';

const ICON_X = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '15px', height: '15px', fill: 'currentColor', display: 'block', flexShrink: 0 }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>;
const ICON_TG = <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ width: '15px', height: '15px', fill: 'currentColor', display: 'block', flexShrink: 0 }}><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" /></svg>;
const ICON_DC = <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ width: '15px', height: '15px', fill: 'currentColor', display: 'block', flexShrink: 0 }}><path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" /></svg>;
const ICON_NOTION = <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', fill: 'currentColor', display: 'block' }}><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" /></svg>;
const ICON_BLUNOTE = <svg width="32" height="31" viewBox="0 0 106 101" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}><path d="M36 65C36 46.2223 51.2223 31 70 31H104V65C104 83.7777 88.7777 99 70 99H36V65Z" fill="#2441FF" /><path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#2441FF" /><path d="M36 5C36 2.23858 38.2386 0 41 0H101C103.761 0 106 2.23858 106 5V19C106 21.7614 103.761 24 101 24H41C38.2386 24 36 21.7614 36 19V5Z" fill="#2441FF" /><path d="M12 31C18.6274 31 24 36.3726 24 43V89C24 95.6274 18.6274 101 12 101C5.37258 101 0 95.6274 0 89V43C0 36.3726 5.37258 31 12 31Z" fill="#2441FF" /></svg>;

export function Home() {
  const { t } = useAppContext();

  return (
    <>
      <FishLayer />
      <div className="layout">
        <div className="main-col">
          {/* Hero */}
          <div className="card hero-card animate-rise" style={{ marginBottom: '12px' }}>
            <div className="hero-inner">
              <div className="avatar-wrap">
                <img
                  className="avatar"
                  src="https://pbs.twimg.com/profile_images/2021502946949857282/M8xKPJUU_400x400.jpg"
                  alt="avatar"
                  onError={(e) => { (e.target as HTMLImageElement).style.background = '#e8e5f0'; }}
                />
                <span className="online-dot"></span>
              </div>
              <div className="hero-text">
                <h1 className="name">no <em className="glitch" data-text="bluue">bluue</em></h1>
                <div className="tagline">
                  <span className="tag-pill">
                    {t('AI Adventist', 'AI 降临派')}
                  </span>
                  <span>{t('Full of curiosity', '充满好奇')}</span>
                </div>
                <div className="typewriter" style={{ marginTop: '8px' }}>// Once in a blue moon</div>
              </div>
            </div>
          </div>

          <div className="stack">
            {/* About */}
            <div className="card animate-rise-1">
              <div className="label">{t('About', '关于')}</div>
              <div className="bio">
                <p className="bio-intro" dangerouslySetInnerHTML={{ __html: t('No agenda / <strong>web3</strong> and <strong>AI</strong>', '没有目的 / <strong>web3</strong> 和 <strong>AI</strong>') }} />
                <div className="manifesto">
                  <div className="manifesto-row">
                    <span className="m-l">{t('Bold Hypothesis', '大胆假设')}</span>
                    <span className="m-s">·</span>
                    <span className="m-r">{t('Reasonable Doubt', '合理怀疑')}</span>
                  </div>
                  <div className="manifesto-row">
                    <span className="m-l">{t('Be Kind to Others', '善待他人')}</span>
                    <span className="m-s">·</span>
                    <span className="m-r">
                      {t('Protect Yourself', '保护自己')}<span className="cursor-blink"></span>
                    </span>
                  </div>
                </div>
                <div className="matrix-strip">
                  <span className="matrix-inner">
                    {"  ◈  AI  ·  ·  ·   ◈  Web3  ·  ·  ·   ◈  Once in a blue moon  ·  ·  ·   ◈  To be an AIrtisan  ·  ·  ·   ◈  AI  ·  ·  ·   ◈  Web3  ·  ·  ·   ◈  Once in a blue moon  ·  ·  ·   ◈  To be an AIrtisan  ·  ·  ·  "}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Life */}
            <div className="card animate-rise-2">
              <div className="label">
                AI Life
              </div>

              <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.10em', color: 'var(--text3)', marginBottom: '10px' }}>
                Vibe Coding
              </div>
              <div className="ai-grid">
                <Link className="ai-item" to="/ai-life/vibe-coding">
                  <div className="ai-icon-wrap">{ICON_NOTION}</div>
                  <span className="ai-name">Notion Website Clipper</span>
                  <span className="ai-sub">Chrome extension</span>
                </Link>

                <Link className="ai-item" to="/blunote">
                  <div className="ai-icon-wrap" style={{ background: 'rgba(36,65,255,0.08)', borderColor: 'rgba(36,65,255,0.20)' }}>
                    {ICON_BLUNOTE}
                  </div>
                  <span className="ai-name">Blunote</span>
                  <span className="ai-sub">{t('Silent Digital Garden App', '静谧数字花园应用')}</span>
                  <span className="ai-platform" style={{ fontSize: '9px', color: 'var(--text3)', letterSpacing: '0.04em', fontFamily: "'JetBrains Mono',monospace", marginTop: '-4px' }}>macOS / Windows</span>
                </Link>

                <a className="ai-item" href="https://www.figma.com/community/plugin/1445266488816121265" target="_blank" rel="noopener noreferrer">
                  <div className="ai-icon-wrap" style={{ overflow: 'hidden' }}>
                    <img 
                      src="https://s3-figma-plugin-images-production-sig.figma.com/plugins/carousel/img/1445266488816121265/18ae7273676b9a3ff122302b2a24f21e99847fc5?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZXViFWVnwNjXdQAY8bCSBZjOtbqdLp-jn-FnSi0tE9tN5TlE1AFTgNgjh3e6GChWBwI5Q15RQUXbTuFcaU-OxMLs3ICbQ-kulY3d1UUINNyjoLCSkdTwQ1cKFXyO6sBz6ezo1m5FKz60zk9XlbuF8rkdrB4tE~FW2U25uvm6404IygZRS5izxEcgvt-NfRhsGKLPX-8oiP7--6bubC9hZYoQ4P5-tdxNueeHlSx7MwhLMEq2AxjbHmgpJnwjxHW2WBSyTklWz0ZZEz-Resepo4utSf7eC6LO7irtcSMRPytNydMzpLjXJruGMHT85IjGv-DAXFeK9k2~oslB5stiOA__" 
                      alt="DateTime Inserter icon" 
                      referrerPolicy="no-referrer"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <span className="ai-name">DateTime Inserter</span>
                  <span className="ai-sub" title="A simple personal use plugin for inserting date and time. It helps determine the creation time of each component on the Page.">Figma Plugin</span>
                </a>

                <div className="ai-item empty">
                  <div className="ai-icon-wrap">
                    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }}>
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <span className="ai-name">Coming</span>
                  <span className="ai-sub">Soon</span>
                </div>
                <div className="ai-item empty">
                  <div className="ai-icon-wrap">
                    <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }}>
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <span className="ai-name">Coming</span>
                  <span className="ai-sub">Soon</span>
                </div>
              </div>
            </div>

            {/* Digital Life */}
            <div className="card animate-rise-3">
              <div className="label">{t('Digital Life', '数字生活')}</div>
              <div className="links">
                <a className="link-row" href="https://x.com/deepbluue" target="_blank" rel="noopener noreferrer">
                  <span className="link-ico">{ICON_X}</span>
                  <span className="link-body"><span className="link-name">X (Twitter)</span><span className="link-handle">@deepbluue</span></span>
                  <span className="link-arr">›</span>
                </a>
                <div className="link-row" style={{ cursor: 'default', alignItems: 'flex-start', paddingBottom: '6px' }}>
                  <span className="link-ico" style={{ fontSize: '13px', marginTop: '2px' }}>📝</span>
                  <span className="link-body">
                    <span className="link-name" style={{ marginBottom: '6px', display: 'block' }}>Web3 Notes</span>
                    <a href="https://nobluue.notion.site/c1f072723a5543c3a17914bbdfa6f6dc?v=afbc4f6168e84acf98058abe00943f61" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'var(--text2)', fontSize: '11px', padding: '4px 0', transition: 'color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text2)')}>
                      <span style={{ fontSize: '9px', color: 'var(--blue)' }}>▸</span>
                      {t('Notion Learning Notes', 'Notion 学习记录')}
                    </a>
                    <a href="https://www.notion.so/beckettal/2175cb8ca2ef80d3bce8da24a97ca5e8?v=2175cb8ca2ef806b98ce000c91edf9f3" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: 'var(--text2)', fontSize: '11px', padding: '4px 0', transition: 'color 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.color = 'var(--blue)')} onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text2)')}>
                      <span style={{ fontSize: '9px', color: 'var(--blue)' }}>▸</span> AI Reading List
                    </a>
                  </span>
                </div>
                <a className="link-row" href="https://t.me/+IRdI8v8WQIdkNzc1" target="_blank" rel="noopener noreferrer">
                  <span className="link-ico">{ICON_TG}</span>
                  <span className="link-body">
                    <span className="link-name">Telegram</span>
                    <span className="link-handle">{t('Huai Min also not yet sleeping', '怀民亦未寝')}</span>
                  </span>
                  <span className="link-arr">›</span>
                </a>
                <a className="link-row" href="https://discord.gg/UfwarFgedB" target="_blank" rel="noopener noreferrer">
                  <span className="link-ico">{ICON_DC}</span>
                  <span className="link-body"><span className="link-name">Discord</span><span className="link-handle">bluue helloworld</span></span>
                  <span className="link-arr">›</span>
                </a>
                <a className="link-row" href="mailto:web3@nobluue.com">
                  <span className="link-ico" style={{ fontSize: '12px', color: 'var(--text2)' }}>@</span>
                  <span className="link-body"><span className="link-name">Email</span><span className="link-handle">web3@nobluue.com</span></span>
                  <span className="link-arr">›</span>
                </a>
              </div>
            </div>

            {/* My Homie — Godot */}
            <div className="card animate-rise-4">
              <div className="label">{t('My Homie — Godot', '我的搭档 — Godot')}</div>
              <div className="links">
                <a className="link-row" href="https://twitter.com/GodotSancho" target="_blank" rel="noopener noreferrer">
                  <span className="link-ico">{ICON_X}</span>
                  <span className="link-body"><span className="link-name">X (Twitter)</span><span className="link-handle">@GodotSancho</span></span>
                  <span className="link-arr">›</span>
                </a>
                <a className="link-row" href="https://web3godot.notion.site/47f4be2e9e9146bcb7671bc7feff6bd4" target="_blank" rel="noopener noreferrer">
                  <span className="link-ico" style={{ fontSize: '13px' }}>📝</span>
                  <span className="link-body">
                    <span className="link-name">Godot Notes</span>
                    <span className="link-handle">web3godot Notion</span>
                  </span>
                  <span className="link-arr">›</span>
                </a>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div className="heatmap-card animate-rise-5" style={{ marginTop: '12px' }}>
            <div className="label">{t('Market Heatmap', '市场热力图')}</div>
            <div dangerouslySetInnerHTML={{ __html: '<coingecko-coin-heatmap-widget height="380" locale="zh" top="50"></coingecko-coin-heatmap-widget>' }} />
          </div>

          <footer className="footer">
            <p>
              {t('Powered by ', '技术支持 ')}
              <a href="https://workers.cloudflare.com" target="_blank" rel="noopener noreferrer">Cloudflare Workers</a>
            </p>
          </footer>
        </div>

        <PricePanel />
      </div>
    </>
  );
}
