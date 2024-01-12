import ReceivedRequest from '@/components/request/ReceivedRequest';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

function Request() {
  return (
    <>
      {/* <div className="flex justify-center items-center w-screen h-screen overflow-hidden border-2 border-red-800">
      <div className="relative max-w-96 w-full border-2 border-green-900"> */}
      {/* <header className="font-virgil w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-8 border-2 border-green-900">
          <Link href="/main" className="absolute left-6">
            <IoIosArrowRoundBack size="30" />
          </Link>
          <div className="!font-virgil ">CrossWalk</div>
        </header> */}
      <main className="max-h-[calc(100dvh-7rem)] min-h-[calc(100dvh-12rem)] overflow-hidden overflow-y-auto scrollbar-hide border-2 border-black">
        <ReceivedRequest />
      </main>
      {/* </div>
    </div> */}
    </>
  );
}

export default Request;
