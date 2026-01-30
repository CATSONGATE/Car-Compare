import { NextResponse } from 'next/server';
import { fetchCarQuery } from '@/lib/carquery';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const model_id = searchParams.get('model_id');

    if (!model_id) {
        return NextResponse.json(
            { error: 'Missing required param: model_id' },
            { status: 400 }
        );
    }

    try { 
        const data = await fetchCarQuery('getModel', { model_id });

        const vehicleRaw = data?.[0];
        if (!vehicleRaw) {
            return NextResponse.json(
                { error: 'Invalid vehicle response' },
                { status: 502 }
            );
        }

        // Normalize aggressively
        const vehicle = Object.fromEntries(
            Object.entries(vehicleRaw).map([key, value]) => [
                key,
                typeof value === 'string' ? value.trim() : value,
            ])
        );

        vehicle.model_id = String(vehicle.model_id);

        return NextResponse.json({ vehicle });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch vehicle details' },
            { status: 502 }
        );
    }
}