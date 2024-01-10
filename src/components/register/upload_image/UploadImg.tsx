'use client';

import { supabase } from '@/lib/supabase-config';
import { isUserState } from '@/recoil/auth';
import { registerState } from '@/recoil/register';
import Image from 'next/image';
import React, { useState } from 'react';
import { CgSoftwareUpload } from 'react-icons/cg';
import { useRecoilState, useRecoilValue } from 'recoil';

function UploadImg() {
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const { uid } = useRecoilValue(isUserState);
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();

  const previewImg = (event: any) => {
    const imgFile = event.target.files[0];

    if (imgFile) {
      // If a file is selected
      setFile(imgFile);

      // Convert the file to URL format
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
    } else {
      return;
    }
  };

  async function uploadFile(file: any) {
    try {
      if (file) {
        const { data, error } = await supabase.storage
          .from('usersImg')
          .upload(`/usersImg/${uid}/${selectedImg}`, file, {
            cacheControl: '3600',
            upsert: false
          });
      } else {
        return null;
      }
    } catch (error) {
      console.log('error', error);
      alert('사진변경중 오류 발생');
    }
    const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
    setRegisterData((prevData) => ({
      ...prevData,
      user_img: userImg?.publicUrl
    }));
  }
  return (
    <div>
      <h1 className="text-3xl bold ">사진을</h1> <h1 className="text-3xl bold ">업로드해주세요.</h1>
      <div className="w-[120px]">
        <label className="cursor-pointer">
          {selectedImg === '' ? (
            <div className="flex flex-col justify-center items-center w-[300px] h-[350px] bg-slate-200 rounded-[50px]">
              <CgSoftwareUpload size={50} />
            </div>
          ) : (
            <div className="w-[300px]  ">
              <Image className="rounded-[50px]" src={selectedImg} alt="업로드이미지" width={300} height={350} />
            </div>
          )}

          <input className="hidden" type="file" onChange={previewImg} />
        </label>
      </div>
      <button
        onClick={() => {
          uploadFile(file);
          alert('업로드 되었습니다!');
        }}
      >
        업로드
      </button>
    </div>
  );
}

export default UploadImg;
