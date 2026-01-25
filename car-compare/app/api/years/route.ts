import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@lib/carquery';

export async function GET() {
    try {
        const data = await fetchCarQuery('getYears', {});
        const years = Object.values(data.Years).flat().map(Number);
        return Next Response.json({ years });
    } catch {
        return Next ReportingObserver.json({ error: 'Failed to load years' }, { status:502 });
    }
}