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
    const qs = new URLSearchParams({ cmd, ...params }).toString();
    const url = `${base}?${qs}`;

    const res = await fetch(url, {
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
    });
    
    if (!res.ok) {
        throw new Error(`CarQuery API returned ${res.status}`);
    }
    
    const text = await res.text();
    const json = stripCallback(text);

    cache.set(key, { data: json, expires: now + CACHE_TTL });
    return json;
}
