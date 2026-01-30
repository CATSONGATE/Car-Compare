import 'server-only';

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map<string, { data: any; expires: number }>();

function stripCallback(text: string) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('Invalid response');
    return JSON.parse(text.slice(start, end + 1));
}

export async function fetchCarQuery(cmd: string, params: Record<string, string>) {
    const key = `${cmd}:${JSON.stringify(params)}`;
    const now = Date.now();

    const cached = cache.get(key);
    if (cached && cached.expires > now) return cached.data;

    const base = process.env.CARQUERY_BASE || 'https://www.carqueryapi.com/api/0.3/';
    const proxy = process.env.UPSTREAM_PROXY_BASE;

    const qs = new URLSearchParams({ cmd, ...params }).toString();
    const target = `${base}?${qs}`;

    let text: string;
    let json: any;

    // Try proxy first if configured
    if (proxy) {
        try {
            const upstream = `${proxy}/${target}`;
            console.log(`[carquery] Trying proxy: ${upstream}`);
            
            const res = await fetch(upstream, {
                headers: {
                    'x-requested-with': 'XMLHttpRequest',
                },
            });
            
            if (res.ok) {
                text = await res.text();
                json = stripCallback(text);
                console.log(`[carquery] Proxy success for ${cmd}`);
                cache.set(key, { data: json, expires: now + CACHE_TTL });
                return json;
            } else {
                console.warn(`[carquery] Proxy returned ${res.status}, falling back to direct`);
            }
        } catch (proxyErr) {
            console.warn(`[carquery] Proxy failed: ${proxyErr}, falling back to direct`);
        }
    }

    // Fallback to direct call
    console.log(`[carquery] Direct call: ${target}`);
    const res = await fetch(target, {
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
    });
    
    if (!res.ok) {
        throw new Error(`CarQuery API returned ${res.status}`);
    }
    
    text = await res.text();
    json = stripCallback(text);

    cache.set(key, { data: json, expires: now + CACHE_TTL });
    return json;
}
