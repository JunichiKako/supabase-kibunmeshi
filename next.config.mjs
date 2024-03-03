/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.microcms-assets.io" },
            { protocol: "https", hostname: "placehold.jp" },
        ],
    },
};

export default nextConfig;
