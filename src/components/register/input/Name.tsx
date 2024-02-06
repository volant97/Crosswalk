/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { userState } from '@/recoil/user';
import { postRegister } from '@/lib/api/SupabaseApi';
import useAlertModal from '@/components/common/modal/AlertModal';
import { Button } from '@nextui-org/react';

function Name() {
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  const [register, setRegister] = useRecoilState(userState);
  const uid = register?.id;
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !gender) {
      openModal('정보를 입력해주세요!');
      return;
    }

    postData();
    router.push('/register/mbti');
  };

  const postData = async () => {
    try {
      await postRegister(uid, register?.profile);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Todo : any타입
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        name,
        gender
      }
    }));
  }, [name, gender]);

  return (
    <form onSubmit={handleSubmit} id="name" className="w-full h-full relative">
      <div className="flex flex-col w-full h-full gap-[20px]">
        <div className="flex flex-col">
          <h1 className="text-[22px] font-semibold text-black ">
            이름과 성별을
            <br />
            입력해주세요.
          </h1>
          <p className=" text-sm mt-[5px] mb-[30px] text-gray-666">사용자의 실명을 입력해주세요.</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="inputName" className="text-gray-AAA text-[16px]">
            이름
          </label>
          <input
            className="h-[50px] w-full py-[8px] px-[20px] rounded-full cursor-pointer border border-gray-DDD focus:outline-none focus:ring-1 focus:ring-black"
            id="inputName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
          />
        </div>
        {/* <Gender /> */}
        <div className="flex flex-col gap-1 justify-center ">
          <span className="text-gray-AAA text-[16px]">성별</span>
          <div className="flex gap-2">
            <Button
              type="button"
              className={`w-full h-[46px] pl-[20px] pr-[20px] pt-[8px] pb-[8px] bg-white rounded-full cursor-pointer border ${
                gender === 'M' ? 'font-semibold border-black text-black' : 'border-gray-DDD text-gray-AAA'
              }`}
              onClick={() => {
                setGender('M');
              }}
            >
              남자
            </Button>
            <Button
              type="button"
              className={`w-full h-[46px] pl-[20px] pr-[20px] pt-[8px] pb-[8px] bg-white rounded-full cursor-pointer border ${
                gender === 'F' ? 'font-semibold border-black text-black' : 'border-gray-DDD text-gray-AAA'
              }`}
              onClick={() => {
                setGender('F');
              }}
            >
              여자
            </Button>
          </div>
        </div>
      </div>
      <Button
        className={`absolute bottom-0 w-full h-[50px] font-semibold rounded-3xl cursor-pointer text-[18px]  ${
          name && gender ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        type="submit"
      >
        다음 단계
      </Button>
      {AlertModal()}
    </form>
  );
}

export default Name;
