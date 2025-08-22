import { AppProps } from 'next/app';
import { useEffect } from 'react';

import '@/styles/globals.css';
import 'react-tippy/dist/tippy.css';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    __CONSOLE_LOGGED__?: boolean;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Only log once, even in development mode
    if (typeof window !== 'undefined' && !window.__CONSOLE_LOGGED__) {
      window.__CONSOLE_LOGGED__ = true;

      // Nice hello artwork for console
      // eslint-disable-next-line no-console
      console.log(
        '%c' +
          `
██╗  ██╗██╗
██║  ██║██║
███████║██║
██╔══██║██║
██║  ██║██║
╚═╝  ╚═╝╚═╝

(｡◕‿◕｡) Hey there! Welcome to my portfolio!
I'm a developer who loves building cool stuff.

🔗 GitHub: https://github.com/megasanjay
   Check out my other projects and contributions!

📦 Repo: https://github.com/megasanjay/sanjaysoundarajan
   Interested in knowing how I built this? Here's the source code!

🎨 Built with Next.js, TypeScript & Tailwind CSS
   Smooth animations and modern design included!

💡 Feel free to fork, modify, or use this as inspiration!
   If you like what you see, consider giving it a star! ⭐
          `,
        'color: #3b82f6; font-family: monospace; font-size: 12px; line-height: 1.2;',
      );
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
