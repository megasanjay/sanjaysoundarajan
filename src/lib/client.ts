// client.js
import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'wjsqg8ij',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2022-09-27',
});
