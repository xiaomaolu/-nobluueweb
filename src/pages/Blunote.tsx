import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const ICON_BACK = <svg viewBox="0 0 16 16" style={{ width: '14px', height: '14px', fill: 'currentColor', flexShrink: 0 }}><path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" /></svg>;
const ICON_BLUNOTE = <svg width="32" height="31" viewBox="0 0 106 101" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}><path d="M36 65C36 46.2223 51.2223 31 70 31H104V65C104 83.7777 88.7777 99 70 99H36V65Z" fill="#2441FF" /><path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#2441FF" /><path d="M36 5C36 2.23858 38.2386 0 41 0H101C103.761 0 106 2.23858 106 5V19C106 21.7614 103.761 24 101 24H41C38.2386 24 36 21.7614 36 19V5Z" fill="#2441FF" /><path d="M12 31C18.6274 31 24 36.3726 24 43V89C24 95.6274 18.6274 101 12 101C5.37258 101 0 95.6274 0 89V43C0 36.3726 5.37258 31 12 31Z" fill="#2441FF" /></svg>;

export function Blunote() {
  const { t, language } = useAppContext();

  return (
    <>
      <nav className="top-nav">
        <div className="nav-inner" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link className="back" to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text3)', textDecoration: 'none', padding: '4px 8px', borderRadius: 'var(--r-sm)', transition: 'background 0.2s, color 0.2s' }}>
            {ICON_BACK} no bluue
          </Link>
          <span className="breadcrumb" style={{ fontSize: '12px', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--text3)' }}>/</span><span>AI Life</span>
            <span style={{ color: 'var(--text3)' }}>/</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>Blunote</span>
          </span>
        </div>
      </nav>

      <div className="detail-page" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '36px 20px 80px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="d-hero">
          <div className="d-hero-icon" style={{ background: 'rgba(36,65,255,0.08)', padding: '12px', borderRadius: '16px' }}>{ICON_BLUNOTE}</div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '4px' }}>Silent Digital Garden</div>
            <div className="d-hero-title" style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: '6px' }}>Blunote</div>
            <div className="d-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-soft)', borderRadius: '20px', padding: '2px 9px' }}>
              <span className="d-live-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)' }}></span>
              Local-first · Privacy Focused · Multi-platform
            </div>
          </div>
        </div>

        <div className="d-card">
          <div className="label">{t('Downloads', '软件下载')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="ai-item" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🪟</span>
              <span className="ai-name" style={{ color: 'var(--blue)', fontWeight: 600 }}>Windows</span>
              <a 
                href="https://download.nobluue.com/Win-Blunote.Setup.0.1.23_2.exe" 
                className="ai-sub" 
                style={{ 
                  textDecoration: 'none', 
                  padding: '6px 16px', 
                  background: 'var(--blue-soft)', 
                  color: 'var(--blue)', 
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 500,
                  transition: 'opacity 0.2s'
                }} 
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                download
              >
                Download .exe
              </a>
            </div>

            <div className="ai-item" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🍎</span>
              <span className="ai-name" style={{ color: 'var(--blue)', fontWeight: 600 }}>macOS</span>
              <a 
                href="https://download.nobluue.com/Blunote-0.1.23-arm64.dmg" 
                className="ai-sub" 
                style={{ 
                  textDecoration: 'none', 
                  padding: '6px 16px', 
                  background: 'var(--blue-soft)', 
                  color: 'var(--blue)', 
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 500,
                  transition: 'opacity 0.2s'
                }} 
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                download
              >
                Download .dmg
              </a>
            </div>

            <div className="ai-item" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>📱</span>
              <span className="ai-name" style={{ color: 'var(--blue)', fontWeight: 600 }}>iOS</span>
              <a 
                href="https://apps.apple.com/us/app/blunote/id6761996337" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ai-sub" 
                style={{ 
                  textDecoration: 'none', 
                  padding: '6px 16px', 
                  background: 'var(--blue-soft)', 
                  color: 'var(--blue)', 
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 500,
                  transition: 'opacity 0.2s'
                }} 
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                App Store
              </a>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '16px', textAlign: 'center' }}>
            {t('More platforms coming soon.', '更多平台即将推出。')}
          </p>
        </div>

        <div className="d-card">
          <div className="label">{t('Support', '技术支持')}</div>
          <Link to="/blunote/support" className="ai-item" style={{ textDecoration: 'none', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
            <span style={{ fontSize: '18px' }}>💬</span>
            <div style={{ textAlign: 'left' }}>
              <div className="ai-name" style={{ marginBottom: '2px' }}>Blunote Support</div>
              <div className="ai-sub">note@nobluue.com</div>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text3)', fontSize: '14px' }}>›</span>
          </Link>
        </div>

        <div className="d-card">
          <div className="label">{t('Privacy Policy', '隐私政策')}</div>
          <div className="privacy" style={{ fontSize: '12px', color: 'var(--text2)', lineHeight: 1.7 }}>
            {language === 'en' ? (
              <div key="en-policy">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Blunote Privacy Policy</h3>
                <p style={{ color: 'var(--text3)', fontStyle: 'italic', marginBottom: '16px' }}>Blunote is designed with a local-first approach.</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>Information You Store</h4>
                <p>Blunote allows you to create and store notes, documents, and related content. Your note content is primarily stored locally on your device.</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>iCloud Sync</h4>
                <p>If you use sync features, your content may be synced through Apple iCloud so it can be available across your Apple devices.</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>Custom AI APIs</h4>
                <p>Blunote may allow you to connect your own custom AI API. When you use these features, content you choose to process may be sent to the API provider you configure. Blunote does not control the privacy practices of third-party AI providers you choose to use.</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>Data Collection</h4>
                <p>Blunote does not sell your personal data. We may receive limited technical information if you contact support directly.</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>Data Deletion</h4>
                <p>You can delete your notes inside the app at any time. If you use iCloud sync, data stored in iCloud is subject to Apple’s iCloud services and settings.</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>Third-Party Services</h4>
                <p>Blunote may rely on Apple services such as iCloud. If you use custom AI APIs, your use of those services is also subject to the privacy policy of the provider you choose.</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>Contact</h4>
                <p>If you have questions about this Privacy Policy, contact:<br />
                <a href="mailto:note@nobluue.com" style={{ color: 'var(--blue)', textDecoration: 'none' }}>note@nobluue.com</a></p>
              </div>
            ) : (
              <div key="cn-policy">
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>Blunote 隐私政策</h3>
                <p style={{ color: 'var(--text3)', fontStyle: 'italic', marginBottom: '16px' }}>Blunote 采用本地优先的设计思路。</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>你存储的内容</h4>
                <p>Blunote 允许你创建和保存笔记、文档及相关内容。你的笔记内容默认主要保存在本地设备中。</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>iCloud 同步</h4>
                <p>如果你使用同步功能，相关内容可能会通过 Apple iCloud 在你的 Apple 设备之间进行同步。</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>自定义 AI API</h4>
                <p>Blunote 支持接入用户自定义的 AI API。当你使用相关功能时，你选择处理的内容可能会发送到你自行配置的 API 服务商。对于你自行选择的第三方 AI 服务，其隐私政策与数据处理方式由对应服务商负责。</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>数据收集</h4>
                <p>Blunote 不会出售你的个人数据。如果你主动通过邮件联系支持，我们可能会收到你提供的设备信息、问题描述及相关反馈内容。</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>数据删除</h4>
                <p>你可以随时在 App 内删除自己的笔记内容。如果你启用了 iCloud 同步，存储在 iCloud 中的数据同时受 Apple iCloud 服务与设置管理。</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>第三方服务</h4>
                <p>Blunote 可能依赖 Apple 提供的服务，例如 iCloud。如果你启用了自定义 AI API，相关数据处理还将受到你所选服务商隐私政策的约束。</p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text)', marginTop: '20px', marginBottom: '4px' }}>联系方式</h4>
                <p>如对本隐私政策有任何疑问，请联系：<br />
                <a href="mailto:note@nobluue.com" style={{ color: 'var(--blue)', textDecoration: 'none' }}>note@nobluue.com</a></p>
              </div>
            )}
          </div>
        </div>

        <footer className="footer" style={{ marginTop: '28px', textAlign: 'center', fontSize: '11px', color: 'var(--text3)' }}>
          <p>no bluue &nbsp;·&nbsp; Powered by <a href="https://workers.cloudflare.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'none' }}>Cloudflare Workers</a></p>
        </footer>
      </div>
    </>
  );
}
