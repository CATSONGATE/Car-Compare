import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@/lib/carquery';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');

    if (!year) {
        return NextResponse.json(
            { error: 'Missing required param: year'},
            { status: 400 }
        );
    }

    try {
      const data = await fetchCarQuery('getMakes', { year });

      const makesRaw = data?.Makes;
      if (!Array.isArray(makesRaw)) {
        return NextResponse.json(
          { error: 'Invalid makes response' },
          { status: 502 }
        );
      }

      const makes - makesRaw.map((m: any) => ({
        make_id: String(m.make_slug || m.make_id).trim(),
        make_display: String(m.make_display.trim(),)
      }));

      return NextResponse.json({ makes });
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch makes' },
        { status: 502 }
      );
    }
}


