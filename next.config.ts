/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'graph.facebook.com',                         // Facebook profile pics
      'platform-lookaside.fbsbx.com',               // fallback profile images
      'scontent.fcmb1-2.fna.fbcdn.net',             // FB CDN (your error)
      'scontent.xx.fbcdn.net',                       // sometimes used by FB
    ],
  },
};

module.exports = nextConfig;
