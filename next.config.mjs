/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.microcms-assets.io" },
            { protocol: "https", hostname: "placehold.jp" },
            { protocol: "https", hostname: "gvayshulvhrhgifiubtk.supabase.co" },
        ],
    },
};

export default nextConfig;
