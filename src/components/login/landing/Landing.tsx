import React from 'react';
import Tutorial from './Tutorial';
import Footer from './Footer';

function Landing() {
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
        <Footer />
      </footer>
    </div>
  );
}

export default Landing;
