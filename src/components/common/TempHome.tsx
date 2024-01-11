import Link from 'next/link';
import React from 'react';

function TempHome() {
  return (
    <>
      <hr />
      <div className="flex gap-10 m-5">
        <Link href={'/'}>Landing</Link>
        <Link href={'/register'}>Register</Link>
        <Link href={'/main'}>Main</Link>
        <Link href={'/request'}>Request</Link>
      </div>
    </>
  );
}

export default TempHome;
