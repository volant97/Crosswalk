'use client';

import useAlertModal from '@/components/common/modal/AlertModal';
import { getAllData, postRegister } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import { isUserState } from '@/recoil/auth';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { PiPlusThin } from 'react-icons/pi';
import { useRecoilState, useRecoilValue } from 'recoil';

function UploadImg() {
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const { uid } = useRecoilValue(isUserState);
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();
  const { openModal, AlertModal } = useAlertModal();

  const previewImg = (event: any) => {
    const imgFile = event.target.files[0];

    if (imgFile) {
      setFile(imgFile);
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
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
      openModal('사진변경 중 오류 발생');
    }
    const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
    setRegisterData((prevData) => ({
      ...prevData,
      user_img: userImg?.publicUrl,
      avatar: Math.floor(Math.random() * 15),
      uid: uid
    }));
  }
  async function postData() {
    if (file) {
      try {
        await postRegister(registerData);
      } catch (error) {
        openModal('서버와의 통신을 실패했습니다.');
      }
    }
  }

  const handleNextBtn = () => {
    uploadFile(file);
    alert('업로드 되었습니다!');
    if (file) {
    } else openModal('사진을 올려주세요!');
    postData();
  };
  return (
    <>
      <div id="imgUpload" className="min-h-[calc(100dvh-12rem)] flex flex-col gap-12">
        <h1 className=" text-[1.375rem] font-semibold">
          사진을
          <br />
          업로드해주세요.
        </h1>
        <div className="flex flex-col  items-center gap-4">
          <label className="cursor-pointer">
            {selectedImg === '' ? (
              <div className="w-60 h-[20rem] flex flex-col justify-center items-center bg-slate-200 rounded-[50px]">
                <PiPlusThin size={50} />
              </div>
            ) : (
              <div className="">
                <Image className="rounded-[50px]" src={selectedImg} alt="업로드이미지" width={300} height={350} />
              </div>
            )}

            <input className="hidden" type="file" onChange={previewImg} />
          </label>
          <p className="text-center text-xs text-red-500">* 사진은 필수 입니다.</p>
        </div>
      </div>
      <Button
        className={`w-full rounded-3xl cursor-pointer mb-10 ${file ? 'bg-customGreen' : 'bg-customYellow'}`}
        onClick={handleNextBtn}
      >
        NEXT
      </Button>
      {AlertModal()}
    </>
  );
}

export default UploadImg;
