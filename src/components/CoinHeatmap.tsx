import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from '../AppContext';
import { coinGeckoUrl } from '../lib/coingecko';

interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number;
  market_cap_rank: number | null;
  price_change_percentage_24h: number | null;
}

interface HeatmapTile extends MarketCoin {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CacheEntry {
  savedAt: number;
  coins: MarketCoin[];
}

const TOP_COINS = 10;
const CACHE_KEY = 'nobluue:coin-heatmap:v2';
const CACHE_FRESH_MS = 2 * 60 * 1000;
const REFRESH_MS = 5 * 60 * 1000;
const TILE_GAP = 2;

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    return Array.isArray(parsed.coins) && typeof parsed.savedAt === 'number' ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(coins: MarketCoin[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), coins }));
  } catch {
    // The heatmap still works when storage is unavailable.
  }
}

function splitByWeight(items: MarketCoin[]) {
  const total = items.reduce((sum, coin) => sum + coin.market_cap, 0);
  let running = 0;
  let splitAt = 1;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let index = 1; index < items.length; index += 1) {
    running += items[index - 1].market_cap;
    const distance = Math.abs(total / 2 - running);
    if (distance < bestDistance) {
      bestDistance = distance;
      splitAt = index;
    }
  }

  return [items.slice(0, splitAt), items.slice(splitAt)] as const;
}

function layoutTiles(
  items: MarketCoin[],
  x: number,
  y: number,
  width: number,
  height: number,
): HeatmapTile[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ ...items[0], x, y, width, height }];

  const [first, second] = splitByWeight(items);
  const total = items.reduce((sum, coin) => sum + coin.market_cap, 0);
  const firstTotal = first.reduce((sum, coin) => sum + coin.market_cap, 0);
  const ratio = total > 0 ? firstTotal / total : first.length / items.length;

  if (width >= height) {
    const firstWidth = width * ratio;
    return [
      ...layoutTiles(first, x, y, firstWidth, height),
      ...layoutTiles(second, x + firstWidth, y, width - firstWidth, height),
    ];
  }

  const firstHeight = height * ratio;
  return [
    ...layoutTiles(first, x, y, width, firstHeight),
    ...layoutTiles(second, x, y + firstHeight, width, height - firstHeight),
  ];
}

function tileColor(change: number | null) {
  if (change == null || Math.abs(change) < 0.05) return 'hsl(225 10% 34%)';
  const intensity = Math.min(Math.abs(change) / 8, 1);
  const lightness = change > 0 ? 34 - intensity * 10 : 38 - intensity * 12;
  return change > 0
    ? `hsl(145 55% ${lightness}%)`
    : `hsl(4 58% ${lightness}%)`;
}

function formatPrice(price: number | null) {
  if (price == null) return '—';
  if (price >= 1) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: price >= 100 ? 0 : 2,
    });
  }
  return `$${price.toLocaleString('en-US', { maximumSignificantDigits: 3 })}`;
}

function formatChange(change: number | null) {
  if (change == null) return '—';
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
}

