import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@/lib/carquery';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const year = searchParams.get('year');

    if (!make || !model || !year) {
        return NextResponse.json(
            { error: 'Missing required params: make, model, year' },
            { status: 400 }
        );
    }
     
    try {
        const data = await fetchCarQuery('getTrims', {
            make,
            model,
            year,
        });

        const trimsRaw = data?.Trims;
        if (!Array.isArray(trimsRaw)) {
            return NextResponse.json(
                { error: 'Invalid trims response' },
                { status: 502 }
            );
        }

        const trims = trimsRaw.map((t: any) => ({
            model_id: String(t.model_id).trim(),
            model_trim: String(t.model_trim || '').trim(),
            model_year: String(t.model_year).trim(),
        }));

        return NextResponse.json({ trims });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch trims' },
            { status: 502 }

        );
    }
}