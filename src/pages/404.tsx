import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

import StyledButton from '@/components/buttons/StyledButton';
import Layout from '@/components/layout/Layout';
import LottieAnimation from '@/components/lotties';

import heroLottie from '~/lotties/404.json';

export default function NotFoundPage() {
  return (
    <Layout>
      <Head>
        <title> 404 | Unable to find resource </title>
      </Head>

      <main>
        <section className="bg-white">
          <div className="layout -mt-20 flex min-h-screen flex-col items-center justify-center text-center text-black">
            <LottieAnimation
              animationData={heroLottie}
              width={300}
              height={300}
            />
            <h1 className="mt-8 text-5xl ">Nothing to see here.</h1>
            <p className="mt-4 max-w-xl text-xl">
              Unfortunately, this is only a 404 page. You may have mistyped the
              address, or the page has been moved to another URL.
            </p>
            <Link href="/" passHref>
              <div className="mt-8">
                <StyledButton>Take me back to the home page</StyledButton>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
