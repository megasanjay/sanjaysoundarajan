// [slug].js

import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';

import client from '@/lib/client';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Post = ({ post }) => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    categories,
    imageAuthor,
  } = post;
  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {imageAuthor && (
        <div>
          <img src={urlFor(imageAuthor).width(50).url()} />
        </div>
      )}
    </article>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": imageAuthor->name,
  "categories": categories[]->title,
  "imageAuthor": imageAuthor->image
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
