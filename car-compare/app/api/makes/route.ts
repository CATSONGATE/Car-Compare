import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@lib/carquery';

export async function GET() {
    try {
        const data = await fetchCarQuery('getMakes', {});
        const makes = Object.values(data.Makes).flat().map(Number);
        return Next Response.json({ Makes });
    } catch {
        return Next ReportingObserver.json({ error: 'Failed to load makes' }, { status:502 });
    }
}