export function CoinHeatmap() {
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [coins, setCoins] = useState<MarketCoin[]>([]);
  const [size, setSize] = useState({ width: 0, height: 380 });
  const [status, setStatus] = useState<'loading' | 'ready' | 'stale' | 'error'>('loading');
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);

  const loadMarkets = useCallback(async (force = false) => {
    const cached = readCache();
    if (!force && cached && Date.now() - cached.savedAt < CACHE_FRESH_MS) {
      setCoins(cached.coins);
      setUpdatedAt(cached.savedAt);
      setStatus('ready');
      return;
    }

    if (cached) {
      setCoins(cached.coins);
      setUpdatedAt(cached.savedAt);
      setStatus('stale');
    } else {
      setStatus('loading');
    }

    try {
      const response = await fetch(coinGeckoUrl('coins/markets', {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: String(TOP_COINS),
        page: '1',
        sparkline: 'false',
        price_change_percentage: '24h',
      }));

      if (!response.ok) throw new Error(`CoinGecko returned ${response.status}`);

      const data = await response.json() as MarketCoin[];
      const validCoins = data.filter((coin) =>
        coin.id &&
        coin.symbol &&
        Number.isFinite(coin.market_cap) &&
        coin.market_cap > 0,
      );

      if (validCoins.length === 0) throw new Error('CoinGecko returned no market data');

      writeCache(validCoins);
      setCoins(validCoins);
      setUpdatedAt(Date.now());
      setStatus('ready');
    } catch {
      setStatus(cached ? 'stale' : 'error');
    }
  }, []);

  useEffect(() => {
    void loadMarkets();
    const interval = window.setInterval(() => void loadMarkets(true), REFRESH_MS);
    return () => window.clearInterval(interval);
  }, [loadMarkets]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      const bounds = element.getBoundingClientRect();
      setSize({ width: bounds.width, height: bounds.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const tiles = useMemo(
    () => layoutTiles(coins, 0, 0, size.width, size.height),
    [coins, size],
  );

  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className="coin-heatmap">
      <div className="coin-heatmap-meta">
        <span>
          {status === 'loading' && t('Loading live market data…', '正在加载实时市场数据…')}
          {status === 'ready' && t(`Top ${TOP_COINS} · Updated ${updatedLabel}`, `市值前 ${TOP_COINS} · 更新于 ${updatedLabel}`)}
          {status === 'stale' && t(`Cached data · ${updatedLabel}`, `缓存数据 · ${updatedLabel}`)}
          {status === 'error' && t('Market data is temporarily unavailable', '市场数据暂时不可用')}
        </span>
        <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">
          {t('Data by CoinGecko ↗', '数据来自 CoinGecko ↗')}
        </a>
      </div>

      <div
        ref={containerRef}
        className="coin-heatmap-canvas"
        role="list"
        aria-label={t(`Top ${TOP_COINS} cryptocurrencies by market capitalization`, `按市值排列的前 ${TOP_COINS} 种加密货币`)}
      >
        {status === 'loading' && (
          <div className="coin-heatmap-loading" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
          </div>
        )}

        {status === 'error' && (
          <div className="coin-heatmap-empty">
            <span>{t('Unable to load the heatmap right now.', '暂时无法加载热力图。')}</span>
            <button type="button" onClick={() => void loadMarkets(true)}>
              {t('Try again', '重新加载')}
            </button>
          </div>
        )}

        {tiles.map((tile) => {
          const innerWidth = Math.max(0, tile.width - TILE_GAP);
          const innerHeight = Math.max(0, tile.height - TILE_GAP);
          const showName = innerWidth > 120 && innerHeight > 62;
          const showPrice = innerWidth > 92 && innerHeight > 78;
          const showLogo = innerWidth > 72 && innerHeight > 58;
          const showSymbol = innerWidth >= 28 && innerHeight >= 22;
          const showChange = showSymbol && innerWidth >= 48 && innerHeight >= 38;
          const change = tile.price_change_percentage_24h;

          return (
            <a
              key={tile.id}
              className="coin-heatmap-tile"
              href={`https://www.coingecko.com/en/coins/${tile.id}`}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label={`${tile.name}: ${formatPrice(tile.current_price)}, ${formatChange(change)} in 24 hours`}
              title={`${tile.name} · ${formatPrice(tile.current_price)} · ${formatChange(change)}`}
              style={{
                left: tile.x + TILE_GAP / 2,
                top: tile.y + TILE_GAP / 2,
                width: innerWidth,
                height: innerHeight,
                backgroundColor: tileColor(change),
              }}
            >
              {showSymbol && (
                <span className="coin-heatmap-symbol">
                  {showLogo && <img src={tile.image} alt="" loading="lazy" />}
                  <span>{tile.symbol.toUpperCase()}</span>
                </span>
              )}
              {showChange && <strong>{formatChange(change)}</strong>}
              {showName && <span className="coin-heatmap-name">{tile.name}</span>}
              {showPrice && <span className="coin-heatmap-price">{formatPrice(tile.current_price)}</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}
