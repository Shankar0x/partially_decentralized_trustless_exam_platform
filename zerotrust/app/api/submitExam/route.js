import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; 
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('authDB');
    const collection = db.collection('Ledger');

    const { rollNumber, questions, answers } = await req.json(); // Parse JSON body

    // Validate the input data
    if (!rollNumber || !questions || !Array.isArray(questions) || !answers || !Array.isArray(answers)) {
      return new Response(JSON.stringify({ message: 'Invalid input data' }), { status: 400 });
    }

    // Insert the exam data into the MongoDB collection
    await collection.insertOne({
      rollNumber,
      questions,
      answers,
      submittedAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Exam submitted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error submitting exam:', error);
    return new Response(JSON.stringify({ message: 'Error submitting exam', error }), { status: 500 });
  }
}
