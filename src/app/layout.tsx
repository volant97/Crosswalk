import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/components/provider/Provider';
import type { Props } from '@/types/childrenPropsType copy';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Crosswalk',
  description: 'Meet your soulmate of your life',
  icons: {
    icon: '/favicon.png'
  }
};

export default function HTMLLayout({ children }: Props) {
  return (
    <html lang="ko">
      <link rel="manifest" href="/manifest.json" />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
