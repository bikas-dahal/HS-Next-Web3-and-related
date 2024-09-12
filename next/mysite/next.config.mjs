/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: ['assets.aceternity.com']
    }
};

export default nextConfig;
