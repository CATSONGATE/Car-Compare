import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@lib/carquery';

export async function GET() {
    try {
        const data = await fetchCarQuery('getTrims', {});
        const trims = Object.values(data.Trims).flat().map(Number);
        return Next Response.json({ Trims });
    } catch {
        return Next ReportingObserver.json({ error: 'Failed to load trims' }, { status:502 });
    }
}