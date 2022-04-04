/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    mongodburl: "mongodb://localhost:27017",
    NEXTAUTH_URL: "http://localhost:3000",
    JWT_SECRET: 'VerySecretString'
  },
  images: {
    domains: ["i.imgur.com", "i.ytimg.com"],
  }
}
