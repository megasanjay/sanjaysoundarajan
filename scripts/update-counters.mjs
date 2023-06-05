import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: '.env.local',
  });
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Create a new MongoClient
const client = new MongoClient(uri);

try {
  await client.connect();

  const database = client.db(dbName);
  const collection = database.collection('AIGallery');

  const results = await collection
    .aggregate([{ $sample: { size: 5 } }])
    .toArray();

  results.forEach(async (result) => {
    const updatedCount = (result.likesCount || 0) + 1;

    await collection.updateOne(
      { _id: result._id },
      { $set: { likesCount: updatedCount } },
    );

    // eslint-disable-next-line no-console
    console.log(`Updated counter for id: ${result.imageId}`);
  });

  await client.close();

  process.exit();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
