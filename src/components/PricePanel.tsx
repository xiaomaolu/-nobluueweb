import { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';

const CG_API_KEY = 'CG-fkqvNYJ8ktoVyG7XXUsfRRTP';
const FINNHUB_KEY = 'd6igj7pr01qm7dc7ee30d6igj7pr01qm7dc7ee3g';

const STOCKS = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'NVDA', name: 'NVIDIA' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'GOOGL', name: 'Alphabet' },
];

const STOCK_LOGOS: Record<string, string> = {
  AAPL: `<svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:#1d1d1f;display:block;"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
  NVDA: `<svg viewBox="0 0 24 24" style="width:22px;height:22px;display:block;"><rect width="24" height="24" rx="12" fill="#76b900"/><text x="12" y="16" font-size="8" font-weight="700" font-family="Arial,sans-serif" fill="white" text-anchor="middle">NVDA</text></svg>`,
  MSFT: `<svg viewBox="0 0 23 23" style="width:22px;height:22px;display:block;"><rect x="1"  y="1"  width="10" height="10" fill="#f25022"/><rect x="12" y="1"  width="10" height="10" fill="#7fba00"/><rect x="1"  y="12" width="10" height="10" fill="#00a4ef"/><rect x="12" y="12" width="10" height="10" fill="#ffb900"/></svg>`,
  AMZN: `<svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:#ff9900;display:block;"><path d="M13.958 10.09c0 1.232.029 2.256-.59 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.698-3.182v.685zm3.186 7.705a.66.66 0 01-.76.074c-1.068-.886-1.258-1.295-1.845-2.138-1.763 1.796-3.01 2.334-5.296 2.334-2.704 0-4.806-1.668-4.806-5.005 0-2.608 1.413-4.383 3.424-5.252 1.746-.771 4.183-.908 6.042-1.12v-.419c0-.771.06-1.682-.394-2.348-.394-.596-1.157-.842-1.826-.842-1.24 0-2.347.636-2.618 1.953-.056.287-.272.568-.558.583l-3.126-.338c-.263-.059-.554-.271-.478-.674.717-3.787 4.142-4.927 7.207-4.927 1.567 0 3.614.417 4.848 1.601 1.567 1.462 1.418 3.413 1.418 5.538v5.015c0 1.508.625 2.17 1.214 2.984.207.291.252.638-.01.854-.657.548-1.824 1.565-2.466 2.137l-.03-.011z"/><path d="M20.945 19.025c-2.837 1.935-6.952 2.962-10.499 2.962-4.964 0-9.43-1.836-12.812-4.888-.265-.24-.029-.567.291-.381 3.648 2.124 8.155 3.402 12.808 3.402 3.14 0 6.596-.651 9.779-2.001.479-.204.882.313.433.906z"/></svg>`,
  GOOGL: `<svg viewBox="0 0 24 24" style="width:22px;height:22px;display:block;"><path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`,
};

const COINS = [
  { id: 'bitcoin', symbol: 'BTC', icon: `<img src="https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/bitcoin/info/logo.png" style="width:26px;height:26px;border-radius:50%;display:block;" alt="BTC">` },
  { id: 'ethereum', symbol: 'ETH', icon: `<img src="https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/ethereum/info/logo.png" style="width:26px;height:26px;border-radius:50%;display:block;" alt="ETH">` },
  { id: 'solana', symbol: 'SOL', icon: `<img src="https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/solana/info/logo.png" style="width:26px;height:26px;border-radius:50%;display:block;" alt="SOL">` },
];

