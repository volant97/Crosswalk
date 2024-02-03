/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import interestData from '../../../data/interestData.json';
import { useRecoilState } from 'recoil';
import { registerState } from '@/recoil/register';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import useAlertModal from '@/components/common/modal/AlertModal';
import { userState } from '@/recoil/user';
import { postRegister } from '@/lib/api/SupabaseApi';

function Interest() {
  const { interests } = interestData;
  const [register, setRegister] = useRecoilState(userState);
  const uid = register?.id;
  const [activeStates, setActiveStates] = useState<string[]>([]);
  const maxSelectedInterests = 3; // 최대 선택 가능한 관심사 개수
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  const handleInterestClick = (interest: string) => {
    if (activeStates.includes(interest)) {
      const updatedActiveStates = activeStates.filter((selectedInterest) => selectedInterest !== interest);
      setActiveStates(updatedActiveStates);
    } else if (activeStates.length >= maxSelectedInterests) {
      // openModal(`관심사는 최대 ${maxSelectedInterests}개까지 선택 가능합니다.`);
      openModal(
        <>
          관심사는 최대 {maxSelectedInterests}개까지
          <br />
          선택 가능합니다.
        </>
      );
    } else {
      setActiveStates([...activeStates, interest]);
    }
  };

  const postData = async () => {
    try {
      // console.log('5', register);
      await postRegister(uid, register?.profile);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextBtn = () => {
    if (activeStates.length < 3) {
      openModal('관심사를 선택해주세요!');
      return;
    }

    // console.log('!!!!!Interest', register);
    postData();
    // router.push('#imgUpload');
    router.push('/register/upload-img');
  };

  useEffect(() => {
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        interest: activeStates
      }
    }));
  }, [activeStates]);

  return (
    <div className="w-full h-full relative">
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full h-[296px] gap-[20px]">
          <h1 className="text-[22px] font-semibold text-black  mb-[50px]">
            관심사를
            <br />
            선택해주세요.
          </h1>
          <div className="flex justify-center w-full ">
            <ul className="flex flex-wrap gap-[8px] justify-center w-[300px]">
              {interests.map((interest) => {
                const isSelected = activeStates.includes(interest.name);
                return (
                  <li
                    key={interest.id}
                    className={`justify-center items-center text-center max-w-[104px] min-w-[76px] h-[40px] text-[16px] py-[8px] px-[20px] rounded-full cursor-pointer border ${
                      isSelected ? 'border-black text-black' : 'border-gray-DDD text-gray-AAA'
                    }`}
                    onClick={() => {
                      handleInterestClick(interest.name);
                    }}
                  >
                    {interest.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Button
        className={`absolute bottom-0 w-full h-[50px] font-semibold rounded-3xl cursor-pointer text-[18px] ${
          activeStates.length === maxSelectedInterests ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        onClick={handleNextBtn}
      >
        다음 단계 ({activeStates.length}/{maxSelectedInterests})
      </Button>
      {AlertModal()}
    </div>
  );
}

export default Interest;
