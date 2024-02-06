import React from 'react';
import Image from 'next/image';
import MyCardAvatar from './MyCardAvatar';
import MyInfo from './MyInfo';
import MyAdditionalInfo from './MyAdditionalInfo';
import useLogoutAlertModal from '../common/modal/LogoutAlertModal';

type Props = {
  age: number | null;
  avatar: number | null;
  name: string | null;
  interest: string[] | null;
  height: number | null;
  gender: string | null;
  mbti: string | null;
};

function MyCard({ age, avatar, name, interest, height, gender, mbti }: Props) {
  const { openLogoutModal, LogoutAlertModal } = useLogoutAlertModal();

  return (
    <div className="relative">
      <div className="relative">
        <div className="relative">
          <MyCardAvatar avatar={avatar} />
          <MyInfo name={name} age={age} interest={interest} />
        </div>
      </div>
      <MyAdditionalInfo height={height} gender={gender} mbti={mbti} />
      <div
        className="flex flex-col py-[12px] px-[20px] items-center gap-[24px]  w-full h-[40px] bg-[#F7F7F7] rounded-b-[1.5rem] cursor-pointer"
        onClick={() => {
          openLogoutModal('로그아웃 되었습니다.');
        }}
      >
        <div className="flex justify-center items-center gap-[8px]">
          <p className="text-[16px] text-gray-888 font-normal leading-[16px] ">로그아웃</p>
          <Image src="/assets/figmaImg/logout_icon.png" height={16} width={16} alt="log out" />
        </div>
      </div>
      {LogoutAlertModal()}
    </div>
  );
}

export default MyCard;