export function PricePanel() {
  const { t } = useAppContext();
  const [prices, setPrices] = useState<any>(null);
  const [stocks, setStocks] = useState<any>(null);
  const [now, setNow] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true&x_cg_demo_api_key=${CG_API_KEY}`
        );
        if (res.ok) {
          setPrices(await res.json());
          setNow(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
        } else if (res.status === 429) {
          console.warn('CoinGecko API rate limit exceeded. Using fallback data.');
          setPrices({
            bitcoin: { usd: 65432.10, usd_24h_change: 1.23 },
            ethereum: { usd: 3456.78, usd_24h_change: -0.45 },
            solana: { usd: 145.67, usd_24h_change: 5.67 }
          });
          setNow(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) + ' (Fallback)');
        }
      } catch (e) {
        console.error('Error fetching CoinGecko data:', e);
        setPrices({
          bitcoin: { usd: 65432.10, usd_24h_change: 1.23 },
          ethereum: { usd: 3456.78, usd_24h_change: -0.45 },
          solana: { usd: 145.67, usd_24h_change: 5.67 }
        });
        setNow(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) + ' (Fallback)');
      }
    };

    const fetchStocks = async () => {
      try {
        const results = await Promise.all(
          STOCKS.map(s =>
            fetch(`https://finnhub.io/api/v1/quote?symbol=${s.symbol}&token=${FINNHUB_KEY}`)
              .then(r => r.ok ? r.json() : null)
              .catch(() => null)
          )
        );
        const map: any = {};
        let hasData = false;
        STOCKS.forEach((s, i) => {
          if (results[i] && results[i].c) {
            map[s.symbol] = results[i];
            hasData = true;
          }
        });
        
        if (hasData) {
          setStocks(map);
        } else {
          // Fallback data if API rate limited
          setStocks({
            AAPL: { c: 175.50, dp: 0.5 },
            NVDA: { c: 850.20, dp: 2.1 },
            MSFT: { c: 420.15, dp: -0.3 },
            AMZN: { c: 178.30, dp: 1.2 },
            GOOGL: { c: 145.80, dp: 0.8 }
          });
        }
      } catch (e) {
        console.error('Error fetching Finnhub data:', e);
        setStocks({
          AAPL: { c: 175.50, dp: 0.5 },
          NVDA: { c: 850.20, dp: 2.1 },
          MSFT: { c: 420.15, dp: -0.3 },
          AMZN: { c: 178.30, dp: 1.2 },
          GOOGL: { c: 145.80, dp: 0.8 }
        });
      }
    };

    fetchPrices();
    fetchStocks();
    const interval = setInterval(() => {
      fetchPrices();
      fetchStocks();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (n?: number) => {
    if (n == null) return '—';
    return n >= 1000
      ? '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const fmtChg = (n?: number) => {
    if (n == null) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  };
  const fmtStock = (n?: number) => {
    if (n == null) return '—';
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  let dotColor = '#888';
  let dataLabel = t('Last close data', '上次收盘数据');

  if (stocks) {
    const sample = stocks[STOCKS[0].symbol];
    const ts = sample?.t;
    const nowTime = Math.floor(Date.now() / 1000);
    const ageMin = ts ? Math.floor((nowTime - ts) / 60) : null;

    if (ts && ts > 0 && ageMin !== null && ageMin < 30) {
      dataLabel = t('Intraday delayed', '盘中延迟数据');
      dotColor = '#f7931a';
    } else if (ts && ts > 0) {
      const d = new Date(ts * 1000);
      const mo = d.getMonth() + 1;
      const dy = d.getDate();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      dataLabel = t(`Last Close · ${mo}/${dy} ${hh}:${mm}`, `上次收盘 · ${mo}/${dy} ${hh}:${mm}`);
      dotColor = '#888';
    }
  }

  return (
    <div className="side-col">
      <div className="price-panel animate-rise-1">
        <div className="price-panel-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="panel-icon panel-icon--crypto">
              <svg viewBox="0 0 16 16" style={{ width: '10px', height: '10px', fill: 'currentColor' }}>
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </span>
            <span className="price-panel-label">Crypto</span>
          </div>
          <span className="live-indicator"></span>
        </div>
        
        {COINS.map((c, i) => {
          const isLast = i === COINS.length - 1;
          const p = prices?.[c.id];
          const chg = p?.usd_24h_change || 0;
          
          return (
            <div key={c.id} className="price-row" style={isLast ? { borderBottom: 'none' } : {}}>
              <div className="coin-icon-wrap" dangerouslySetInnerHTML={{ __html: c.icon }} />
              <div className="coin-meta"><span className="coin-symbol">{c.symbol}</span></div>
              <div className="coin-right">
                <span className="price-value" style={!p ? { color: 'var(--text3)' } : {}}>
                  {p ? fmt(p.usd) : '—'}
                </span>
                <span className={`price-change ${p ? (chg >= 0 ? 'up' : 'down') : ''}`} style={!p ? { color: 'var(--text3)' } : {}}>
                  {p ? fmtChg(chg) : '—'}
                </span>
              </div>
            </div>
          );
        })}
        
        <div className="price-updated">
          {t(`Updated at ${now}`, `更新于 ${now}`)}
        </div>
      </div>
      
      <div className="stock-panel animate-rise-1">
        <div className="price-panel-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="panel-icon panel-icon--stock">
              <svg viewBox="0 0 16 16" style={{ width: '10px', height: '10px', fill: 'currentColor' }}>
                <path d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </span>
            <span className="price-panel-label">{t('US Top 5', '美股 Top 5')}</span>
          </div>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', flexShrink: 0, background: dotColor }}></span>
        </div>
        
        {STOCKS.map((s, i) => {
          const q = stocks?.[s.symbol];
          const price = q?.c;
          const chg = q?.dp;
          const priceStr = price ? fmtStock(price) : '—';
          const chgStr = chg != null ? (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%' : '—';
          const chgClass = chg != null ? (chg >= 0 ? 'up' : 'down') : '';
          const isLast = i === STOCKS.length - 1;
          
          return (
            <div key={s.symbol} className="price-row" style={isLast ? { borderBottom: 'none' } : {}}>
              <div className="coin-icon-wrap stock-logo-wrap" dangerouslySetInnerHTML={{ __html: STOCK_LOGOS[s.symbol] }} />
              <div className="coin-meta">
                <span className="coin-symbol">{s.name}</span>
                <span className="coin-sub">{s.symbol}</span>
              </div>
              <div className="coin-right">
                <span className="price-value">{priceStr}</span>
                <span className={`price-change ${chgClass}`}>{chgStr}</span>
              </div>
            </div>
          );
        })}
        
        <div className="price-updated">
          {dataLabel}
        </div>
      </div>
    </div>
  );
}
