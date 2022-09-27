import groq from 'groq';
import Image from 'next/image';
import Link from 'next/link';

import client from '@/lib/client';

import Layout from '@/components/layout/Layout';

const Index = ({ posts }) => {
  return (
    <Layout>
      <title>Gallery</title>
      <main>
        <section className="mx-auto flex  w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-10 md:pt-20">
          <div className="grid grid-cols-4 gap-4">
            {posts.length > 0 &&
              posts.map(
                ({
                  _id,
                  title = '',
                  slug = '',
                  publishedAt = '',
                  mainImage = ``,
                }) =>
                  slug && (
                    <article key={_id}>
                      <Image src={mainImage} width={400} height={400} alt="" />
                      <Link
                        href="/gallery/[slug]"
                        as={`/gallery/${slug.current}`}
                      >
                        <a>{title}</a>
                      </Link>{' '}
                      ({new Date(publishedAt).toDateString()})
                    </article>
                  ),
              )}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
      {
        title,
        slug,
        publishedAt,
        imageAuthor,
        postAuthor,
        categories,
        "mainImage": mainImage.asset->url,
      }
    `);
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
}

export default Index;
