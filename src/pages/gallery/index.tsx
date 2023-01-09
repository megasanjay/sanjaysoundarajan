/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import groq from 'groq';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import probe from 'probe-image-size';
import { Fragment, useState } from 'react';
import { HiClipboardCopy } from 'react-icons/hi';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'react-accessible-accordion/dist/fancy-example.css';

import client from '@/lib/client';
import { textContainer, textItem } from '@/lib/framer';

import Layout from '@/components/layout/Layout';
import ExternalLink from '@/components/links/ExternalLink';

type ModalProps = {
  url: string;
  width: number;
  height: number;
  blurDataURL: string;
  imageAuthorProfilePicture: string;
  imagePrompt: string;
  imageAuthorURL: string;
  publishedAt: string;
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
    imageAuthorProfilePicture: '',
    imageAuthorURL: '',
    imagePrompt: '',
    publishedAt: '',
  });

  const handleImageClick = async (
    image: string,
    width: number,
    height: number,
    blurDataURL: string,
    imageAuthorProfilePicture: string,
    imageAuthorURL: string,
    imagePrompt: string,
    publishedAt: string,
  ) => {
    setIsOpen(!isOpen);
    setSelectedImage({
      url: image,
      width,
      height,
      blurDataURL,
      imageAuthorProfilePicture,
      imageAuthorURL,
      imagePrompt,
      publishedAt,
    });
  };

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
  };

  const notify = () => toast.success('Prompt copied to clipboard!');

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
              className="mt-4 mb-4 text-left text-5xl font-bold "
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
              This is a collection of images that I have generated using a
              variety of different AI models. I have also included the prompt
              that I used to generate the image. I hope you enjoy them!
            </motion.p>
          </motion.div>
        </section>

        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}
        >
          <Masonry columnsCount={3}>
            {posts.map(
              ({
                title = '',
                publishedAt = '',
                mainImage = '',
                width,
                height,
                blurDataURL,
                imageAuthorProfilePicture,
                imagePrompt,
                imageAuthorURL,
              }) => (
                <div
                  className="group relative mx-2 mb-3 w-auto md:px-0"
                  key={title}
                  onClick={() => {
                    handleImageClick(
                      mainImage,
                      width,
                      height,
                      blurDataURL,
                      imageAuthorProfilePicture,
                      imageAuthorURL,
                      imagePrompt,
                      publishedAt,
                    );
                  }}
                >
                  <Image
                    src={mainImage}
                    alt=""
                    width={width}
                    height={height}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="w-full rounded-lg"
                  />

                  <div className="overlay absolute bottom-[-1px] h-14 w-full rounded-lg px-4 pt-6 opacity-0 transition-all group-hover:bottom-0 group-hover:opacity-100">
                    <div className="text-right text-sm text-gray-200">
                      {dayjs(publishedAt).format('MMMM D, YYYY')}
                    </div>
                  </div>
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
                        alt=""
                        width={selectedImage.width}
                        height={selectedImage.height}
                        placeholder="blur"
                        blurDataURL={selectedImage.blurDataURL}
                        className="mx-auto max-h-screen w-auto rounded-lg"
                      />
                    </ExternalLink>

                    <div className="overlay absolute bottom-[-5px] flex h-max w-full flex-col rounded-lg px-4 pt-6 text-slate-300 opacity-0 transition-all group-hover:bottom-0 group-hover:opacity-100">
                      <div className="flex flex-wrap items-center justify-start text-sm ">
                        <span>Generated by </span>
                        <a
                          href={selectedImage.imageAuthorURL}
                          target="_blank"
                          rel="noopener noreferrer "
                        >
                          <Image
                            src={selectedImage.imageAuthorProfilePicture}
                            alt=""
                            width={30}
                            height={30}
                            className="ml-2 rounded-full transition-opacity hover:opacity-70"
                          />
                        </a>
                      </div>
                      <div className="flex items-center justify-between space-x-2 pt-1 pb-3 text-sm ">
                        <p>{selectedImage.imagePrompt}</p>
                        <div className="flex justify-end text-slate-100">
                          <HiClipboardCopy
                            size={25}
                            className="cursor-pointer rounded-lg transition-all hover:text-slate-300"
                            onClick={() => {
                              copyToClipboard(selectedImage.imagePrompt);
                              notify();
                            }}
                          />
                        </div>
                      </div>
                    </div>
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

type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  imageAuthor: string;
  mainImage: string;
};

export async function getStaticProps() {
  const listOfPosts = await client.fetch(groq`
      *[_type == "post" && publishedAt  < now()] | order(publishedAt desc)
      {
        title,
        slug,
        publishedAt,
        imageAuthor,
        imagePrompt,
        "mainImage": mainImage.asset->url,
        "imageAuthor": imageAuthor->name,
        "imageAuthorProfilePicture": imageAuthor->image.asset->url,
        "imageAuthorURL": imageAuthor->link
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
