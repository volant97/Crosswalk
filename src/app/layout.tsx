import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/components/provider/Provider';
import type { Props } from '@/types/childrenPropsType copy';

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
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <link rel="manifest" href="/manifest.json" />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
