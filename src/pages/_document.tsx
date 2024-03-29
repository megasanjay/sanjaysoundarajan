import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="keywords"
            content="sanjay soundarajan, web developer, fair data, sparclink, fairshare, fairdataihub"
          />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <meta name="author" content="Sanjay Soundarajan" />
          <meta property="og:type" content="website" />
          <script
            async
            defer
            data-website-id="755919fb-f6aa-4bd2-aa7a-15420fd3e4d1"
            src="https://umami.sanjaysoundarajan.dev/mushroom"
          />

          <script async src="https://tally.so/widgets/embed.js"></script>

          <meta property="og:title" content="Sanjay Soundarajan" />
          <meta property="twitter:title" content="Sanjay Soundarajan" />

          <link rel="canonical" href="https://sanjaysoundarajan.dev" />
          <meta property="og:url" content="https://sanjaysoundarajan.dev" />
          <meta
            property="twitter:url"
            content="https://sanjaysoundarajan.dev"
          />

          <meta name="description" content="Sanjay Soundarajan's portfolio" />
          <meta
            property="og:description"
            content="Sanjay Soundarajan's portfolio"
          />
          <meta
            property="twitter:description"
            content="Sanjay Soundarajan's portfolio"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
