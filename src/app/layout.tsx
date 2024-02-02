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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                document.addEventListener('focusin', function(e) {
                  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    document.body.style.zoom = '80%'; // 입력 요소에 포커스가 들어올 때 전체 body를 축소
                  }
                });

                document.addEventListener('focusout', function() {
                  document.body.style.zoom = '100%'; // 입력 요소에서 포커스가 빠져나가면 다시 원래 크기로 복원
                });
              `
          }}
        />
      </Head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
