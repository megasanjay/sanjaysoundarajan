/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion';
import groq from 'groq';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import probe from 'probe-image-size';
import { useState } from 'react';

import client from '@/lib/client';

import Layout from '@/components/layout/Layout';

// type ModalProps = {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

type ModalProps = {
  url: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const GalleryPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ModalProps>({
    url: '',
    width: 0,
    height: 0,
    blurDataURL: '',
  });

  const handleImageClick = async (
    image: string,
    width: number,
    height: number,
    blurDataURL: string,
  ) => {
    setIsOpen(!isOpen);
    setSelectedImage({
      url: image,
      width,
      height,
      blurDataURL,
    });
  };

  return (
    <Layout>
      <title>Gallery</title>
      <main className="relative mx-auto w-full max-w-screen-lg">
        <h1 className="pt-8">Gallery</h1>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                ease: 'easeInOut',
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="columns-1 py-16 sm:columns-2 md:columns-3"
        >
          {posts.map(
            ({
              title = '',
              publishedAt = '',
              mainImage = '',
              width,
              height,
              blurDataURL,
            }) => (
              <motion.article
                variants={{
                  hidden: { opacity: 0, translateY: 100 },
                  show: { opacity: 1, translateY: 0 },
                }}
                className="umami--click--gallery-image cursor-pointer px-4 sm:px-2"
                key={title}
                onClick={() => {
                  handleImageClick(mainImage, width, height, blurDataURL);
                }}
              >
                <div className="group relative mb-8">
                  <img className="rounded-lg" src={mainImage} alt="image" />
                  <div className="overlay absolute bottom-[-20px] hidden h-24 w-full px-4 pt-6 opacity-0 transition-all group-hover:bottom-0 group-hover:opacity-100">
                    <div className="text-lg text-white">{title}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(publishedAt).toDateString()}
                    </div>
                  </div>
                </div>
              </motion.article>
            ),
          )}
        </motion.div>
      </main>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-10 flex min-h-screen items-center justify-center overflow-y-auto">
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <div
                className="fixed inset-0 bg-gray-900/90 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsOpen(false)}
              ></div>

              <motion.div
                className="flex items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
                initial={{
                  opacity: 0,
                  scale: 0.75,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    ease: 'easeOut',
                    duration: 0.15,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.75,
                  transition: {
                    ease: 'easeIn',
                    duration: 0.15,
                  },
                }}
              >
                <span
                  className="hidden sm:inline-block sm:h-screen sm:align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>

                <div
                  className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="flex flex-col">
                    <Image
                      src={selectedImage.url}
                      alt=""
                      width={selectedImage.width}
                      height={selectedImage.height}
                      placeholder="blur"
                      blurDataURL={selectedImage.blurDataURL}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  imageAuthor: string;
  mainImage: string;
};

export async function getStaticProps() {
  const listOfPosts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
      {
        title,
        slug,
        publishedAt,
        imageAuthor,
        "mainImage": mainImage.asset->url,
        "imageAuthor": imageAuthor->name,
      }
    `);

  const posts = await Promise.all(
    listOfPosts.map(async (post: Post) => {
      const {
        base64,
        // eslint-disable-next-line unused-imports/no-unused-vars
        img: { width, height, ...img },
      } = await getPlaiceholder(post.mainImage);

      const imageMeta = await probe(post.mainImage);

      return {
        ...img,
        alt: ``,
        width: imageMeta.width,
        height: imageMeta.height,
        ...post,
        blurDataURL: base64,
      };
    }),
  ).then((values) => values);

  return {
    props: {
      posts,
    },
  };
}

export default GalleryPage;
