import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/components/provider/Provider';
import { Props } from '@/types/lastMessageArrayType';

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
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
