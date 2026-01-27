import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@lib/carquery';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const make = searchParams.get('make');
    const year = searchParams.get('year');

    if (!make || !year) {
      return NextResponse.json(
        { error: 'Missing required params: make, year' },
        { status: 400 }
      );
    }


    try {
      const data = await fetchCarQuery('getModels', { make, year });

      const modelsRaw = data?.Models;
      if (!Array.isArray(modelsRaw)) {
        return NextResponse.json(
          { error: 'Invalid models response' },
          { status: 502 }
        );
      }

      const models = modelsRaw.map((m: any) => ({
        model_name: String(m.model_name).trim(),
      }));

      return NextResponse.json({ models });
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch models' },
        { status: 502 }
      );
    }
 }