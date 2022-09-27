// [slug].js

import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
import Image from 'next/image';

import client from '@/lib/client';

import Layout from '@/components/layout/Layout';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Post = ({ post }) => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    categories,
    mainImage,
    authorImage,
  } = post;
  return (
    <Layout>
      <title>Gallery</title>
      <main>
        <article className="mx-auto flex w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-10">
          <h1>{title}</h1>
          <span>By {name}</span>
          <div>
            <Image src={mainImage} width={400} height={400} alt="" />
          </div>

          {categories && (
            <ul>
              Posted in
              {categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          )}
          {authorImage && (
            <div>
              <img src={urlFor(authorImage).width(50).url()} />
            </div>
          )}
        </article>
      </main>
    </Layout>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": imageAuthor->name,
  "categories": categories[]->title,
  "mainImage": mainImage.asset->url,
  "authorImage": imageAuthor->image
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`,
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const post = await client.fetch(query, { slug });
  console.log(post);
  return {
    props: {
      post,
    },
  };
}
export default Post;
