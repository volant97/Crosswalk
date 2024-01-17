import { spotifyLogin } from '@/auth/spotify';
import React from 'react';

function SpotifyLoginBtn() {
  return (
    <button className="w-[3.25rem] h-[3.25rem] rounded-full bg-[#03CF5D]" type="button" onClick={spotifyLogin}>
      S
    </button>
  );
}

export default SpotifyLoginBtn;
