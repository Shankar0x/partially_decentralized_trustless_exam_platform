import { User, Questions } from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const count = await Questions.countDocuments();
        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch document count' }, { status: 500 });
    }
}
