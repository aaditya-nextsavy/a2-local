// const path = require("path");

// module.exports = {
//   i18n: {
//     locales: ["en", "ar"],
//     defaultLocale: "en",
//     localeDetection: true,
//   },
//   fallbackLng: "en",                   // only for next-i18next
//   localePath: path.resolve("./common/lang"), // only for next-i18next
// };


// const path = require("path");

// module.exports = {
//   i18n: {
//     locales: ["en", "ar"],
//     defaultLocale: "en",
//     localeDetection: true,
//   },
//   fallbackLng: "en",                   // only for next-i18next
//   localePath: path.resolve("./common/lang"), // only for next-i18next
// };


const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",

    // Next.js 16 compatible
    localeDetection: null,

    // next-i18next format for fallbacks
    fallbackLng: {
      default: ["en"],
    },

    localePath: path.resolve("./common/lang"),
  },
};
