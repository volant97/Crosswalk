'use client';

import { supabase } from '@/lib/supabase-config';
import { isUserState } from '@/recoil/auth';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
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

  const handleNextBtn = () => {
    uploadFile(file);
    alert('업로드 되었습니다!');
  };
  return (
    <>
      <div id="imgUpload" className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <h1 className=" text-[1.375rem] font-semibold">
          사진을
          <br />
          업로드해주세요.
        </h1>
        <div className="">
          <label className="cursor-pointer">
            {selectedImg === '' ? (
              <div className="flex flex-col justify-center items-center  h-[350px] bg-slate-200 rounded-[50px]">
                <CgSoftwareUpload size={50} />
              </div>
            ) : (
              <div className="  ">
                <Image className="rounded-[50px]" src={selectedImg} alt="업로드이미지" width={300} height={350} />
              </div>
            )}

            <input className="hidden" type="file" onChange={previewImg} />
          </label>
          <p className="text-center text-xs text-red-500">* 사진은 필수 입니다.</p>
        </div>
      </div>
      <Button className="w-full bg-customYellow rounded-3xl mb-10" onClick={handleNextBtn}>
        NEXT
      </Button>
    </>
  );
}

export default UploadImg;
