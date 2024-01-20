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

// 1. 사진 선택창 클릭 -> 사진 열기 누르면, 사진파일의 유무 파악 -> 사진파일있으면
// 2. 선택한 사진 수파베이스 스토리지에 저장
// 3. 수파베이스에서 저장된 링크를 가져오기 get
// 4. 가져온 사진 주소 recoil에 set / setRegisterData + avatar도 set
// 5. Next 버튼 누를 때 수파베이스 DB에 회원정보등록 / postRegister

const UploadImg = () => {
  const [register, setRegister] = useRecoilState(userState);
  const uid = register?.id;
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();
  const { openModal, AlertModal } = useAlertModal();

  const handleError = (error: any) => {
    console.error('Server communication error', error);
    openModal('서버와의 통신을 실패했습니다.');
  };

  // 1. 사진 선택창 클릭 -> 사진 열기 누르면, 사진파일의 유무 파악 -> 사진파일있으면
  const previewImg = (event: any) => {
    const imgFile = event.target.files[0];

    if (imgFile) {
      console.log('1', register);
      setFile(imgFile);
      uploadFile(imgFile);
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
    }
  };

  async function uploadFile(file: any) {
    try {
      // 2. 선택한 사진 수파베이스 스토리지에 저장
      if (file) {
        console.log('2', register);
        await supabase.storage.from('usersImg').upload(`/usersImg/${uid}/${selectedImg}`, file, {
          cacheControl: '3600',
          upsert: false
        });
        const userImg = await getImgLink();

        setAction(userImg);
      }
    } catch (error) {
      console.log('uploadFile error', error);
      handleError(error);
    }
  }

  // 3. 수파베이스에서 저장된 링크를 가져오기 get
  const getImgLink = async () => {
    try {
      console.log('3', register);
      const { data: userImg } = await supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
      return userImg;
    } catch (error) {
      console.error('getImgLink error', error);
      handleError(error);
    }
  };

  // 4. 가져온 사진 주소 recoil에 set / setRegisterData + avatar도 set
  const setAction = (userImg: any) => {
    console.log('4-1', register);
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        user_img: userImg,
        avatar: Math.floor(Math.random() * 15),
        uid: uid
      }
    }));
    console.log('4-2', register);
  };

  // 5. Next 버튼 누를 때 수파베이스 DB에 회원정보등록 / postRegister
  const postData = async () => {
    try {
      console.log('5', register);
      await postRegister(uid, register);
    } catch (error) {
      handleError(error);
    }
  };

  // 5. Next 버튼 누를 때 수파베이스 DB에 회원정보등록 / postRegister
  const handleNextBtn = () => {
    if (!file) {
      openModal('사진을 올려주세요!');
      return;
    }
    console.log('NextBtn', register);
    // await uploadFile(file);
    // await getImgLink();

    postData();
    console.log('6', register);
  };

  // const effectFunction = async () => {
  //   console.log('effectFunction', registerData);
  //   await uploadFile(file);
  //   await getImgLink();
  //   await postData();
  // };

  useEffect(() => {
    if (file) {
      // effectFunction();
      console.log('useEffect', register);
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
