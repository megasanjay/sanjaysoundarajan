import groq from 'groq';
import Link from 'next/link';

import client from '@/lib/client';

import Layout from '@/components/layout/Layout';

const Index = ({ posts }) => {
  return (
    <Layout>
      <title>About Me</title>
      <main>
        <section className="mx-auto flex  w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-10 md:pt-20">
          <div>
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
                    <li key={_id}>
                      <img src={mainImage} alt="" />
                      <Link
                        href="/gallery/[slug]"
                        as={`/gallery/${slug.current}`}
                      >
                        <a>{title}</a>
                      </Link>{' '}
                      ({new Date(publishedAt).toDateString()})
                    </li>
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
