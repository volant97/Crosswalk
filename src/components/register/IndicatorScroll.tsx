'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Progress } from '@nextui-org/react';

const PAGECOUNT = 6;
const PERCENT_MAGIC_NUMBER = 100 / PAGECOUNT;

const Indicator = () => {
  const [scrollPercent, setScrollPercent] = useState<number>(PERCENT_MAGIC_NUMBER);

  const pathname = usePathname();
  const croppedPathname = pathname.replace('/register', '');

  useEffect(() => {
    if (croppedPathname === '') {
      return setScrollPercent(PERCENT_MAGIC_NUMBER * 1);
    } else if (croppedPathname === '/name') {
      return setScrollPercent(PERCENT_MAGIC_NUMBER * 2);
    } else if (croppedPathname === '/mbti') {
      return setScrollPercent(PERCENT_MAGIC_NUMBER * 3);
    } else if (croppedPathname === '/age-and-height') {
      return setScrollPercent(PERCENT_MAGIC_NUMBER * 4);
    } else if (croppedPathname === '/interest') {
      return setScrollPercent(PERCENT_MAGIC_NUMBER * 5);
    } else if (croppedPathname === '/upload-img') {
      return setScrollPercent(100);
    }
  }, [croppedPathname]);

  return (
    <Progress className="absolute bottom-0" color="success" aria-label="Loading..." value={scrollPercent} size="sm" />
  );
};

export default Indicator;
