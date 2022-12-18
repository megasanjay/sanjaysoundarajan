import groq from 'groq';

import client from '@/lib/client';

import Card from '@/components/Card';
import Layout from '@/components/layout/Layout';

const Index = ({ posts }) => {
  return (
    <Layout>
      <title>Gallery</title>
      <main className=" mx-auto w-full max-w-screen-lg">
        <style jsx>{`
          .masonry {
            column-count: 3;
            column-gap: 2rem;
          }
          @screen lg {
            .masonry {
              column-count: 4;
            }
          }
        `}</style>

        <div className="masonry py-16">
          {posts.length > 0 &&
            posts.map(
              ({ title = '', slug = '', publishedAt = '', mainImage = `` }) => (
                <article
                  className="umami--click--gallery-image"
                  key={slug.current}
                >
                  <Card
                    url={`/gallery/${slug.current}`}
                    src={mainImage}
                    title={title}
                    publishedAt={publishedAt}
                  />
                </article>
              ),
            )}
        </div>
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

  return {
    props: {
      posts,
    },
  };
}

export default Index;
