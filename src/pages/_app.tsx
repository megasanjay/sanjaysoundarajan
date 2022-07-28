import { AppProps } from 'next/app';

import '@/styles/globals.css';
import 'react-tippy/dist/tippy.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
