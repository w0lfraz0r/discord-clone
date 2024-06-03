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

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline';",
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer-when-downgrade',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
