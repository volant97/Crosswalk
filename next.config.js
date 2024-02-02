/** @type {import('next').NextConfig} */
// const withPlugins = require('next-compose-plugins');
// const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['opvzvzppdkhxkjybbkek.supabase.co']
  }
};

// module.exports = withPlugins(
//   [
//     [
//       withPWA,
//       {
//         pwa: {
//           dest: 'public'
//         }
//       }
//     ]
//     // 추가 플러그인 작성
//   ],
//   nextConfig
// );

module.exports = nextConfig;
