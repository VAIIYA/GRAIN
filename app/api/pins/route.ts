import { NextResponse } from 'next/server';
import { savePin } from '@/lib/actions';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const { owner_id, image_url, title, description, price, hashtags } = body ?? {};

    if (!owner_id || !image_url || !title) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const result = await savePin({
      owner_id,
      image_url,
      title,
      description,
      price: Number(price) || 0,
      hashtags: Array.isArray(hashtags) ? hashtags : [],
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save pin.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
