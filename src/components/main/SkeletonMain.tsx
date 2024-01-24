import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';

export default function SkeletonMain() {
  return (
    <Skeleton className="absolute z-30 min-w-[23rem] md:min-w-96 min-h-[34.5rem] md:min-h-[36rem] ml-6 mt-8 rounded-lg">
      <div className=" rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}
