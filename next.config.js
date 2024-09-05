// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.clerk.com','giyrlrcehqsypefjoayv.supabase.co'], // Add any additional domains as needed
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'google-site-verification',
            value: 'wGNA7UCO_gV1Gpyd2ccb4kg_OvPu-1V',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
