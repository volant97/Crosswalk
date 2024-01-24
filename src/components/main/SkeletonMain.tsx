import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';

export default function SkeletonMain() {
  return (
    <Skeleton className="absolute z-30 w-96 h-[36rem] ml-6 mt-8 rounded-lg">
      <div className=" rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}
