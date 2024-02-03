/* eslint-disable react-hooks/exhaustive-deps */
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
import { postRegister } from '@/lib/api/SupabaseApi';

function Agreement() {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const router = useRouter();
  const [register, setRegister] = useRecoilState(userState);
  const uid = register?.id;
  const currentDate = new Date();
  const { openModal, AlertModal } = useAlertModal();
  const period = addMonths(currentDate, 3);
  const dateFormat = 'yyyy-MM-dd HH:mm:ss XXX';
  const maxCheckItems = 4;

  const handleNextBtn = () => {
    // 모든 체크박스가 선택된 경우를 확인
    if (checkItems.length > 3) {
      postData();
      // router.push('#name');
      router.push('/register/name');
    } else {
      openModal('서비스를 이용하기 위해서는 모든 약관 동의가 필요합니다.');
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

  const handleCheckAll = (data: boolean) => {
    setIsSelectedAll((prev) => !prev); //
    // console.log('data:', data);
    if (data) {
      setCheckItems(['one', 'two', 'three', 'four']);
    } else {
      setCheckItems([]);
    }
  };

  useEffect(() => {
    if (checkItems?.length === 4) {
      setIsSelectedAll(true);
    } else if (checkItems?.length < 4) {
      setIsSelectedAll(false);
    }
  }, [checkItems]);

  useEffect(() => {
    setRegister((prevData: any) => ({
      ...prevData,
      profile: {
        ...prevData?.profile,
        information_use_period: format(period, dateFormat),
        information_agreement: isSelectedAll,
        gender: null
      }
    }));
  }, [isSelectedAll]);
  // console.log('checkItems', checkItems);
  // console.log('register', register);

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col w-full h-[272px] ">
        <div className="flex flex-col">
          <h1 className="text-[22px] font-semibold text-black mb-[50px] ">
            서비스 가입을 위해
            <br />
            이용약관에 동의해주세요.
          </h1>
        </div>
        <div className="flex flex-col w-full h-[160px]">
          <div className="flex pt-[8px] pb-[8px] pl-[10px] pr-[10px] w-full h-[38px] bg-customGreen2 text-[16px] font-medium rounded-[10px] ">
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
        className={`absolute bottom-0 w-full h-[50px]  font-semibold bg-gray-F5 text-black rounded-3xl cursor-pointer  text-[18px] ${
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
