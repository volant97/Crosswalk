/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import useAlertModal from '@/components/common/modal/AlertModal';
import { postRegister } from '@/lib/api/SupabaseApi';
import { supabase } from '@/lib/supabase-config';
import { PiPlusThin } from 'react-icons/pi';
import { Button } from '@nextui-org/react';

// 1. 사진 선택창 클릭 -> 사진 열기 누르면, 사진파일의 유무 파악 -> 사진파일있으면
// 2. 선택한 사진 수파베이스 스토리지에 저장
// 3. 수파베이스에서 저장된 링크를 가져오기 get
// 4. 가져온 사진 주소 recoil에 set / setRegisterData + avatar도 set
// 5. Next 버튼 누를 때 수파베이스 DB에 회원정보등록 / postRegister

const MAN_NUMBER = [1, 3, 5, 7, 9, 11, 13, 15];
const WOMAN_NUMBER = [2, 4, 6, 8, 10, 12, 14, 16];

const UploadImg = () => {
  const route = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  const [register, setRegister] = useRecoilState(userState);
  const uid = register?.id;
  const myInfo: any = register?.profile;
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();
  const [testToggle, setTestToggole] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleError = (error: any) => {
    console.error('서버와의 통신을 실패했습니다.', error);
    openModal('서버와의 통신을 실패했습니다.');
  };

  async function uploadFile(file: any, imgUrl: string) {
    try {
      // 선택한 사진 수파베이스 스토리지에 저장
      if (file) {
        // 로딩중
        setIsLoading(true);
        await supabase.storage.from('usersImg').upload(`/usersImg/${uid}/${imgUrl}`, file, {
          cacheControl: '3600',
          upsert: false
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error('파일을 업로드 하는 도중 에러가 발생하였습니다.', error);
      handleError(error);
    }
    updateGender(myInfo.gender);
  }

  // 사진 선택창 클릭 -> 사진 열기 누르면, 사진파일의 유무 파악 -> 사진파일있으면
  const previewImg = async (event: any) => {
    const imgFile = event.target.files[0];
    if (!imgFile) return false;
    if (imgFile.size > 1024 * 1024 * 5) {
      openModal('사진은 5MB 이하로 부탁드립니다.');
    }

    if (imgFile) {
      setFile(imgFile);
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
      await uploadFile(imgFile, imgUrl);
    }
  };

  // Next 버튼 / 수파베이스 DB에 회원정보등록 / postRegister
  const postData = async () => {
    try {
      await postRegister(uid, register?.profile);
    } catch (error) {
      handleError(error);
    }
    route.push('/welcome');
  };

  // Next 버튼
  const handleNextBtn = async () => {
    if (!file) {
      openModal('사진을 올려주세요!');
      return;
    }
    await postData();
  };

  const updateGender = (gender: string) => {
    const avatarNumbers = gender === 'M' ? MAN_NUMBER : WOMAN_NUMBER;
    const randomIndex = Math.floor(Math.random() * avatarNumbers.length);
    setAvatar(avatarNumbers[randomIndex]);
    setTestToggole(!testToggle);
    // 로딩 끝
    setIsLoading(false);
  };

  useEffect(() => {
    const { data: userImg } = supabase.storage.from('usersImg').getPublicUrl(`usersImg/${uid}/${selectedImg}`);
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        user_img: userImg?.publicUrl,
        avatar,
        uid
      }
    }));
  }, [testToggle, register?.profile?.user_img]);

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col w-full h-full gap-[20px] justify-between">
        <div className="flex flex-col gap-[50px] ">
          <h1 className=" text-[22px] font-semibold text-black ">
            사진을
            <br />
            업로드해주세요.
          </h1>
          <div className="flex flex-col items-center gap-4">
            <label className="cursor-pointer">
              {selectedImg === '' ? (
                <div className="w-60 h-[44.446dvh] flex flex-col justify-center items-center border-2 border-gray-DDD rounded-[24px]">
                  <PiPlusThin size={90} className="fill-gray-E6" />
                </div>
              ) : (
                <div className="">
                  <Image
                    className="w-60 h-[44.446dvh] rounded-[24px] object-cover"
                    src={selectedImg}
                    alt="업로드이미지"
                    width={240}
                    height={350}
                  />
                </div>
              )}

              <input
                className="hidden"
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/heic"
                onChange={previewImg}
              />
            </label>
            <p className="text-center text-xs text-red-500 mb-[10px]">
              * 실제 회원의 얼굴이 나온 프로필 사진을 추가해주세요
            </p>
          </div>
        </div>
      </div>
      <Button
        className={`absolute bottom-0 w-full h-[50px]  font-semibold rounded-3xl cursor-pointer text-[18px] ${
          file ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        onClick={handleNextBtn}
        isLoading={isLoading}
      >
        회원 등록 완료
      </Button>
      {AlertModal()}
    </div>
  );
};

export default UploadImg;
