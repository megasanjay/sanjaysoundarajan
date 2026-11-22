import * as React from 'react';
import { BrowserView } from 'react-device-detect';

import Header from '@/components/layout/Header';
import Neko from '@/components/layout/Neko';
import LetterGlitch from '@/components/LetterGlitch';
import Snow from '@/components/Snow';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className="relative h-full">
      <LetterGlitch
        glitchColors={['#64748b', '#f97316', '#10b981']}
        glitchSpeed={150}
        centerVignette={false}
        outerVignette={false}
      />

      <Snow />

      <Header />

      {children}

      <BrowserView>
        <Neko />
      </BrowserView>
    </div>
  );
}
