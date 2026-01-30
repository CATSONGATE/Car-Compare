import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@/lib/carquery';

export async function GET() {
    try {
        const data = await fetchCarQuery('getYears', {});

        const yearsRaw = data?.Years;
        if (!yearsRaw) { 
          console.error('[api/years] Invalid years response from CarQuery:', data);
          return NextResponse.json(
            { error: 'Invalid years response' },
            { status: 502 }
          );
        }
            
        // CarQuery returns { min_year, max_year }
        const years: number[] = [];
        for (let y = Number(yearsRaw.min_year); y <= Number(yearsRaw.max_year); y++) {
            years.push(y);
        }
        
        
        return NextResponse.json({ years });
    } catch (err) {
        console.error('[api/years] Failed to fetch years:', err);
        return NextResponse.json(
            { error: 'Failed to fetch years' },
            { status: 502 }
        );
    }
}
