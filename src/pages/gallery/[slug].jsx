/* eslint-disable @next/next/no-img-element */

import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';

import client from '@/lib/client';

import Layout from '@/components/layout/Layout';
import StyledLink from '@/components/links/StyledLink';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit('max').auto('format')}
        />
      );
    },
  },
};

const Post = ({ post }) => {
  return (
    <Layout>
      <title>Gallery</title>
      <main>
        {post && (
          <article className=" mx-auto flex w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-10">
            <h2>{post.title}</h2>

            <div className="py-3">
              <span>Image created by </span>
              <StyledLink
                href={post.authorURL}
                className="umami--click--publications-link"
              >
                {post.imageAuthor}
              </StyledLink>
            </div>

            <div className="pt-4 pb-6">
              <img src={post.mainImage} alt="" className="rounded-lg" />
            </div>

            <h3>Backstory</h3>

            <div className="prose prose-xl max-w-full py-2">
              <PortableText value={post.body} components={ptComponents} />
            </div>

            {post.categories && (
              <div>
                {post.categories.map((category) => (
                  <a
                    href="#"
                    key={category}
                    className="mr-2 w-max rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300"
                  >
                    {category}
                  </a>
                ))}
              </div>
            )}
          </article>
        )}
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`,
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  "imageAuthor": imageAuthor->name,
  "categories": categories[]->title,
  "mainImage": mainImage.asset->url,
  "authorURL": imageAuthor->link
}`;

export async function getStaticProps(context) {
  const { slug = '' } = context.params;
  const post = await client.fetch(query, { slug });

  return {
    props: {
      post,
    },
  };
}
export default Post;
