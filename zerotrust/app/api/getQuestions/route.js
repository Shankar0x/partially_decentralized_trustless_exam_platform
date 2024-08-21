import { User, Questions } from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { randomNumbers } = await req.json();

        // Create an array of serial numbers like ["q1", "q2", ...]
        const serialNumbers = randomNumbers.map((num) => `q${num}`);

        // Query the database to get the questions
        const questions = await Questions.find({ sno: { $in: serialNumbers } });

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
    }
}
