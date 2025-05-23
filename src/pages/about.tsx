import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import * as React from 'react';

import { textContainer, textItem } from '@/lib/framer';

import StyledButton from '@/components/buttons/StyledButton';
import Layout from '@/components/layout/Layout';
import StyledLink from '@/components/links/StyledLink';

export default function About() {
  return (
    <Layout>
      <Head>
        <title> About | Sanjay Soundarajan </title>
      </Head>

      <main className="min-h-[calc(100vh-56px)] h-full">
        <section className="mx-auto flex h-full w-full max-w-screen-lg flex-col px-3 pb-32 pt-10 md:pt-20">
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center px-4 text-left text-xl text-slate-800"
          >
            <motion.h1
              variants={textItem}
              className="mb-4 mt-4 text-left text-5xl font-bold "
            >
              About me 👋
            </motion.h1>

            <motion.div variants={textItem}>
              <p className="mt-4 font-medium">
                Hello! வணக்கம்! ආයුබෝවන්! Hola!
              </p>

              <p className="mt-4">
                I&apos;m a web developer who loves wearing many software
                engineering hats.
              </p>

              <p className="mt-4">
                I originally grew up in Sri Lanka{' '}
                <Icon
                  icon="twemoji:flag-sri-lanka"
                  height="18"
                  className="mr-2 inline"
                />
                but ended up moving to California to attend college. After
                graduating from California State University, Fresno with a
                master&apos;s degree in Computer Science (focus on parallel
                computing), I joined the{' '}
                <StyledLink
                  href="https://fairdataihub.org"
                  data-umami-event="FAIR Data Innovations Hub link"
                >
                  FAIR Data Innovations Hub
                </StyledLink>{' '}
                team at{' '}
                <StyledLink
                  href="https://calmi2.org"
                  data-umami-event="CALMII link"
                >
                  California Medical Innovations Institute
                </StyledLink>{' '}
                where I work on developing web based software applications.
              </p>

              <p className="mt-4">
                At the moment, I create apps with Electron, Vue, Nuxt, Next.js,
                and Python. Check out some of the things I&apos;ve{' '}
                <StyledLink href="/projects"> worked </StyledLink> on.
              </p>

              <p className="mt-4">
                If you would like to see some of the publications that I&apos;ve
                authored or been a part of, checkout the
                <StyledLink href="/publications"> publications </StyledLink>
                section. I am very much a proponent of open access, so if you
                are interested in reading my works, please reach out to me at{' '}
                <StyledLink
                  href="mailto:contact@sanjaysoundarajan.dev"
                  data-umami-event="Contact me - email link"
                >
                  contact@sanjaysoundarajan.dev
                </StyledLink>{' '}
                or use the &apos;Contact Me&apos; form button below. I can send
                you the full text if required.
              </p>

              <p className="mt-4">
                If there is something more that you would like to know about me,
                or if I can help you in some way, please don&apos;t hesitate to
                reach out.
              </p>
            </motion.div>

            <motion.div
              variants={textItem}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div data-umami-event="View resume - form button">
                <StyledLink href="/resume/SanjaySoundarajan-Resume.pdf">
                  <StyledButton>
                    <div className="flex items-center space-x-2 text-base">
                      <Icon icon="mdi:resume" width="20" height="20" />

                      <span>View my Resume</span>
                    </div>
                  </StyledButton>
                </StyledLink>
              </div>

              <div
                data-tally-open="wdWpJo"
                data-tally-width="390"
                data-tally-overlay="1"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
                data-umami-event="Contact me - form button"
              >
                <StyledButton>
                  <div className="flex items-center space-x-2 text-base">
                    <Icon icon="mdi:email-edit" width="20" height="20" />

                    <span>Contact Me</span>
                  </div>
                </StyledButton>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}
