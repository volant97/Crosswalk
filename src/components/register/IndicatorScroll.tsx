'use client';
import { useEffect, useState } from 'react';

const Indicator = () => {
  const [scrollPercent, setScrollPercent] = useState(20);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percent = (scrolled / totalHeight) * 100;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 h-1 px-8 bg-customGreen transition-width duration-200 "
      style={{ width: `${scrollPercent}%` }}
    />
  );
};

export default Indicator;
