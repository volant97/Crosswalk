import Link from 'next/link';
import React from 'react';

function TempHome() {
  return (
    <>
      <hr />
      <div className="flex gap-10 m-5">
        <Link href={'/'}>Root</Link>
        <Link href={'/register'}>Register</Link>
      </div>
    </>
  );
}

export default TempHome;
