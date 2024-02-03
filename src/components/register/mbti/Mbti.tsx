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
    // router.push('#age');
    router.push('/register/age-and-height');
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
    <div className="relative w-full h-full ">
      <div className="flex flex-col w-full h-full ">
        <h1 className="text-[22px] font-semibold text-black mb-[50px]">
          MBTI를
          <br />
          선택해주세요.
        </h1>
        <div className="flex justify-between w-full gap-[6px] flex-wrap">
          {mbti.map((item, index) => (
            <div className="flex items-center justify-start ">
              <div
                onClick={() => {
                  handleMbtiClick(item);
                }}
                className={`w-[70px] h-[40px] py-[5px] px-[30px] mb-[12px] flex justify-center items-center border-solid  border-1  rounded-[50px] cursor-pointer ${
                  selectedMbti === item ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
                }`}
                key={index}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>{' '}
      <Button
        className={`absolute bottom-0 w-full h-[50px] font-semibold rounded-3xl cursor-pointer text-[18px]  ${
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
