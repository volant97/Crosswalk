/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import mbti from '../../../data/mbti_data.json';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import useAlertModal from '@/components/common/modal/AlertModal';
import { userState } from '@/recoil/user';
import { postRegister } from '@/lib/api/SupabaseApi';

function Mbti() {
  const [register, setRegister] = useRecoilState(userState);
  const uid = register?.id;
  const router = useRouter();
  const [selectedMbti, setSelectedMbti] = useState<string | null>('');

  const { openModal, AlertModal } = useAlertModal();

  const handleMbtiClick = (item: string) => {
    if (selectedMbti === item) setSelectedMbti('');
    else setSelectedMbti(item);
  };

  const postData = async () => {
    try {
      // console.log('5', register);
      await postRegister(uid, register?.profile);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextBtn = async () => {
    if (!selectedMbti) {
      openModal('MBTI를 선택해주세요!');
      return;
    }
    postData();
    router.push('#age');
  };

  useEffect(() => {
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        mbti: selectedMbti
      }
    }));
  }, [selectedMbti]);

  return (
    <div
      id="mbti"
      className=" flex flex-col items-center min-h-[calc(100dvh-2rem)]  h-[656px] max-h-[calc(100dvh-7rem) pl-[30px] pr-[30px] pt-[20px] relative"
    >
      <div className="flex flex-col w-[300px] h-[274px]  ">
        <h1 className="text-[22px] font-semibold text-black mb-[50px]  mt-[70px]">
          MBTI를
          <br />
          선택해주세요.
        </h1>
        <div className="grid grid-cols-4 w-full gap-[6px] flex-wrap ">
          {mbti.map((item, index) => (
            <div
              onClick={() => {
                handleMbtiClick(item);
              }}
              className={`w-[70px] h-[40px] py-[5px] px-[30px] mb-[6px]  flex justify-center items-center border-solid  border-1  rounded-[50px] cursor-pointer ${
                selectedMbti === item ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
              }`}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>{' '}
      <Button
        className={`absolute top-[88%] w-[300px] h-[50px] font-semibold rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10 ${
          selectedMbti ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        onClick={handleNextBtn}
      >
        다음 단계
      </Button>
      {AlertModal()}
    </div>
  );
}
export default Mbti;
