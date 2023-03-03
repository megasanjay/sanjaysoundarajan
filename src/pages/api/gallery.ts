import type { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from '../../lib/mongodb';

if (!process.env.MONGODB_DB) {
  throw new Error('Please add your collection name to .env.local');
}

const MONGODB_DB = process.env.MONGODB_DB;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const client = await clientPromise;

    const db = client.db(MONGODB_DB);
    const collection = db.collection('AIGallery');

    const gallery = await collection.find({}).toArray();

    res.status(200).json(gallery);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
