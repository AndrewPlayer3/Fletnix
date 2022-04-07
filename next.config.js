/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    HOSTNAME: 'https://fletnix.vercel.app',
    mongodburl: process.env.mongodburl,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_STORAGE: process.env.GOOGLE_STORAGE,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_BUCKET_NAME: process.env.GOOGLE_BUCKET_NAME
  },
  images: {
    domains: ["i.imgur.com", "i.ytimg.com", "storage.googleapis.com"],
  }
}