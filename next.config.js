// const { i18n } = require("./next-i18next.config");

// const nextConfig = {
//   i18n,
//   reactStrictMode: false,
//   images: {
//     quality: 75,
//     qualities: [30, 60, 75],
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'manage.athaararabia.com',
//         pathname: '/**'
//       },
//     ],
//   },
//   trailingSlash: false,

//   // generateBuildId: async () => {
//   //   return 'athararabia-20231016-105459'
//   // },
// };

// module.exports = {
 
//   ...nextConfig,
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(mp4|webm)$/,
//       use: {
//         loader: 'file-loader',
//         options: {
//           publicPath: '/_next',
//           name: 'static/videos/[name].[hash].[ext]', // You can customize the output path and filename here
//         },
//       },
//     });
//     return config;
//   },
//   turbopack: false,
// };



const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    // localeDetection: i18n.localeDetection,
  },
  reactStrictMode: false,
  images: {
    // quality: 75,
    // qualities: [30, 60, 75],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "manage.athaararabia.com",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: false,
  turbopack: {}, 
  webpack: (config) => {
    // Videos
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: "asset/resource",
      generator: {
        filename: "static/videos/[name].[hash][ext]",
      },
    });
    return config;
  },
};

module.exports = nextConfig;

