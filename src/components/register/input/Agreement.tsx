'use client';

import { registerState } from '@/recoil/register';
import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { addMonths, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAlertModal from '@/components/common/modal/AlertModal';
import { id } from 'date-fns/locale';
import { UserState, userState } from '@/recoil/user';

function Agreement() {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const router = useRouter();
  const [register, setRegister] = useRecoilState(userState);
  const currentDate = new Date();
  const { openModal, AlertModal } = useAlertModal();
  const period = addMonths(currentDate, 3);
  const dateFormat = 'yyyy-MM-dd HH:mm:ss XXX';
  const maxCheckItems = 4;

  const handleNextBtn = () => {
    // 모든 체크박스가 선택된 경우를 확인
    if (checkItems.length > 3) {
      setRegister((prevData: any) => ({
        ...prevData,
        profile: {
          ...prevData?.profile,
          information_use_period: format(period, dateFormat),
          information_agreement: true
        }
      }));
      console.log('!!!!!', register);
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
    <div className=" flex flex-col items-center min-h-[calc(100dvh-2rem)]  h-[720px] max-h-[calc(100dvh-7rem) pl-[30px] pr-[30px] pt-[20px] relative">
      <div className="flex flex-col w-[300px] h-[272px] ">
        <div className="flex flex-col">
          <h1 className="text-[22px] font-semibold text-black mb-[50px] mt-[10px]">
            서비스 가입을 위해
            <br />
            이용약관에 동의해주세요.
          </h1>
        </div>
        <div className="flex flex-col w-[360px] h-[160px]">
          <div className="flex pt-[8px] pb-[8px] pl-[10px] pr-[10px] w-[300px] h-[38px] bg-customGreen2 text-[16px] font-medium rounded-[10px]">
            <Checkbox
              radius="full"
              color="success"
              isSelected={isSelectedAll}
              onValueChange={handleCheckAll}
              className="flex pt-[8px] pb-[8px] pl-[8px] pr-[10px] w-full h-[38px] bg-customGreen2 text-[16px] font-medium rounded-[10px]"
            >
              <span className="text-[16px] w-[300px] h-[38px] bg-customGreen2  font-medium rounded-[10px] ">
                아래 항목에 전부 동의합니다.
              </span>
            </Checkbox>
          </div>
          <div className="flex  pl-[10px] pr-[10px] mb-[10px] ">
            <CheckboxGroup
              label=""
              color="success"
              value={checkItems}
              onValueChange={setCheckItems}
              className="flex w-[292px] h-[110px] mt-[10px] ]"
            >
              <Checkbox radius="full" value="one" className="flex">
                <span className="flex text-[14px] leading-[19.6px] text-gray-666">(필수) 만 14세 이상입니다.</span>
              </Checkbox>
              <Checkbox radius="full" value="two" className="flex text-xs ">
                <span className="flex text-[14px] leading-[19.6px] text-gray-666">(필수) 이용약관에 동의합니다.</span>
              </Checkbox>
              <Checkbox radius="full" value="three" className="flex text-xs ">
                <span className="flex text-[14px] leading-[19.6px] text-gray-666">
                  (필수) 개인정보의 수집 및 이용에 동의합니다.
                </span>
              </Checkbox>
              <Checkbox radius="full" value="four" className="flex text-xs ">
                <span className="flex text-[14px] leading-[19.6px] text-gray-666">
                  (필수) 개인정보의 제3자가 제공에 동의합니다.
                </span>
              </Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </div>
      <Button
        className={`absolute top-[80%] w-[300px] h-[50px] font-semibold bg-gray-F5 text-black rounded-3xl cursor-pointer  text-[18px]  pl-[20px] pr-[20px] mb-10 ${
          checkItems.length === maxCheckItems ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
        }`}
        onClick={handleNextBtn}
      >
        다음 단계
      </Button>

      {AlertModal()}
    </div>
  );
}

export default Agreement;
