// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path")

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // Development mode only – highlights potential problems.
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `@import "utilities.scss";`, // Scss code that'd be prepended to every single scss file.
  },
}

module.exports = nextConfig
