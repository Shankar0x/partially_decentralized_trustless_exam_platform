import { User, Questions } from '@/models/user';
import { NextResponse } from 'next/server';
import fernet from 'fernet';

// Initialize the fernet secret key using the ENCY_KEY from environment variables
const ENCY_KEY = process.env.ENCY_KEY;
const secret = new fernet.Secret(ENCY_KEY);

// Function to decrypt text using fernet
const decrypt = (encryptedText) => {
  const token = new fernet.Token({
    secret: secret,
    token: encryptedText,
    ttl: 0  // Setting ttl to 0 means the token never expires
  });

  return token.decode();
};

export async function POST(req) {
  try {
    const { randomNumbers } = await req.json();

    // Create an array of serial numbers like ["q1", "q2", ...]
    const serialNumbers = randomNumbers.map((num) => `q${num}`);

    // Query the database to get the questions
    const questions = await Questions.find({ sno: { $in: serialNumbers } });

    // Decrypt questions and options using fernet
    const decryptedQuestions = questions.map(question => ({
      q: decrypt(question.q),
      a: decrypt(question.a),
      b: decrypt(question.b),
      c: decrypt(question.c),
      d: decrypt(question.d)
    }));

    return NextResponse.json(decryptedQuestions, { status: 200 });
  } catch (error) {
    console.error('Error fetching or decrypting questions:', error);
    return NextResponse.json({ error: 'Failed to fetch or decrypt questions' }, { status: 500 });
  }
}
