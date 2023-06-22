import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { getPlaiceholder } from 'plaiceholder';
import probe from 'probe-image-size';

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

const client = new MongoClient(uri);

try {
  await client.connect();

  const database = client.db(dbName);
  const collection = database.collection('AIGallery');

  const result = await collection.find({}).toArray();

  for (const item of result) {
    // eslint-disable-next-line no-console
    console.log('Generating metadata for', item.imageId);

    let itemBase64 = item.base64;
    let itemHeight = item.height;
    let itemWidth = item.width;

    const imageURL = `https://cdn.jsdelivr.net/gh/megasanjay/aigallery/${item.imageId}.${item.extension}`;

    let toUpdate = false;

    if (!itemBase64) {
      const buffer = await fetch(imageURL).then(async (res) =>
        Buffer.from(await res.arrayBuffer()),
      );

      const { base64 } = await getPlaiceholder(buffer);

      itemBase64 = base64;

      toUpdate = true;
    }

    if (!itemHeight || !itemWidth) {
      const { height, width } = await probe(imageURL);

      itemHeight = height;
      itemWidth = width;

      toUpdate = true;
    }

    if (toUpdate) {
      await collection.updateOne(
        { _id: item._id },
        {
          $set: {
            blurDataURL: itemBase64,
            height: itemHeight,
            width: itemWidth,
          },
          $unset: {
            base64: '',
          },
        },
      );
    }
  }

  await client.close();

  process.exit();
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
