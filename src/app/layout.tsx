import type { Metadata } from 'next';
import './globals.css';
import Provider from '@/components/provider/Provider';
import { Props } from '@/types/childrenPropsType';

export const metadata: Metadata = {
  title: 'Crosswalk',
  description: 'Meet your soulmate of your life'
};

export default function HTMLLayout({ children }: Props) {
  return (
    <html lang="ko" className="">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

//<body className={`font-pretendard relative max-w-96 px-8 h-[45rem] border-solid border-1 border-black `}>
//  <header className="flex font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-1">
//   <div className="!font-virgil my-[15px]">CrossWalk</div>
//   <div className="absolute right-0 cursor-pointer">
//     <Link href="/notification">
//       <HiOutlineBell size={25} />
//     </Link>
//   </div>
//  </header>
//  <NavBar />
//</body>;
