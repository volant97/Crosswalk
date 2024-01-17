'use client';

import { registerState } from '@/recoil/register';
import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { addMonths, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAlertModal from '@/components/common/modal/AlertModal';
import { id } from 'date-fns/locale';
import Image from 'next/image';

function Agreement() {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const router = useRouter();
  const [register, setRegister] = useRecoilState(registerState);
  const currentDate = new Date();
  const { openModal, AlertModal } = useAlertModal();
  const period = addMonths(currentDate, 3);
  const dateFormat = 'yyyy-MM-dd HH:mm:ss XXX';

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

  // useEffect(() => {
  //   if (checkAll.length === 0) {
  //     return setCheckItems([]);
  //   } else if (checkAll.length === 1) {
  //     return setCheckItems(['one', 'two', 'three', 'four']);
  //   } else if (checkAll.length === 0 && checkItems.length === 4) {
  //     return setCheckAll([]);
  //   }
  //   // if (checkAll.length === 0 && checkItems.length === 4){
  //   //   setCheckAll([])
  //   // }
  // }, [checkAll,]);

  // console.log('checkItems', checkItems);
  // console.log('checkAll', checkAll);

  useEffect(() => {
    if (checkItems.length === 4) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkItems]);

  const aaa = () => {
    if (checkAll) {
      console.log('!!');
      setCheckItems([]);
    } else {
      console.log('??');
      setCheckItems(['one', 'two', 'three', 'four']);
    }
  };

  // const aaaa = () => {
  //   console.log('ggg');
  // };

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
          {/* <CheckboxGroup
            label=""
            aria-checked
            color="success"
            value={checkAll}
            // onValueChange={setCheckAll}
            onChange={aaa}
          >
            <Checkbox value="all">아래 항목에 전부 동의합니다.</Checkbox>
          </CheckboxGroup> */}
          <Checkbox isSelected={checkAll} onValueChange={setCheckAll}>
            <div onClick={aaa}>전체 동의</div>
          </Checkbox>

          <CheckboxGroup label="" color="success" value={checkItems} onValueChange={setCheckItems}>
            <Checkbox value="one">(필수) 만 14세 이상입니다.</Checkbox>
            <Checkbox value="two">(필수) 이용약관에 동의합니다.</Checkbox>
            <Checkbox value="three">(필수) 개인정보의 수집 및 이용에 동의합니다.</Checkbox>
            <Checkbox value="four">(필수) 개인정보의 제3자가 제공에 동의합니다.</Checkbox>
          </CheckboxGroup>
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
