'use client';

import useAlertModal from '@/components/common/modal/AlertModal';
import { getAllData, postRegister } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import { isUserState } from '@/recoil/auth';
import { registerState } from '@/recoil/register';
import { userState } from '@/recoil/user';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const route = useRouter();
  const [testToggle, setTestToggole] = useState<boolean>(false);

  const handleError = (error: any) => {
    console.error('Server communication error', error);
    openModal('서버와의 통신을 실패했습니다.');
  };

  async function uploadFile(file: any, imgUrl: string) {
    try {
      // 2. 선택한 사진 수파베이스 스토리지에 저장
      if (file) {
        // console.log('2', register);
        await supabase.storage.from('usersImg').upload(`/usersImg/${uid}/${imgUrl}`, file, {
          cacheControl: '3600',
          upsert: false
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error('uploadFile error', error);
      handleError(error);
    }
  }

  // 3. 수파베이스에서 저장된 링크를 가져오기 get
  const getImgLink = async () => {
    try {
      // console.log('3', register);
      const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
      // console.log('selectedImg', selectedImg);
      if (userImg) {
        setTestToggole(!testToggle);
      }
      return userImg;
    } catch (error) {
      console.error('getImgLink error', error);
      handleError(error);
    }
  };

  // 1. 사진 선택창 클릭 -> 사진 열기 누르면, 사진파일의 유무 파악 -> 사진파일있으면
  const previewImg = async (event: any) => {
    const imgFile = event.target.files[0];

    if (imgFile) {
      // console.log('1', register);
      setFile(imgFile);
      const imgUrl = URL.createObjectURL(imgFile);
      // console.log('imgUrl', imgUrl);
      setSelectedImg(imgUrl);
      // console.log('selectedImg', selectedImg);
      await uploadFile(imgFile, imgUrl);
      const userImgPath = await getImgLink();
      // console.log('userImgPath', userImgPath);
      // 4. 가져온 사진 주소 recoil에 set / setRegisterData + avatar도 set
      // setRegister((prevData: any) => ({
      //   ...prevData,
      //   profile: {
      //     ...prevData.profile,
      //     user_img: userImgPath?.publicUrl,
      //     avatar: Math.floor(Math.random() * 15),
      //     uid: uid
      //   }
      // }));
      // console.log('4-1', register);
    }
  };

  // 5. Next 버튼 누를 때 수파베이스 DB에 회원정보등록 / postRegister
  const postData = async () => {
    try {
      // console.log('5', register);
      await postRegister(uid, register?.profile);
    } catch (error) {
      handleError(error);
    }
    route.push('/welcome');
  };

  // 5. Next 버튼 누를 때 수파베이스 DB에 회원정보등록 / postRegister
  const handleNextBtn = async () => {
    if (!file) {
      openModal('사진을 올려주세요!');
      return;
    }
    // console.log('NextBtn', register);
    // await uploadFile(file);
    // await getImgLink();

    // console.log('6', register);
    await postData();
    // console.log('7', register);
  };

  // const effectFunction = async () => {
  //   console.log('effectFunction', registerData);
  //   await uploadFile(file);
  //   await getImgLink();
  //   await postData();
  // };

  // useEffect(() => {
  //   if (file) {
  //     // effectFunction();
  //     console.log('useEffect', register);
  //   } else {
  //     alert('file 없음');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [file]);

  useEffect(() => {
    const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
    // console.log('selectedImg', selectedImg);
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        user_img: userImg?.publicUrl,
        avatar: Math.floor(Math.random() * 15),
        uid: uid
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testToggle]);

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
          <p className="text-center text-xs text-red-500 mb-[10px]">
            * 실제 회원의 얼굴이 나온 프로필 사진을 추가해주세요
          </p>
        </div>
      </div>
      <Button
        className={`absolute top-[88%] w-[300px] h-[50px] font-semibold rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10 ${
          file ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        onClick={handleNextBtn}
      >
        회원 등록 완료
      </Button>
      {AlertModal()}
    </div>
  );
};

export default UploadImg;
