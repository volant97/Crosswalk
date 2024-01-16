'use client';

import { registerState } from '@/recoil/register';
import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { addMonths, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import { useRecoilState } from 'recoil';
import CheckBox from './CheckBox';
import useAlertModal from '@/components/common/modal/AlertModal';

function Agreement() {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const router = useRouter();
  const [register, setRegister] = useRecoilState(registerState);
  const currentDate = new Date();
  const { openModal, AlertModal } = useAlertModal();
  const period = addMonths(currentDate, 3);
  const dateFormat = 'yyyy-MM-dd HH:mm:ss XXX';
  const checkList = [
    {
      id: '(필수) 만 14세 이상입니다.'
    },
    {
      id: '(필수) 이용약관에 동의합니다.'
    },
    {
      id: '(필수) 개인정보의 수집 및 이용에 동의합니다.'
    },
    {
      id: '(필수) 개인정보의 제3자가 제공에 동의합니다.'
    }
  ];
  const [isChecked, setIsChecked] = useState(checkItems.length === checkList.length);

  const checkItemHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((item) => item !== id));
    }
  };

  const allCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckItems(checkList.map((item) => item.id));
    } else {
      setCheckItems([]);
    }
  };

  console.log('checkItems', checkItems);
  console.log('register', register);

  const handleNextBtn = () => {
    // 모든 체크박스가 선택된 경우를 확인
    if (checkItems.length === checkList.length) {
      setRegister((prevValue) => ({
        ...prevValue,
        information_use_period: format(period, dateFormat),
        information_agreement: true
      }));
      router.push('#name');
    } else {
      openModal('모든 체크박스를 선택해주세요.');
    }
  };

  const handleCheckboxClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <div className="flex-col align-center justify-center min-h-[calc(100dvh-12rem)] ">
        <div className="flex-col align-center">
          <h1 className="text-[1.375rem] font-semibold text-black">
            서비스 가입을 위해
            <br />
            이용약관에 동의해주세요.
          </h1>
        </div>
        <div className="flex-col w-[300px] h-[160px] border-1 border-black">
          <label className="flex-col gap-4 border-2 ">
            <input
              type="checkbox"
              onChange={allCheckedHandler}
              checked={checkItems.length === checkList.length ? true : false}
              onClick={handleCheckboxClick}
              className={`rounded-full  appearance-none w-[20px] h-[20px] ${
                isChecked ? 'bg-customGreen' : 'bg-gray-EF'
              }`}
            />
            아래 항목에 전부 동의합니다.
          </label>
          <div className="flex-col">
            {checkList.map((item) => (
              <CheckBox
                key={item.id}
                id={item.id}
                checkItemHandler={checkItemHandler}
                checked={checkItems.includes(item.id) ? true : false}
              />
            ))}
          </div>
        </div>
      </div>

      <Button
        className="w-full font-semibold bg-customYellow text-black rounded-3xl cursor-pointer  mb-10"
        onClick={handleNextBtn}
      >
        NEXT
      </Button>
      {AlertModal()}
    </>
  );
}

export default Agreement;
