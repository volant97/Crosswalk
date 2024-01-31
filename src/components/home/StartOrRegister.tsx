// 'use client';

// import React from 'react';
// import SocialLogin from './social_login/SocialLogin';
// import { useRecoilState } from 'recoil';
// import { Button } from '@nextui-org/react';
// import Link from 'next/link';
// import { userState } from '@/recoil/user';
// import useLogoutAlertModal from '../common/modal/LogoutAlertModal';

// function StartOrRegister() {
//   const [user, setUser] = useRecoilState(userState);
//   const { openLogoutModal, LogoutAlertModal } = useLogoutAlertModal();

//   return user ? (
//     user.profile?.information_agreement ? (
//       <Button className="w-full h-full bg-customGreen3 rounded-3xl cursor-pointer">
//         <Link
//           href={'/main'}
//           className="flex justify-center items-center w-full h-full text-[18px] text-white font-semibold"
//         >
//           시작하기
//         </Link>
//       </Button>
//     ) : (
//       <div className="flex flex-col justify-between w-full h-[93px] ">
//         <Button className="w-full h-[50px] bg-customGreen3 rounded-3xl cursor-pointer">
//           <Link
//             href={'/register'}
//             className="flex justify-center items-center w-full h-full text-white text-[18px] leading-[20px] font-semibold "
//           >
//             등록하기
//           </Link>
//         </Button>
//         <div className="flex justify-center gap-[5px]">
//           <div
//             className="flex justify-center w-[70px] h-[30px] cursor-pointer"
//             onClick={() => {
//               openLogoutModal('처음으로 돌아갑니다.');
//             }}
//           >
//             <div className="flex justify-center items-center gap-[8px]">
//               <p className="text-[16px] text-gray-AAA font-normal leading-[16px] ">처음으로</p>
//             </div>
//           </div>
//           <Link href={'/customer-service/contact'} className="flex justify-center w-[70px] h-[30px] cursor-pointer">
//             <div className="flex justify-center items-center gap-[8px]">
//               <p className="text-[16px] text-gray-AAA font-normal leading-[16px]">문의하기</p>
//             </div>
//           </Link>
//         </div>
//         {LogoutAlertModal()}
//       </div>
//     )
//   ) : (
//     <SocialLogin />
//   );
// }

// export default StartOrRegister;


// TODO: 삼항 연산자 중첩해서 사용 지양
'use client';

import React from 'react';
import SocialLogin from './social_login/SocialLogin';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { userState } from '@/recoil/user';
import useLogoutAlertModal from '../common/modal/LogoutAlertModal';

function StartOrRegister() {
  // TODO: useRecoilValue 사용하기
  // const [user, setUser] = useRecoilState(userState);
  const user = useRecoilValue(userState)
  const { openLogoutModal, LogoutAlertModal } = useLogoutAlertModal();

  // TODO: 삼항연산자 없애기 위해 위로 빼기
  if (!user) {
    return (
      <SocialLogin />
    )
  }

  // TODO: 이름을 명확하게 바꿔주기
  const isUserAgreed = user.profile?.information_agreement;

  return isUserAgreed ? (
    <Button className="w-full h-full bg-customGreen3 rounded-3xl cursor-pointer">
      <Link
        href={'/main'}
        className="flex justify-center items-center w-full h-full text-[18px] text-white font-semibold"
      >
        시작하기
      </Link>
    </Button>
  ) : (
    <div className="flex flex-col justify-between w-full h-[93px] ">
      <Button className="w-full h-[50px] bg-customGreen3 rounded-3xl cursor-pointer">
        <Link
          href={'/register'}
          className="flex justify-center items-center w-full h-full text-white text-[18px] leading-[20px] font-semibold "
        >
          등록하기
        </Link>
      </Button>
      <div className="flex justify-center gap-[5px]">
        <div
          className="flex justify-center w-[70px] h-[30px] cursor-pointer"
          onClick={() => {
            openLogoutModal('처음으로 돌아갑니다.');
          }}
        >
          <div className="flex justify-center items-center gap-[8px]">
            <p className="text-[16px] text-gray-AAA font-normal leading-[16px] ">처음으로</p>
          </div>
        </div>
        <Link href={'/customer-service/contact'} className="flex justify-center w-[70px] h-[30px] cursor-pointer">
          <div className="flex justify-center items-center gap-[8px]">
            <p className="text-[16px] text-gray-AAA font-normal leading-[16px]">문의하기</p>
          </div>
        </Link>
      </div>
      {LogoutAlertModal()}
    </div>
  )
}

export default StartOrRegister;
