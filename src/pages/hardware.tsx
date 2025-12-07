import { motion } from 'framer-motion';
import Head from 'next/head';
import * as React from 'react';

import { textContainer, textItem } from '@/lib/framer';

import Layout from '@/components/layout/Layout';
import StyledLink from '@/components/links/StyledLink';

type HardwareSpec = {
  label: string;
  value: string;
};

type HardwareSection = {
  title: string;
  specs: HardwareSpec[];
};

export default function Hardware() {
  // Desktop specifications
  const desktopSpecs: HardwareSection = {
    title: 'Desktop',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 7 9800X3D' },
      { label: 'GPU', value: ' Gigabyte Aorus RTX 5090' },
      { label: 'RAM', value: '32GB DDR5 6000MHz CL30' },
      { label: 'Storage', value: '2TB PCIe 5.0 x2 NVMe SSD ' },
      { label: 'Storage', value: '2TB PCIe 3.0 x4 NVMe SSD' },
      { label: 'Storage', value: '4TB PCIe 4.0 x4 NVMe SSD' },
      { label: 'Motherboard', value: 'ASRock X870E Nova' },
      { label: 'PSU', value: 'Lian Li Edge 1300W' },
      { label: 'Case', value: 'Lian Li O11D EVO RGB ' },
      {
        label: 'Display',
        value: 'Alienware AW3423DWF 34-inch QD-OLED WQHD 165Hz',
      },
      { label: 'Keyboard', value: 'Razer Huntsman V3 Pro' },
      { label: 'Mouse', value: 'Razer Viper V3 Pro' },
    ],
  };

  // Laptop specifications
  const laptop1Specs: HardwareSection = {
    title: 'Laptop',
    specs: [
      { label: 'Model', value: 'Framework Laptop 3' },
      { label: 'CPU', value: 'AMD Ryzen 5 7640U' },
      { label: 'RAM', value: '64GB DDR5 6000MHz' },
      { label: 'Storage', value: '1TB NVMe SSD' },
    ],
  };

  const laptop2Specs: HardwareSection = {
    title: 'Laptop',
    specs: [
      { label: 'Model', value: 'Apple MacBook Pro ' },
      { label: 'CPU', value: 'Apple M4' },
      { label: 'RAM', value: '24GB Unified Memory' },
      { label: 'Storage', value: '1TB  SSD' },
    ],
  };

  const SpecSection: React.FC<{ section: HardwareSection }> = ({ section }) => {
    return (
      <motion.div variants={textItem} className="mt-8">
        <h2 className="mb-4 text-3xl font-bold text-slate-800">
          {section.title}
        </h2>
        <ul className="list-none space-y-2">
          {section.specs.map((spec, index) => (
            <li key={index}>
              <span className="font-semibold">{spec.label}:</span>{' '}
              <span className="">{spec.value}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <Layout>
      <Head>
        <title> Hardware | Sanjay Soundarajan </title>
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
              Hardware 💻
            </motion.h1>

            <motion.p variants={textItem} className="mt-4 font-medium">
              Here&apos;s a list of the hardware I use for development and
              everyday computing.
            </motion.p>

            <SpecSection section={desktopSpecs} />

            <motion.p variants={textItem} className="mt-4 font-medium">
              A full list of my hardware and all its RGB goodness is available
              on{' '}
              <StyledLink href="https://pcpartpicker.com/user/tinklyregion/saved/#view=JGzhK8">
                PCPartPicker
              </StyledLink>{' '}
            </motion.p>

            <SpecSection section={laptop1Specs} />
            <SpecSection section={laptop2Specs} />
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}
