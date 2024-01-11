import Image from 'next/image';
import React from 'react';
import tutorial_avatar_all from '@assets/tutorial/tutorial_avatar_all.png';

function Tutorial() {
  return (
    <div className="relative flex justify-center items-center w-[37.5rem] h-[16.875rem]">
      <Image src={tutorial_avatar_all} alt="tutorial_avatar1" fill />
    </div>
  );
}

export default Tutorial;
