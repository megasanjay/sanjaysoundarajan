/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { MongoClient } from 'mongodb';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import probe from 'probe-image-size';
import { Fragment, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-accessible-accordion/dist/fancy-example.css';

import { textContainer, textItem } from '@/lib/framer';

import PreviewOverlay from '@/components/gallery/PreviewOverlay';
import ZoomedOverlay from '@/components/gallery/ZoomedOverlay';
import Layout from '@/components/layout/Layout';
import ExternalLink from '@/components/links/ExternalLink';

type Post = {
  id: string;
  prompt: string;
  publishedAt: string;
  imageURL: string;
  imageAuthor: string;
  extension: string;
  likesCount: number;
};

type ModalProps = {
  id: string;
  url: string;
  width: number;
  height: number;
  blurDataURL: string;
  imageAuthorProfilePicture: string;
  imagePrompt: string;
  imageAuthorURL: string;
  publishedAt: string;
  likesCount: number;
};

const GalleryPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ModalProps>({
    id: '',
    url: '',
    width: 0,
    height: 0,
    blurDataURL: '',
    imageAuthorProfilePicture: '',
    imageAuthorURL: '',
    imagePrompt: '',
    publishedAt: '',
    likesCount: 0,
  });

  const handleImageClick = async (
    id: string,
    image: string,
    width: number,
    height: number,
    blurDataURL: string,
    imageAuthor: string,
    imagePrompt: string,
    publishedAt: string,
    likesCount: number,
  ) => {
    let imageAuthorProfilePicture = '';
    let imageAuthorURL = '';

    if (imageAuthor === 'midjourney') {
      imageAuthorProfilePicture = '/images/gallery/midjourney.png';
      imageAuthorURL = 'https://www.midjourney.com/';
    } else if (imageAuthor === 'dall-e-2') {
      imageAuthorProfilePicture = '/images/gallery/dall-e-2.png';
      imageAuthorURL = 'https://openai.com/dall-e-2/';
    } else if (imageAuthor === 'chatgpt') {
      imageAuthorProfilePicture = '/images/gallery/chatgpt.jpg';
      imageAuthorURL = 'https://chat.openai.com/';
    }

    setIsOpen(!isOpen);
    setSelectedImage({
      id,
      url: image,
      width,
      height,
      blurDataURL,
      imageAuthorProfilePicture,
      imageAuthorURL,
      imagePrompt,
      publishedAt,
      likesCount,
    });
  };

  return (
    <Layout>
      <title>Gallery</title>
      <main className="relative mx-auto w-full max-w-screen-lg">
        <section className="mx-auto flex w-full max-w-screen-lg flex-col bg-white px-3 pt-10 md:pt-20">
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center text-left text-xl text-slate-800"
          >
            <motion.h1
              variants={textItem}
              className="mb-4 mt-4 text-left text-5xl font-bold "
            >
              Gallery 🤖
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, translateY: 100 },
                show: { opacity: 1, translateY: 0 },
              }}
              className="pb-10"
            >
              A small collection of images, that I found interesting, generated
              using a variety of different AI models. I have also included the
              prompt that was used to generate the image. I hope you enjoy them!
            </motion.p>
          </motion.div>
        </section>

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}
        >
          <Masonry columnsCount={3}>
            {posts.map(
              ({
                id = '',
                publishedAt = '',
                imageURL = '',
                width,
                height,
                blurDataURL,
                imageAuthor = '',
                prompt = '',
                likesCount,
              }) => (
                <div
                  className="group relative mx-2 mb-3 w-auto md:px-0"
                  key={id}
                  onClick={() => {
                    handleImageClick(
                      id,
                      imageURL,
                      width,
                      height,
                      blurDataURL,
                      imageAuthor,
                      prompt,
                      publishedAt,
                      likesCount,
                    );
                  }}
                >
                  <Image
                    src={imageURL}
                    alt=""
                    width={width}
                    height={height}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="w-full rounded-lg"
                  />

                  <PreviewOverlay id={id} publishedAt={publishedAt} />
                </div>
              ),
            )}
          </Masonry>
        </ResponsiveMasonry>
      </main>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-h-screen max-w-screen-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="group relative">
                    <ExternalLink href={selectedImage.url}>
                      <Image
                        src={selectedImage.url}
                        alt={selectedImage.imagePrompt}
                        width={selectedImage.width}
                        height={selectedImage.height}
                        placeholder="blur"
                        blurDataURL={selectedImage.blurDataURL}
                        className="mx-auto max-h-screen w-auto rounded-lg"
                      />
                    </ExternalLink>

                    <ZoomedOverlay
                      imageId={selectedImage.id}
                      imageAuthorURL={selectedImage.imageAuthorURL}
                      imageAuthorProfilePicture={
                        selectedImage.imageAuthorProfilePicture
                      }
                      imagePrompt={selectedImage.imagePrompt}
                      likesCount={selectedImage.likesCount}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Layout>
  );
};

export async function getStaticProps() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing the MongoDB URI');
  }

  const mongoDB_client = new MongoClient(process.env.MONGODB_URI);
  await mongoDB_client.connect();

  const db = mongoDB_client.db(process.env.MONGODB_DB);

  const collection = db.collection('AIGallery');

  /**
   * TODO: Do this with pagination
   */
  const dbEntries = await collection.find({}).toArray();

  const formattedDBEntries = dbEntries.map((item) => {
    return {
      id: item.imageId,
      prompt: item.prompt,
      publishedAt: dayjs.unix(item.timestamp).format('MMMM D, YYYY'),
      extension: item.extension,
      imageAuthor: item.imageAuthor,
      likesCount: item.likesCount || 0,
      imageURL: `https://cdn.jsdelivr.net/gh/megasanjay/aigallery/${item.imageId}.${item.extension}`,
    };
  });

  const totalNumberOfImages = formattedDBEntries.length;

  const posts = await Promise.all(
    formattedDBEntries.map(async (post: Post, index: number) => {
      // eslint-disable-next-line no-console
      console.log(
        `Generating placeholder for ${post.imageURL} - (${
          index + 1
        }/${totalNumberOfImages})`,
      );

      const {
        base64,
        // eslint-disable-next-line unused-imports/no-unused-vars
        img: { width, height, ...img },
      } = await getPlaiceholder(post.imageURL);

      const imageMeta = await probe(post.imageURL);

      return {
        ...img,

        width: imageMeta.width,
        height: imageMeta.height,
        ...post,
        blurDataURL: base64,
      };
    }),
  ).then((values) => values);

  // sort posts by date in ascending order
  posts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  );

  return {
    props: {
      posts,
    },
  };
}

export default GalleryPage;
