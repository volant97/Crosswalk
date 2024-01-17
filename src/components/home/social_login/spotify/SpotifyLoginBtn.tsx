import React from 'react';
import { spotifyLogin } from '@/auth/spotify';
import spotify from '@assets/login/spotify.png';
import Image from 'next/image';

function SpotifyLoginBtn() {
  return (
    <button className="relative w-[52px] h-[52px] rounded-full bg-white" type="button" onClick={spotifyLogin}>
      <Image src={spotify} alt="spotify" fill />
    </button>
  );
}

export default SpotifyLoginBtn;
