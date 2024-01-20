import { Spacer, Spinner } from '@nextui-org/react';
import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex justify-center items-center w-[200px] h-[60px] border-3 border-black rounded-lg">
        <Spinner color="danger" size="lg" />
        <Spacer x={2} />
        <Spinner color="warning" size="lg" />
        <Spacer x={2} />
        <Spinner color="success" size="lg" />
      </div>
    </div>
  );
}

export default Loading;
