/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          electron: false,
          fs: false,
          net: false,
          tls: false,
          'node:crypto': false,
          'node:stream': false,
          'node:stream/web': false,
          'node:buffer': false,
          stream: false,
          crypto: false,
          http: false,
          https: false,
          os: false,
          url: false,
          assert: false,
          zlib: false
        }
      }
      return config
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'oaidalleapiprodscus.blob.core.windows.net',
          port: '',
          pathname: '/private/**',
        },
      ],
    },
  }
  
  // Use ES module export syntax
  export default nextConfig