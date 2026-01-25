export async function apiGet<T>(path: string) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('API error');
    return res.json() as Promise<T>;
}