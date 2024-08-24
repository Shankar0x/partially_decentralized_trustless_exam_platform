import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// GET method handler
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const eno = searchParams.get('eno');

  if (!eno) {
    return NextResponse.json({ message: 'Enrollment number is required' }, { status: 400 });
  }

  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db(process.env.DB_NAME);

    // Query the Ledger collection to find the rollNumber
    const ledgerEntry = await db.collection('Ledger').findOne({ rollNumber: eno });

    // Close the database connection
    client.close();

    if (ledgerEntry) {
      // If an entry is found, it means the exam has been submitted
      return NextResponse.json({ submitted: true }, { status: 200 });
    } else {
      // If no entry is found, the exam has not been submitted
      return NextResponse.json({ submitted: false }, { status: 200 });
    }
  } catch (error) {
    console.error('Error checking ledger:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
