export async function apiGet<T>(path: string) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('API error');
    return res.json() as Promise<T>;
}

export function fetchYears() {
    return apiGet<{ years: number[] }>(`/api/years`);
}

export function fetchMakes(year: number) {
    return apiGet<{ makes: { make_id: string; make_display: string }[] }>(
        `/api/makes?year=${encodeURIComponent(String(year))}`
    );
}

export function fetchModels(make: string, year: number) {
  return apiGet<{ models: { model_name: string }[] }>(
    `/api/models?make=${encodeURIComponent(make)}&year=${encodeURIComponent(String(year))}`
  );
}

export function fetchTrims(make: string, model: string, year: number) {
    return apiGet<{ trims: { model_id: string; model_trims: string; model_year: string }[] }>(
        `/api/trims?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(String(year))}`
    );
}

export function fetchVehicleDetails(model_id: string) {
    return apiGet<{ vehicle: any }>(
        `/api/details?model_id=${encodeURIComponent(model_id)}`
    );
}