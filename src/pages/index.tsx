import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';

import StyledButton from '@/components/buttons/StyledButton';
import Layout from '@/components/layout/Layout';
import StyledLink from '@/components/links/StyledLink';
import LottieAnimation from '@/components/lotties';

import heroLottie from '~/lotties/hi.json';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, translateY: 100 },
    show: { opacity: 1, translateY: 0 },
  };

  return (
    <Layout>
      <title>Home</title>

      <main>
        <section className='mx-auto flex  w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-20 md:pt-40 '>
          <div className='mb-16 flex w-full justify-center md:justify-start '>
            <LottieAnimation
              animationData={heroLottie}
              width={250}
              height={250}
            />
          </div>

          <motion.div
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='flex flex-col items-start justify-center px-4 text-center '
          >
            <motion.h1
              variants={item}
              className='mt-4 text-left text-5xl font-bold md:text-5xl'
            >
              Hi! I&apos;m Sanjay
            </motion.h1>

            <motion.p
              variants={item}
              className='mt-4 text-left text-2xl  text-slate-800 md:text-2xl'
            >
              I currently work as a front end developer at the{' '}
              <StyledLink href='https://fairdataihub.org'>
                FAIR Data Innovations Hub
              </StyledLink>{' '}
              where I build tools for data submission and open science.
            </motion.p>

            <motion.div variants={item} className='mt-4'>
              <Link href='/about' passHref>
                <div className='mt-4'>
                  <StyledButton>About Me</StyledButton>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}
