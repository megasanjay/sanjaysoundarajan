import sanitize from 'mongo-sanitize';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

if (!process.env.MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  );
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Create a new MongoClient
const client = new MongoClient(uri);

const gallery = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    if ('body' in request) {
      const sanitizedBody = sanitize(request.body);

      const responseBody = JSON.parse(sanitizedBody);

      try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection('AIGallery');

        const existingRecord = await collection.findOne({
          imageId: responseBody.imageId,
        });

        if (existingRecord) {
          // update the counter in the database

          const newCount = (existingRecord.likesCount || 0) + 1;
          await collection.updateOne(
            { imageId: responseBody.imageId },
            { $set: { likesCount: newCount } },
          );
        } else {
          response.status(404).json({ error: 'Image not found' });
          return;
        }

        response.status(200).json({ status: 'ok' });
      } catch (error) {
        response.status(500).json({ error: error });
      }

      return;
    } else {
      response.status(400).json({ error: 'Missing body' });
      return;
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }
};

export default gallery;
