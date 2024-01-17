'use client';

import { registerState } from '@/recoil/register';
import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { addMonths, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAlertModal from '@/components/common/modal/AlertModal';
import { id } from 'date-fns/locale';

function Agreement() {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const router = useRouter();
  const [register, setRegister] = useRecoilState(registerState);
  const currentDate = new Date();
  const { openModal, AlertModal } = useAlertModal();
  const period = addMonths(currentDate, 3);
  const dateFormat = 'yyyy-MM-dd HH:mm:ss XXX';
  const maxCheckItems = 4;

  const handleNextBtn = () => {
    // 모든 체크박스가 선택된 경우를 확인
    if (checkItems.length > 3) {
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

  useEffect(() => {
    if (checkItems?.length === 4) {
      setIsSelectedAll(true);
    } else if (checkItems?.length < 4) {
      setIsSelectedAll(false);
    }
  }, [checkItems]);

  const handleCheckAll = (data: boolean) => {
    setIsSelectedAll((prev) => !prev); //
    console.log('data:', data);
    if (data) {
      setCheckItems(['one', 'two', 'three', 'four']);
    } else {
      setCheckItems([]);
    }
  };

  // console.log('checkItems', checkItems);
  // console.log('register', register);

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
        <div className="flex-col w-[360px] h-[160px] mt-6 ">
          <Checkbox radius="full" color="success" isSelected={isSelectedAll} onValueChange={handleCheckAll}>
            아래 항목에 전부 동의합니다.
          </Checkbox>
          <CheckboxGroup label="" color="success" value={checkItems} onValueChange={setCheckItems}>
            <Checkbox radius="full" value="one" className="text-[0.875rem]">
              (필수) 만 14세 이상입니다.
            </Checkbox>
            <Checkbox radius="full" value="two">
              (필수) 이용약관에 동의합니다.
            </Checkbox>
            <Checkbox radius="full" value="three">
              (필수) 개인정보의 수집 및 이용에 동의합니다.
            </Checkbox>
            <Checkbox radius="full" value="four">
              (필수) 개인정보의 제3자가 제공에 동의합니다.
            </Checkbox>
          </CheckboxGroup>
        </div>
      </div>

      <Button
        className={`w-full font-semibold bg-customYellow text-black rounded-3xl cursor-pointer  mb-10 ${
          checkItems.length === maxCheckItems ? 'bg-customGreen' : 'bg-customYellow'
        }`}
        onClick={handleNextBtn}
      >
        NEXT
      </Button>
      {AlertModal()}
    </>
  );
}

export default Agreement;
