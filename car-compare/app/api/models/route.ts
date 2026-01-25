import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@lib/carquery';

export async function GET() {
    try {
        const data = await fetchCarQuery('getModels', {});
        const models = Object.values(data.Models).flat().map(Number);
        return Next Response.json({ Models });
    } catch {
        return Next ReportingObserver.json({ error: 'Failed to load models' }, { status:502 });
    }
}