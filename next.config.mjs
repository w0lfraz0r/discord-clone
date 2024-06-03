/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io'],
    },

    typescript: {
        ignoreBuildErrors: true,
    },

    eslint: {
        ignoreBuildErrors: true,
    },

    swcMinify: true,

};

export default nextConfig;
