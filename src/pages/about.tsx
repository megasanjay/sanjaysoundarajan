import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import * as React from 'react';

import StyledButton from '@/components/buttons/StyledButton';
import Layout from '@/components/layout/Layout';
import StyledLink from '@/components/links/StyledLink';

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        ease: 'anticipate',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, translateY: 100 },
    show: { opacity: 1, translateY: 0 },
  };

  return (
    <Layout>
      <title>About Me</title>
      <main>
        <section className="mx-auto flex  w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-10 md:pt-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center px-4 text-left text-xl text-slate-800"
          >
            <motion.h1
              variants={item}
              className="mt-4 mb-4 text-left text-5xl font-bold "
            >
              About me 👋
            </motion.h1>

            <motion.div variants={item}>
              <p className="mt-4">Hello! வணக்கம்! ආයුබෝවන්! Hola!</p>

              <p className="mt-4">
                I&apos;m a front end web developer who loves wearing many
                software engineering hats.
              </p>

              <p className="mt-4 ">
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
                  className="umami--click--calmii-link"
                >
                  FAIR Data Innovations Hub
                </StyledLink>{' '}
                team at{' '}
                <StyledLink
                  href="https://calmi2.org"
                  className="umami--click--calmii-link"
                >
                  California Medical Innovations Institute
                </StyledLink>{' '}
                where I work on developing web based software applications.
              </p>

              <p className="mt-4">
                At the moment, I create apps with Electron, Vue, Next.js, and
                Python. Check out some of the things I&apos;ve{' '}
                <StyledLink
                  href="/projects"
                  className="umami--click--projects-link"
                >
                  {' '}
                  worked{' '}
                </StyledLink>{' '}
                on.
              </p>

              <p className="mt-4">
                If you would like to see some of the publications that I&apos;ve
                authored or been a part of, checkout the
                <StyledLink
                  href="/publications"
                  className="umami--click--publications-link"
                >
                  {' '}
                  publications{' '}
                </StyledLink>
                section. I am very much a part of
                <span className="text-sky-500"> #OpenScience </span>
                so if you are interested in reading my works, please reach out
                to me at{' '}
                <StyledLink
                  href="mailto:contact@sanjaysoundarajan.dev"
                  className="umami--click--contact-me-email-link"
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

            <motion.div variants={item} className="mt-4">
              <a
                href="https://tally.so#tally-open=wdWpJo&tally-overlay=1&tally-emoji-text=👋&tally-emoji-animation=wave&tally-auto-close=5000"
                className="umami--click--contact-me-form-button"
              >
                <div className="mt-4">
                  <StyledButton>Contact Me</StyledButton>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}
