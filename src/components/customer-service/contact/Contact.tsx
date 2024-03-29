/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/user';
import { supabase } from '@/lib/supabase-config';
import useAlertModal from '@/components/common/modal/AlertModal';
import { Button, Checkbox, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import type { contactContentsType } from '@/types/etcType';

function ContactPage() {
  const router = useRouter();
  const { openModal, AlertModal } = useAlertModal();

  const registerData = useRecoilValue(userState);
  const userInfo = registerData?.profile;
  const [contactContents, setContactContents] = useState<contactContentsType>({
    uid: userInfo?.uid,
    name: userInfo?.name,
    gender: userInfo?.gender,
    email: undefined,
    category: undefined,
    content: undefined,
    emailAgree: false
  });

  const contactCategoryArr = ['이용 문의', '서비스 제안', '버그 제보', '유저 신고', '회원 탈퇴', '기타'];
  const [validity, setValidity] = useState<boolean>(false);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactContents({
      ...contactContents,
      email: e.target.value
    });
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContactContents({
      ...contactContents,
      category: contactCategoryArr[Number(e.target.value)]
    });
  };

  const handleContentTextarea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactContents({
      ...contactContents,
      content: e.target.value
    });
  };

  const handleEmailAgreeCheckBox = (checked: boolean) => {
    setContactContents({
      ...contactContents,
      emailAgree: checked
    });
  };

  const handleSendBtn = async () => {
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!contactContents.email) return openModal('이메일을 작성해주세요');

    if (exptext.test(contactContents.email) == false) {
      //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
      return openModal('이메일형식이 올바르지 않습니다.');
    }

    if (
      !contactContents.email ||
      !contactContents.category ||
      !contactContents.content ||
      !contactContents.emailAgree
    ) {
      return openModal('모든 내용을 작성 및 선택해주세요');
    }

    try {
      const { data, error } = await supabase.from('contact').insert({
        uid: contactContents.uid,
        name: contactContents.name,
        gender: contactContents.gender,
        email: contactContents.email,
        category: contactContents.category,
        content: contactContents.content,
        email_agree: contactContents.emailAgree
      });
      if (error) {
        console.error(error);
        return openModal('서버와의 통신을 실패했습니다.');
      }
      openModal('문의가 정상적으로 접수되었습니다.');
      router.push('/main');
    } catch (error) {
      openModal('서버와의 통신을 실패했습니다.');
    }
  };

  useEffect(() => {
    if (contactContents.email && contactContents.category && contactContents.content && contactContents.emailAgree) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }, [contactContents]);

  return (
    <div className="w-full max-w-[430px] min-w-[360px] border-x overflow-x-hidden scrollbar-hide">
      <div className="relative flex flex-col items-start gap-[20px] w-full pl-[30px] pr-[30px] pt-[20px] text-[13px]">
        {/* 안내 문구 */}
        <p className="text-center w-full">
          Crosswalk를 이용해 주셔서 감사드립니다.
          <br />
          궁금한 점이나 도움이 필요하신 사항이 있으신가요.
          <br />
          1:1 문의를 통해서 빠르고 정확한 답변을 드리겠습니다.
        </p>
        {/* <button>자주 묻는 질문</button> // 제작중*/}
        {/* 이메일 */}
        <div className="flex flex-col w-full">
          <Input type="email" label="이메일" variant="bordered" onChange={handleEmailInput} isRequired={true} />
        </div>
        {/* 문의 유형 */}
        <div className="flex flex-col w-full">
          <Select
            label="문의 유형"
            className="w-full"
            variant="bordered"
            onChange={handleCategorySelect}
            isRequired={true}
          >
            {contactCategoryArr.map((cate, index) => (
              <SelectItem key={index} value={cate}>
                {cate}
              </SelectItem>
            ))}
          </Select>
        </div>
        {/* 문의 내용 */}
        <div className="flex flex-col w-full">
          <Textarea
            label="문의 내용"
            className="w-full"
            errorMessage={`글자수 ${contactContents?.content ? contactContents?.content?.length : 0} / 300 자`}
            variant="bordered"
            maxLength={300}
            onChange={handleContentTextarea}
            isRequired={true}
          />
        </div>
        {/* 이메일 정보 제공 동의 */}
        <div className="flex flex-col w-fulls">
          <Checkbox color="success" onValueChange={handleEmailAgreeCheckBox}>
            <p className="text-[13px]">이메일 정보 제공 동의</p>
          </Checkbox>
          <p className="text-[11px] ml-[28px]">
            보내주신 질문에 답변드리기 위해 이메일 정보 제공에 동의해 주시기 바랍니다.
          </p>
        </div>
        {/* 전송 버튼 */}
        <Button
          className={`w-full h-[40px] font-[600] bg-gray-F5 text-black rounded-dull cursor-pointer text-[15px]  pl-[20px] pr-[20px] mb-10 ${
            validity ? 'bg-customGreen3 text-white' : 'bg-gray-F5 text-gray-AAA'
          }`}
          onClick={handleSendBtn}
        >
          전송
        </Button>
      </div>
      {AlertModal()}
    </div>
  );
}

export default ContactPage;
