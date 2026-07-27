const DEFAULT_DEMO_API_KEY = 'CG-fkqvNYJ8ktoVyG7XXUsfRRTP';

const apiKey = import.meta.env.VITE_COINGECKO_API_KEY || DEFAULT_DEMO_API_KEY;

export function coinGeckoUrl(path: string, params: Record<string, string> = {}) {
  const url = new URL(path, 'https://api.coingecko.com/api/v3/');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  if (apiKey) {
    url.searchParams.set('x_cg_demo_api_key', apiKey);
  }

  return url.toString();
}
