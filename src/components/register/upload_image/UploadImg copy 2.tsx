'use client';

import useAlertModal from '@/components/common/modal/AlertModal';
import { getAllData, postRegister } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import { isUserState } from '@/recoil/auth';
import { registerState } from '@/recoil/register';
import { userState } from '@/recoil/user';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PiPlusThin } from 'react-icons/pi';
import { useRecoilState, useRecoilValue } from 'recoil';

const UploadImg = () => {
  const [registerData, setRegisterData] = useRecoilState(userState);
  const uid = registerData?.id;
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();
  const { openModal, AlertModal } = useAlertModal();

  const handleError = (error: any) => {
    console.error('Server communication error', error);
    openModal('서버와의 통신을 실패했습니다.');
  };

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
        await supabase.storage.from('usersImg').upload(`/usersImg/${uid}/${selectedImg}`, file, {
          cacheControl: '3600',
          upsert: false
        });
      }
    } catch (error) {
      console.log('uploadFile error', error);
      handleError(error);
    }
  }

  const getImgLink = async () => {
    try {
      const { data: userImg } = await supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
      setRegisterData((prevData: any) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          user_img: userImg,
          avatar: Math.floor(Math.random() * 15),
          uid: uid
        }
      }));
    } catch (error) {
      console.error('getImgLink error', error);
      handleError(error);
    }
  };

  const postData = async () => {
    try {
      await postRegister(uid, registerData);
    } catch (error) {
      handleError(error);
    }
  };

  const handleNextBtn = async () => {
    if (!file) {
      openModal('사진을 올려주세요!');
      return;
    }
    console.log('NextBtn', registerData);
    await uploadFile(file);
    await getImgLink();
    await postData();
  };

  const effectFunction = async () => {
    await uploadFile(file);
    await getImgLink();
    await postData();
  };

  useEffect(() => {
    if (file) {
      effectFunction();
      console.log('useEffect', registerData);
    } else {
      alert('file 없음');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div
      id="imgUpload"
      className="flex flex-col items-center min-h-[calc(100dvh-2rem)]  h-[720px] max-h-[calc(100dvh-7rem) pl-[30px] pr-[30px] pt-[20px] relative"
    >
      <div className="flex flex-col w-[300px] h-[432px] gap-[20px]">
        <h1 className=" text-[22px] font-semibold text-black mt-[70px] mb-[30px]">
          사진을
          <br />
          업로드해주세요.
        </h1>
        <div className="flex flex-col  items-center gap-4">
          <label className="cursor-pointer">
            {selectedImg === '' ? (
              <div className="w-60 h-[20rem] flex flex-col justify-center items-center border-2 border-gray-DDD rounded-[50px]">
                <PiPlusThin size={90} className="fill-gray-E6" />
              </div>
            ) : (
              <div className="">
                <Image className="rounded-[50px]" src={selectedImg} alt="업로드이미지" width={300} height={350} />
              </div>
            )}

            <input className="hidden" type="file" onChange={previewImg} />
          </label>
          <p className="text-center text-xs text-red-500 mb-[10px]">* 사진은 필수 입니다.</p>
        </div>
      </div>
      <Button
        className={`absolute top-[88%] w-[300px] h-[50px] font-semibold bg-customYellow text-black rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10 ${
          file ? 'bg-customGreen' : 'bg-customYellow'
        }`}
        onClick={handleNextBtn}
      >
        Completion
      </Button>
      {AlertModal()}
    </div>
  );
};

export default UploadImg;
