/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  async redirects() {
    return [
      {
        source: '/gallery',
        destination: '/',
        permanent: true,
      },
    ];
  },

  images: {
    domains: [
      'images.unsplash.com',
      'opengraph.githubassets.com',
      'cdn.sanity.io',
      'raw.githubusercontent.com',
      'cdn.jsdelivr.net',
    ],
  },

  reactStrictMode: true,

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
