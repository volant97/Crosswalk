import React from 'react';
import Image from 'next/image';
import { spotifyLogin } from '@/auth/spotify';
import spotify from '@assets/login/spotify.png';

function SpotifyLoginBtn() {
  return (
    <button className="relative w-[52px] h-[52px] rounded-full bg-white" type="button" onClick={spotifyLogin}>
      <Image src={spotify} alt="spotify" width={52} height={52} />
    </button>
  );
}

export default SpotifyLoginBtn;
