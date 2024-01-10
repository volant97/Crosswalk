import SocialLogin from '@/components/login/landing/SocialLogin';
import Tutorial from '@/components/login/landing/Tutorial';

// layout - provider - getuser - page (첫랜딩페이지)
export default function Home() {
  return (
    <div className="border-2 border-green-700 relative max-w-96 min-h-[calc(100dvh-12rem)] px-8">
      <header className="border-1 border-black max-w-80 w-full h-16 flex flex-col justify-center items-center mb-8">
        <h1 className="font-virgil ">Crosswalk</h1>
        <h2>인생의 소울메이트를 만나보세요!</h2>
      </header>
      <main className="border-1 border-black">
        <Tutorial />
      </main>
      <footer className="border-1 border-black">
        <SocialLogin />
      </footer>
    </div>
  );
}
