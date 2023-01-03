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
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { HiClipboardCopy } from 'react-icons/hi';
import { IoCloseCircleSharp } from 'react-icons/io5';

import 'react-accessible-accordion/dist/fancy-example.css';

import client from '@/lib/client';
import {
  galleryContainer,
  galleryItem,
  textContainer,
  textItem,
} from '@/lib/framer';

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
              Gallery
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, translateY: 100 },
                show: { opacity: 1, translateY: 0 },
              }}
            >
              This is a collection of images that I have generated using a
              variety of different AI models. I have also included the prompt
              that I used to generate the image. I hope you enjoy them!
            </motion.p>
          </motion.div>
        </section>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="columns-1 py-8 sm:columns-2 md:columns-3"
        >
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
              <motion.article
                variants={galleryItem}
                className="umami--click--gallery-image cursor-pointer px-4 sm:px-2"
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
                <div className="group relative mb-8 h-full w-full">
                  <Image
                    src={mainImage}
                    alt=""
                    width={width}
                    height={height}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="rounded-lg"
                  />

                  <div className="overlay absolute bottom-0 h-14 w-full px-4 pt-6 opacity-0 transition-all  group-hover:opacity-100">
                    <div className="text-right text-sm text-gray-200">
                      {dayjs(publishedAt).format('MMMM D, YYYY')}
                    </div>
                  </div>
                </div>
              </motion.article>
            ),
          )}
        </motion.div>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    className="flex w-full cursor-pointer justify-end pb-4 text-slate-800 transition-all hover:text-slate-600 sm:hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    <IoCloseCircleSharp size={30} />
                  </div>

                  <ExternalLink href={selectedImage.url}>
                    <Image
                      src={selectedImage.url}
                      alt=""
                      width={selectedImage.width}
                      height={selectedImage.height}
                      placeholder="blur"
                      blurDataURL={selectedImage.blurDataURL}
                    />
                  </ExternalLink>

                  <Accordion allowZeroExpanded className="mt-2">
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>Details</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div className="flex flex-wrap items-center ">
                          <span>Generated by </span>

                          <a
                            href={selectedImage.imageAuthorURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={selectedImage.imageAuthorProfilePicture}
                              alt=""
                              width={40}
                              height={40}
                              className="ml-2 rounded-full"
                            />
                          </a>
                          <span>
                            on{' '}
                            {dayjs(selectedImage.publishedAt).format(
                              'ddd, MMMM D YYYY',
                            )}{' '}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400"></div>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>Prompt</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>{selectedImage.imagePrompt}</p>
                        <div className="flex justify-end ">
                          <HiClipboardCopy
                            size={25}
                            className="cursor-pointer rounded-lg hover:bg-slate-200"
                            onClick={() => {
                              copyToClipboard(selectedImage.imagePrompt);
                            }}
                          />
                        </div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
