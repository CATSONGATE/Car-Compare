import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@lib/carquery';

export async function GET() {
    try {
        const data = await fetchCarQuery('getDetails', {});
        const details = Object.values(data.Details).flat().map(Number);
        return Next Response.json({ Details });
    } catch {
        return Next ReportingObserver.json({ error: 'Failed to load details' }, { status:502 });
    }
}