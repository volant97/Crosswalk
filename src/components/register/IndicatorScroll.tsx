'use client';
import { useEffect, useRef, useState } from 'react';

interface Window {
  prevHash?: string;
}

const Indicator = () => {
  const [scrollPercent, setScrollPercent] = useState(16);
  const [hashCount, setHashCount] = useState(1);
  const prevHashRef = useRef(window.location.hash);

  useEffect(() => {
    const checkHash = () => {
      const currentHash = window.location.hash;

      if (prevHashRef.current !== currentHash) {
        setHashCount((prevCount) => prevCount + 1);
        prevHashRef.current = currentHash;
      }
    };
    if (hashCount !== 0) {
      setScrollPercent(Math.round(hashCount * 16.6));
    }
    const intervalId = setInterval(checkHash, 1000);

    return () => clearInterval(intervalId);
  }, [hashCount]);

  return (
    <div
      className="absolute bottom-0 left-0 h-1 px-8 bg-customGreen transition-width duration-200 "
      style={{ width: `${scrollPercent}%` }}
    />
  );
};

export default Indicator;
