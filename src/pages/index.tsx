import { Icon } from '@iconify/react';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import LottieAnimation from '@/components/lotties';

import heroLottie from '~/lotties/hi.json';

import StyledButton from '@/components/buttons/StyledButton';
import Layout from '@/components/layout/Layout';
export default function Home() {
  return (
    <Layout>
      <Head>
        <title> Sanjay Soundarajan </title>
      </Head>

      <main className="h-[calc(100vh-56px)] flex items-center">
        <section className="mx-auto flex w-full max-w-screen-lg flex-col px-3">
          <div className="mb-16 flex w-full justify-center md:justify-start ">
            <LottieAnimation
              animationData={heroLottie}
              width={250}
              height={250}
            />
          </div>

          <div className="flex flex-col items-start justify-center px-4 text-center ">
            <h1 className="mt-4 text-left text-5xl font-bold md:text-6xl ">
              Hi! I&apos;m Sanjay
            </h1>

            <p className="mt-6 text-left text-2xl text-slate-800 md:text-3xl md:w-10/12 font-medium">
              I&apos;m a Research Software Engineer for the FAIR Data
              Innovations Hub and I build tools for open science.
            </p>

            <div className="mt-4">
              <Link href="/about" passHref>
                <div className="mt-4">
                  <StyledButton>
                    <div className="flex items-center space-x-2">
                      <Icon icon="ri:user-5-fill" width="20" height="20" />
                      <span>About Me</span>
                    </div>
                  </StyledButton>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
