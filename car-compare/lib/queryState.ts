export function updateQuery(params: Record<string, string | undefined>) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([k, v]) =>
        v ? url.searchParams.set(k, v) : url.searchParams.delete(k)
    );
    window.history.replaceState({}, '', url.toString());
}