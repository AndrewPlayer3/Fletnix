/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        HOST_NAME: process.env.HOST_NAME, // Domain being used e.g. http://localhost:3000 or https://fletnix.vercel.app
        ALLOW_ROLES: process.env.ALLOW_ROLES, // User's can choose their own roles at signup, true or false
        MONGODB_URL: process.env.MONGODB_URL, // Authenticated URL pointing to the mongodb.
        NEXTAUTH_URL: process.env.NEXTAUTH_URL, // This should be the same as HOSTNAME
        JWT_SECRET: process.env.JWT_SECRET, // Secret used for JWT for authentication
        GOOGLE_STORAGE: process.env.GOOGLE_STORAGE, // Google storage link with bucketname e.g. https://storage.googleapis.com/<BUCKET_NAME>
        GOOGLE_BUCKET_NAME: process.env.GOOGLE_BUCKET_NAME, // Name of the storage bucket in google cloud.
        GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID, // These last three come from your json key for your cloud storage service worker.
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY, // --
        GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL, // --
    },
    images: {
        domains: [
            'i.imgur.com',
            'i.ytimg.com',
            'storage.googleapis.com',
            'localhost',
            'fletnix.vercel.app',
            'fletnix-git-dev-andrewplayer3.vercel.app',
        ],
    },
}
