import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';

export default function SkeletonMain() {
  return (
    <Skeleton className="absolute z-10 h-full w-full rounded-lg">
      <div className="rounded-lg bg-default-300"></div>
    </Skeleton>
  );
}
