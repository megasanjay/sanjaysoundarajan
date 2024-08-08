import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import * as React from 'react';

type publicationType = {
  title: string;
  id: string;
  authors: string;
  url: string;
  conferenceTitle?: string;
  citation?: string;
  doi: string;
  abstract?: string;
};

import StyledButton from '@/components/buttons/StyledButton';
import Layout from '@/components/layout/Layout';
import StyledLink from '@/components/links/StyledLink';

import PublicationsJSON from '~/data/publications.json';

export default function Publications() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        ease: 'easeInOut',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, translateY: 100 },
    show: { opacity: 1, translateY: 0 },
  };

  return (
    <Layout>
      <Head>
        <title> Publications | Sanjay Soundarajan</title>
      </Head>

      <main>
        <section className="mx-auto flex w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-10 md:pt-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center px-4 text-left text-xl text-slate-800"
          >
            <motion.h1
              variants={item}
              className="mb-4 mt-4 text-left text-5xl font-bold "
            >
              Publications & Research 🔬
            </motion.h1>

            <motion.p variants={item} className="mt-4">
              All my research work, that has been published (in reverse
              chronological order), is listed here. If you are interested in
              reading any specific publication, please reach out to me at{' '}
              <StyledLink
                href="mailto:contact@sanjaysoundarajan.dev"
                data-umami-event="Contact me - email link"
              >
                contact@sanjaysoundarajan.dev
              </StyledLink>{' '}
              for the full text.
            </motion.p>

            <motion.div
              variants={item}
              className="mb-4 mt-4 text-sky-500 flex space-x-3"
            >
              <StyledLink href="https://orcid.org/0000-0003-2829-8032">
                <StyledButton>
                  <div className="flex items-center space-x-2 py-1">
                    <Icon icon="academicons:orcid" width="20" height="20" />
                    <span className="text-base">View my ORCID profile</span>
                  </div>
                </StyledButton>
              </StyledLink>

              <StyledLink href="https://scholar.google.com/citations?user=4_FJnd8AAAAJ&hl=en">
                <StyledButton>
                  <div className="flex items-center space-x-2 py-1">
                    <Icon
                      icon="simple-icons:googlescholar"
                      width="20"
                      height="20"
                    />
                    <span className="text-base">
                      View my Google Scholar profile
                    </span>
                  </div>
                </StyledButton>
              </StyledLink>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 flex w-full flex-col items-start justify-center text-left text-xl text-slate-800"
          >
            {PublicationsJSON.map((publication: publicationType) => (
              <motion.li
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                key={publication.title}
                className="my-2 w-full rounded-lg border-slate-200 bg-slate-50 px-3 py-4 shadow-md"
              >
                <motion.article
                  variants={item}
                  className=" flex w-full flex-col"
                >
                  <h2 className="w-auto  text-xl">
                    <StyledLink
                      href={publication.url}
                      data-umami-event="Publications"
                      data-umami-event-type="Title url"
                      data-umami-event-id={publication.id}
                    >
                      {publication.title}
                    </StyledLink>
                  </h2>

                  <p className="text-base font-medium">{publication.authors}</p>

                  <p className="hidden text-base font-normal sm:block">
                    {publication.conferenceTitle}
                  </p>

                  {publication.doi && (
                    <div className="mt-1 flex flex-row text-sm font-normal">
                      <span className="mr-2">DOI: </span>
                      <StyledLink
                        href={publication.url}
                        className="break-all"
                        data-umami-event="Publications"
                        data-umami-event-type="DOI link"
                        data-umami-event-id={publication.id}
                      >
                        {publication.doi}
                      </StyledLink>
                    </div>
                  )}

                  <div className="my-2 h-[1px] w-full bg-slate-300" />

                  <details className="mt-2 text-base">
                    <summary
                      className="cursor-pointer"
                      data-umami-event="Publications"
                      data-umami-event-type="Expand abstract"
                      data-umami-event-id={publication.id}
                    >
                      Abstract
                    </summary>
                    <p className="my-1 rounded-md border border-gray-200 bg-slate-100 px-3 py-2 text-sm">
                      {publication.abstract}
                    </p>
                  </details>

                  {publication.citation && (
                    <details className="mt-2 text-base">
                      <summary
                        className="cursor-pointer"
                        data-umami-event="Publications"
                        data-umami-event-type="Expand citation"
                        data-umami-event-id={publication.id}
                      >
                        Citation
                      </summary>
                      <p className="relative my-1 break-all rounded-md border border-gray-200 bg-slate-100 px-3 py-2 text-sm">
                        {publication.citation}
                      </p>
                    </details>
                  )}
                </motion.article>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </main>
    </Layout>
  );
}
