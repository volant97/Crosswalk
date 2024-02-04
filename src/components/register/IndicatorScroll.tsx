'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Progress } from '@nextui-org/react';

interface Window {
  prevHash?: string;
}

const PAGECOUNT = 6;
const PERCENT_MAGIC_NUMBER = 100 / PAGECOUNT;

const Indicator = () => {
  const [scrollPercent, setScrollPercent] = useState<number>(PERCENT_MAGIC_NUMBER);
  const [currentPathname, setCurrentPathname] = useState<string>('');
  // const [hashCount, setHashCount] = useState(1);
  // const prevHashRef = useRef(window.location.hash);

  const pathname = usePathname();
  const croppedPathname = pathname.replace('/register', '');
  // setCurrentPathname(croppedPathname);
  console.log('croppedPathname:', croppedPathname);
  console.log('pathname', pathname);

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
