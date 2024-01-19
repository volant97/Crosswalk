import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        virgil: ['"Virgil 3 YOFF"'],
        pretendard: ['Pretendard-Regular']
      },
      colors: {
        black: '#222',
        customRed: '#FF1400',
        customYellow: '#FFF200',
        customGreen: '#05F600',
        customGreen2: '#F1FCED',
        lightRed: '#FF002E',
        lightGreen: '#ACFF8E',
        melona: '#F1FCED',
        gray: {
          F3: '#F3F3F3' /* F3F3F3 */,
          EF: '#EFEFEF' /* EFEFEF */,
          E9: '#E9E9E9' /* E9E9E9 */,
          E6: '#E6E6E6' /* E6E6E6 */,
          DDD: '#DDDDDD' /* DDDDDD */,
          D9: '#D9D9D9' /* D9D9D9 */,
          AAA: '#AAAAAA' /* AAAAAA */,
          999: '#999999' /* 999999 */,
          888: '#888888' /* 888888 */,
          666: '#666666' /* 666666 */,
          F6: '#F6F6F6' /* F6F6F6 */,
          FA: '#FAFAFA' /* FAFAFA */
        }
      },
      boxShadow: {
        navBarShadow: '0 0 20px 0 rgba(2, 7, 50, 0.08)'
      }
    }
  },
  plugins: [nextui()]
};
export default config;
