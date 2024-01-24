'use client';
import { userState } from '@/recoil/user';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addMonths, format } from 'date-fns';
import { Checkbox, Input, Select, SelectItem, Textarea } from '@nextui-org/react';

type contactContentsType = {
  uid: string | null | undefined;
  name: string | null | undefined;
  gender: 'M' | 'F' | null | undefined;
  email: string | undefined;
  category: string | undefined;
  content: string | undefined;
  emailAgree: boolean;
  created_at: string;
};

function ContactPage() {
  const currentDate = new Date();
  const dateFormat = 'yyyy-MM-dd HH:mm:ss XXX';
  const customDate = format(currentDate, dateFormat);

  const [registerData, setRegisterData] = useRecoilState(userState);
  const userInfo = registerData?.profile;
  const [contactContents, setContactContents] = useState<contactContentsType>({
    uid: userInfo?.uid,
    name: userInfo?.name,
    gender: userInfo?.gender,
    email: undefined,
    category: undefined,
    content: undefined,
    emailAgree: false,
    created_at: customDate
  });

  const contactCategoryArr = ['이용 문의', '서비스 제안', '버그 제보', '유저 신고', '회원 탈퇴', '기타'];

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

  const handleSendBtn = () => {
    if (
      !contactContents.email ||
      !contactContents.category ||
      !contactContents.content ||
      !contactContents.emailAgree
    ) {
      return alert('모든 내용을 작성 및 선택해주세요');
    }
    alert('전송됨');
  };

  useEffect(() => {
    console.log('contactContents : ', contactContents);
  }, [contactContents]);

  return (
    <div className="h-screen w-full max-w-[430px] min-w-[360px] border-x !overflow-y-hidden overflow-x-hidden scrollbar-hide">
      <div className=" flex flex-col items-start gap-[10px] w-full min-h-[calc(100dvh-2rem)] h-[720px] max-h-[calc(100dvh-7rem) pl-[30px] pr-[30px] pt-[20px] relative">
        {/* 안내 문구 */}
        <p className="text-[12px] text-center w-full">
          Crosswalk를 이용해 주셔서 감사드립니다.
          <br />
          궁금한 점이나 도움이 필요하신 사항이 있으신가요.
          <br />
          1:1 문의를 통해서 빠르고 정확한 답변을 드리겠습니다.
        </p>
        {/* <button>자주 묻는 질문</button> // 준비중*/}
        {/* 이메일 */}
        <div className="flex flex-col w-full">
          <Input type="email" label="이메일" variant="bordered" onChange={handleEmailInput} />
        </div>
        {/* 문의 유형 */}
        <div className="flex flex-col w-full">
          <Select label="문의 유형" className="max-w-xs" variant="bordered" onChange={handleCategorySelect}>
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
            className="max-w-xs"
            errorMessage="글자수 제한"
            variant="bordered"
            onChange={handleContentTextarea}
          />
        </div>
        {/* 이메일 정보 제공 동의 */}
        <div className="flex flex-col w-full">
          <Checkbox onValueChange={handleEmailAgreeCheckBox}>
            <p>이메일 정보 제공 동의</p>
          </Checkbox>
          <p className="text-[13px] ml-[28px]">
            보내주신 질문에 답변드리기 위해 이메일 정보 제공에 동의해 주시기 바랍니다.
          </p>
        </div>
        {/* 전송 버튼 */}
        <button className="w-full border-3" onClick={handleSendBtn}>
          전송
        </button>
      </div>
    </div>
  );
}

export default ContactPage;
