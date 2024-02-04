/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import useAlertModal from '@/components/common/modal/AlertModal';
import { postRegister } from '@/lib/api/SupabaseApi';
import { registerState } from '@/recoil/register';
import { userState } from '@/recoil/user';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function AgeAndHeight() {
  const [register, setRegister] = useRecoilState(userState);
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();
  const uid = register?.id;

  const handleNameForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!age || !height) {
      openModal('나이와 키를 입력해주세요!');
      return;
    }
    if (age <= '14') {
      openModal(
        <>
          <p>만 14세 이상의 사용자만</p>
          <p>이용하실 수 있습니다.</p>
        </>
      );
      return false;
    }

    // console.log('!!!!!AgeAndHeight', register);
    postData();
    // router.push('#interest');
    router.push('/register/interest');
  };

  const postData = async () => {
    try {
      // console.log('5', register);
      await postRegister(uid, register?.profile);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // any타입
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        age: Number(age),
        height: Number(height)
      }
    }));
  }, [age, height]);

  return (
    <form onSubmit={handleNameForm} id="age" className="w-full h-full relative">
      <div className="flex flex-col w-full h-full ">
        <h1 className="text-[22px] font-semibold text-black mb-[50px] ">
          나이와 키를
          <br />
          입력해주세요.
        </h1>
        <div className="flex flex-col gap-[20px]">
          <div>
            <p className="text-[16px] text-gray-AAA">나이</p>
            <input
              className="w-full h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border border-gray-DDD text-black appearance-none focus-visible:border  focus:outline-none  focus:ring-1 focus:ring-black"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="27"
            />
          </div>
          <div>
            <p className="text-[16px] text-gray-AAA">키</p>
            <input
              className="w-full h-[50px] py-[8px] px-[20px] text-center rounded-full cursor-pointer border border-gray-DDD text-black appearance-none focus-visible:border focus:outline-none  focus:ring-1 focus:ring-black"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="165"
            />
          </div>
        </div>
      </div>
      <Button
        className={`absolute bottom-0 w-full h-[50px] font-semibold rounded-3xl cursor-pointer text-[18px] ${
          age && height ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        type="submit"
      >
        다음 단계
      </Button>
      {AlertModal()}
    </form>
  );
}

export default AgeAndHeight;
