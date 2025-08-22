import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';
import urlMetadata from 'url-metadata';

import Layout from '@/components/layout/Layout';
import TechTooltip from '@/components/techTooltip/techTooltip';

type portfolioType = {
  title: string;
  id: string;
  image: string;
  description: string;
  tech: string[];
  github: string;
  url?: string;
};

type EEType = {
  title: string;
  id: string;
  description: string;
  tech: string[];
  github: string;
  url?: string;
  npm?: string;
  ogImage: string;
  badges: string[];
};

import initialJSON from '~/data/ee.json';
import projectsJSON from '~/data/projects.json';

interface PageProps {
  eeJSON: EEType[];
}

const Projects: React.FC<PageProps> = ({ eeJSON }) => {
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
        <title> Projects | Sanjay Soundarajan </title>
      </Head>

      <main className="divide-y ">
        <section className="mx-auto flex w-full max-w-screen-lg flex-col px-3 pt-10 md:pt-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center px-4 text-left text-xl text-slate-800"
          >
            <motion.h1
              variants={item}
              className="mb-2 mt-4 text-left text-5xl font-bold "
            >
              Projects 🛠️
            </motion.h1>

            <motion.p variants={item} className="mt-4">
              A list of all the things I have been a part of. All of these
              projects are open source so you can check them out on GitHub.
            </motion.p>

            <motion.span variants={item} className="mt-2 hidden text-xs italic">
              psst... I&apos;m listing everything here since it is fun to see
              all the projects I&apos;ve been a part of.
            </motion.span>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 flex w-full flex-col items-start justify-center divide-y px-4 text-left text-xl text-slate-800"
          >
            {projectsJSON.map((project: portfolioType) => (
              <motion.article
                key={project.title}
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex w-full flex-col px-3 py-4 pt-8 "
              >
                <motion.h2
                  variants={item}
                  className="mb-1 text-3xl font-bold md:pl-10"
                >
                  {project.title}
                </motion.h2>

                <motion.div
                  variants={item}
                  className="flex w-full flex-col py-2 md:flex-row md:items-start md:justify-around md:px-3"
                >
                  <div className="md:w-5/12">
                    <Image
                      src={project.image}
                      alt={`screenshots of ${project.title}`}
                      width="1342"
                      height="975"
                      priority={true}
                    />
                  </div>

                  <div className="flex flex-col md:w-6/12">
                    <p className="pt-1 text-base font-normal">
                      {project.description}
                    </p>

                    <div className="my-4 flex flex-wrap items-center ">
                      {project.tech.map((tech: string) => (
                        <TechTooltip key={tech} tech={tech} />
                      ))}
                    </div>

                    <div className="my-2 flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center transition-all hover:text-amber-500 pl-2"
                        data-umami-event="Projects"
                        data-umami-event-type="GitHub link"
                        data-umami-event-id={project.id}
                      >
                        <Icon
                          icon="ant-design:github-filled"
                          width="25"
                          height="25"
                        />
                      </a>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center transition-all hover:text-amber-500 "
                        data-umami-event="Projects"
                        data-umami-event-type="Demo link"
                        data-umami-event-id={project.id}
                      >
                        <Icon
                          icon="akar-icons:link-out"
                          width="20"
                          height="20"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section className="mx-auto flex w-full max-w-screen-lg flex-col px-3 pb-32 pt-10 md:pt-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-start justify-center px-4 text-left text-xl text-slate-800"
          >
            <motion.h1
              variants={item}
              className="mb-2 mt-4 text-left text-5xl font-bold "
            >
              Everything else...
            </motion.h1>

            <motion.p variants={item} className="mt-4">
              Occasionally I work on projects that are born out of curiosity.
              The following list includes components, libraries, demos, starter
              templates and anything else that piqued my interest. All of these
              projects are open source so you can check them out on GitHub.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 flex w-full flex-col items-start justify-center divide-y px-4 text-left text-xl text-slate-800"
          >
            {eeJSON.map((project: EEType) => (
              <motion.article
                key={project.title}
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex w-full flex-col px-3 py-4 pt-8 "
              >
                <motion.h2
                  variants={item}
                  className="mb-1 text-3xl font-bold md:pl-10"
                >
                  {project.title}
                </motion.h2>

                <motion.div
                  variants={item}
                  className="flex w-full flex-col py-2 md:flex-row md:items-center md:justify-around md:px-3"
                >
                  <div className="rounded-lg pb-5 md:w-5/12">
                    <Image
                      src={project.ogImage}
                      alt={`GitHub overview page for ${project.title}`}
                      width="1200"
                      height="600"
                      priority={true}
                      className="shadow-md"
                    />
                  </div>

                  <div className="flex flex-col md:w-6/12">
                    <p className="text-base font-normal">
                      {project.description}
                    </p>

                    <div className="my-4 flex space-x-2">
                      {project.badges.map((url: string) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={url}
                          src={url}
                          alt="badge"
                          className="h-[10x] w-auto"
                        />
                      ))}
                    </div>

                    <div className="my-4 flex flex-wrap space-x-2">
                      {project.tech.map((tech: string) => (
                        <TechTooltip key={tech} tech={tech} />
                      ))}
                    </div>

                    <div className="my-2 flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center transition-all hover:text-amber-500 pl-2"
                        data-umami-event="Everything Else"
                        data-umami-event-type="GitHub link"
                        data-umami-event-id={project.id}
                      >
                        <Icon
                          icon="ant-design:github-filled"
                          width="25"
                          height="25"
                        />
                      </a>
                      {project.npm && (
                        <a
                          href={project.npm}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center transition-all hover:text-amber-500"
                          data-umami-event="Everything Else"
                          data-umami-event-type="Npm link"
                          data-umami-event-id={project.id}
                        >
                          <Icon icon="carbon:logo-npm" width="25" height="25" />
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center transition-all hover:text-amber-500"
                          data-umami-event="Everything Else"
                          data-umami-event-type="Demo link"
                          data-umami-event-id={project.id}
                        >
                          <Icon
                            icon="akar-icons:link-out"
                            width="20"
                            height="20"
                          />
                        </a>
                      )}
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
};

export async function getStaticProps() {
  const eeJSON = [];

  for (const project of initialJSON) {
    let ogImage = `https://images.unsplash.com/photo-1661516268426-271d93461c17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await urlMetadata(project.github).then(function (metadata: any) {
      if (metadata['og:image'] && metadata['og:image'] !== '') {
        ogImage = metadata['og:image'];
      }
    });

    eeJSON.push({
      ...project,
      ogImage,
    });
  }

  return {
    props: {
      eeJSON,
    },
  };
}

export default Projects;
