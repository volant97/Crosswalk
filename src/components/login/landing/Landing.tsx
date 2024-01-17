import React from 'react';
import Tutorial from './Tutorial';
import StartOrRegister from './StartOrRegister';

function Landing() {
  return (
    <div className="flex justify-center w-[100dvw] h-[100dvh] overflow-hidden">
      <div className="flex flex-col items-center min-w-[360px] max-w-[430px] border-1 border-black pt-[5rem] pb-[3rem]">
        <header className="flex flex-col justify-center items-center max-w-80 w-full h-[4.25rem]">
          <h1 className="font-virgil text-[2rem]">Crosswalk</h1>
          <h2 className="text-[1.125rem]">인생의 소울메이트를 만나보세요!</h2>
        </header>
        <main className="h-[16.875rem]">
          <Tutorial />
        </main>
        <footer className="flex justify-center items-center w-[18.75rem] h-[3.125rem]">
          <StartOrRegister />
        </footer>
      </div>
    </div>
  );
}

export default Landing;
