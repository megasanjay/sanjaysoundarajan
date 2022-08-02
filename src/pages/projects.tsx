import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import TechTooltip from '@/components/techTooltip/techTooltip';

type portfolioType = {
  title: string;
  image: string;
  description: string;
  tech: string[];
  github: string;
  url: string;
};

import projectsJSON from '~/data/projects.json';

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
      <title>Projects</title>
      <main>
        <section className='mx-auto flex  w-full max-w-screen-lg flex-col bg-white px-3 pb-32 pt-10 md:pt-20'>
          <motion.div
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='flex flex-col items-start justify-center px-4 text-left text-xl text-slate-800'
          >
            <motion.h1
              variants={item}
              className='mt-4 mb-2 text-left text-5xl font-bold '
            >
              Projects
            </motion.h1>

            <motion.p variants={item} className='mt-4'>
              A list of all the things I have been a part of. All of these
              projects are open source so you can check them out on GitHub.
            </motion.p>

            <motion.span variants={item} className='mt-2 hidden text-xs italic'>
              psst... I&apos;m listing everything here since it is fun to see
              all the projects I&apos;ve been a part of.
            </motion.span>
          </motion.div>

          <motion.div
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='mt-4 flex w-full flex-col items-start justify-center divide-y px-4 text-left text-xl text-slate-800'
          >
            {projectsJSON.map((project: portfolioType) => (
              <motion.article
                key={project.title}
                variants={container}
                initial='hidden'
                whileInView='show'
                viewport={{ once: true }}
                className='flex w-full flex-col py-4 px-3 pt-8 '
              >
                <motion.h2
                  variants={item}
                  className='mb-1 text-3xl font-bold md:pl-10'
                >
                  {project.title}
                </motion.h2>

                <motion.div
                  variants={item}
                  className='flex w-full flex-col py-2 md:flex-row md:items-start md:justify-around md:px-3'
                >
                  <div className='md:w-5/12'>
                    <Image
                      src={project.image}
                      alt='Screenshot of FAIRshare'
                      width='1342'
                      height='975'
                      priority={true}
                      objectFit='scale-down'
                    />
                  </div>

                  <div className='flex flex-col md:w-6/12'>
                    <p className='text-base font-normal'>
                      {project.description}
                    </p>

                    <div className='my-4 flex space-x-4'>
                      {project.tech.map((tech: string) => (
                        <TechTooltip key={tech} tech={tech} />
                      ))}
                    </div>

                    <div className='my-2 flex space-x-4'>
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center transition-all hover:text-sky-500'
                      >
                        <Icon
                          icon='ant-design:github-filled'
                          width='25'
                          height='25'
                        />
                      </a>
                      <a
                        href={project.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center transition-all hover:text-sky-500'
                      >
                        <Icon
                          icon='akar-icons:link-out'
                          width='20'
                          height='20'
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}
