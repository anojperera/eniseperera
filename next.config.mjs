/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // for static export + S3 images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eniseperera-media.s3.eu-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'eniseperera-media.s3.amazonaws.com',
      },
    ],
  },
  // Add any other static-friendly config here
};

export default nextConfig;
