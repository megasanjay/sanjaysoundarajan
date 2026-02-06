import { motion } from 'framer-motion';
import Head from 'next/head';
import * as React from 'react';

import { textContainer, textItem } from '@/lib/framer';

import Layout from '@/components/layout/Layout';

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
      { label: 'GPU', value: 'Gigabyte Aorus RTX 5090' },
      { label: 'RAM', value: '32GB DDR5 6000MHz CL30' },
      {
        label: 'Storage',
        value:
          '2TB PCIe 5.0 x2 NVMe SSD • 2TB PCIe 3.0 x4 NVMe SSD • 4TB PCIe 4.0 x4 NVMe SSD',
      },
      { label: 'Motherboard', value: 'ASRock X870E Nova' },
      { label: 'PSU', value: 'Lian Li Edge 1300W' },
      { label: 'Case', value: 'Lian Li O11D EVO RGB' },
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
    title: 'Framework Laptop 13',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 5 7640U' },
      { label: 'RAM', value: '64GB DDR5 6000MHz' },
      { label: 'Storage', value: '1TB NVMe SSD' },
    ],
  };

  const laptop2Specs: HardwareSection = {
    title: 'MacBook Pro',
    specs: [
      { label: 'CPU', value: 'Apple M4' },
      { label: 'RAM', value: '24GB Unified Memory' },
      { label: 'Storage', value: '1TB  SSD' },
    ],
  };

  const SpecSection: React.FC<{
    section: HardwareSection;
    icon?: React.ReactNode;
    subtitle?: string;
    highlights?: string[];
  }> = ({ section, icon = '🧩', subtitle, highlights }) => {
    return (
      <motion.section
        variants={textItem}
        className="
          mt-8 w-full rounded-xl
          border border-slate-200/70
          bg-white/50
          p-5
          shadow-[0_1px_0_0_rgba(15,23,42,0.06)]
          transition-all
          hover:border-slate-300/80
          hover:-translate-y-0.5
          hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)]
        "
      >
        <header className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2
              className="
                inline-flex items-center gap-2
                text-2xl font-bold text-slate-900
                leading-none
              "
            >
              <span className="shrink-0 leading-none">{icon}</span>
              <span className="leading-none">{section.title}</span>
            </h2>

            {subtitle ? (
              <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
            ) : null}

            {highlights?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-slate-200/70 px-2.5 py-1 text-xs text-slate-700"
                  >
                    {h}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <dl className="mt-4 divide-y divide-slate-200/70">
          {section.specs.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-12 sm:gap-4"
            >
              <dt className="sm:col-span-4 text-sm font-medium text-slate-600">
                {spec.label}
              </dt>
              <dd className="sm:col-span-8 text-sm text-slate-900">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.section>
    );
  };



  return (
    <Layout>
      <Head>
        <title> Hardware | Sanjay Soundarajan </title>
      </Head>

      <main className="min-h-[calc(100vh-56px)] h-full">
        <section className="mx-auto w-full max-w-screen-lg px-3 pb-32 pt-10 md:pt-20">
          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl px-4 py-6"
          >
            <motion.h1
              variants={textItem}
              className="mb-4 mt-4 inline-flex items-center gap-2 text-5xl font-bold leading-none text-slate-900"
            >
              <span className="leading-none">Hardware</span>
              <span className="leading-none">💻</span>
            </motion.h1>

            <motion.p variants={textItem} className="mt-4 font-medium">
              Here&apos;s a list of the hardware I use for development and
              everyday computing.
            </motion.p>

            <SpecSection
              section={desktopSpecs}
              icon="🖥️"
              subtitle="Main Workstation + Gaming Rig"
              highlights={['Ryzen 7 9800X3D', 'RTX 5090', '32GB DDR5', 'QD-OLED 165Hz']}
            />

            <SpecSection
              section={laptop1Specs}
              icon="🧰"
              subtitle="Modular Dev Laptop"
            />

            <SpecSection
              section={laptop2Specs}
              icon="🍎"
              subtitle="MacOS Workflow"
            />
          </motion.div>
        </section>
      </main>
    </Layout>
  );
}
