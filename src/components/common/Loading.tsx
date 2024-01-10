import { Spacer, Spinner } from '@nextui-org/react';
import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center max-w-96 min-h-[calc(100dvh-12rem)] px-8 border-2 border-green-700">
      <div className="flex justify-center items-center w-48 h-20 border-4 border-black rounded-lg">
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
