import * as React from 'react';

import Header from '@/components/layout/Header';
import Neko from '@/components/layout/Neko';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <Header />
      {children}
      <div className="hidden sm:block">
        <Neko />
      </div>
    </>
  );
}
