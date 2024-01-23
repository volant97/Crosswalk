/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import type { RegisterType, unMatchedDataType } from '@/types/registerType';
import { getAllData, getUnMatchedData } from '@/lib/api/SupabaseApi';
import { useRecoilState } from 'recoil';
import { isUserState } from '@/recoil/auth';
import SenderProfileCard from './SenderProfileCard';

import 'swiper/css';
import { userState } from '@/recoil/user';
import { useSearchParams } from 'next/navigation';

type Props = {
  senderId: string;
};

function SenderProfile({ senderId }: Props) {
  const searchParams = useSearchParams();
  const [userCards, setUserCards] = useState<(unMatchedDataType | any)[]>([]);
  const [getUid, setGetUid] = useRecoilState(userState);
  const myUid = getUid?.id;
  const [registerData, setRegisterData] = useRecoilState(userState);
  const myGender = registerData?.profile?.gender;

  const getUerCards = async () => {
    try {
      // console.log('1');
      if (!myUid) return;
      if (!myGender) return;
      // console.log('2');
      const userCards = await getUnMatchedData(myUid, myGender);
      // console.log('3');
      if (!userCards) return;
      setUserCards(userCards);
      // console.log('userCards', userCards);
    } catch (error) {
      console.error('Error fetching my posts:', error);
      alert('불러오는 도중 문제가 발생하였습니다.');
    }
  };
  useEffect(() => {
    getUerCards();
  }, []);

  // const filteredCards = userCards?.find((item) => item?.uid == userId);
  const filteredCardslength = userCards?.length;
  // console.log('filteredCardslength', filteredCardslength);

  return (
    <></>
    // <div className="w-full px-[1.5rem] py-[2rem]">
    //   <div className="flex flex-col items-center justify-start h-full">
    //     <form className="w-[320px] h-[67dvh] my-[25px] overflow-y-auto scrollbar-hide" onSubmit={onSubmitHandelr}>
    //       <div className="relative flex flex-col items-center gap-[24px] w-full mt-[90px] px-[20px] pt-[44px] pb-[30px] bg-melona rounded-[24px]">
    //         {/* 아바타 */}
    //         <div className="absolute top-[-70px] flex justify-center items-center h-[100px] w-[100px] z-2">
    //           <div className="relative h-[100px] w-[100px] bg-gray-EF rounded-full">
    //             <Image
    //               className="h-[100px] w-[100px] rounded-full object-cover"
    //               src={`/assets/avatar/avatar-circle/avatar${myInfo?.avatar}-circle.png`}
    //               alt="avatar"
    //               width={100}
    //               height={100}
    //             />
    //           </div>
    //           <div className="absolute top-[1px]">
    //             <button
    //               onClick={() => {
    //                 // any타입
    //                 setRegisterData((prevData: any) => ({
    //                   ...prevData,
    //                   profile: {
    //                     ...prevData.profile,
    //                     avatar: Math.floor(Math.random() * 15)
    //                   }
    //                 }));
    //               }}
    //               className="flex items-center justify-center capitalize w-[32px] h-[32px] bg-white rounded-full ml-[80px]"
    //             >
    //               <Image
    //                 src="/assets/figmaImg/Refresh.png"
    //                 className="w-[20px] h-[20px]"
    //                 width={100}
    //                 height={100}
    //                 alt="avatar_changer"
    //               />
    //             </button>
    //           </div>
    //         </div>
    //         {/* 이름 */}
    //         <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
    //           <label>이름</label>
    //           <input
    //             className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize placeholder:text-[#888] focus:outline-none focus:border-customGreen3 focus:ring-1 focus:ring-customGreen3"
    //             value={name}
    //             onChange={nameHandler}
    //             type="text"
    //             name="name"
    //             id="id"
    //             autoComplete="off"
    //             placeholder={'홍길동'}
    //           />
    //         </div>
    //         {/* 성별 */}
    //         <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
    //           <label>성별</label>
    //           <div className="flex justify-start gap-[8px] w-full">
    //             <div className="relative flex justify-center items-center w-[70px] h-[40px] text-[14px] font-[400] leading-[20px] capitalize text-gray-500 bg-gray-200 border-1 border-solid border-gray-300 rounded-full">
    //               {gender === 'M' ? '남자' : '여자'}
    //             </div>
    //           </div>
    //         </div>
    //         {/* MBTI */}
    //         <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
    //           <p className="font-semibold mb-[0.5rem]">MBTI</p>
    //           <div className="relative flex justify-center items-center w-[70px] h-[40px] text-[14px] font-[400] leading-[20px] capitalize bg-white border-1 border-solid border-black rounded-full">
    //             {myInfo?.mbti}
    //             <div
    //               onClick={() => {
    //                 openMbtiModal();
    //               }}
    //               className="absolute bottom-0 right-[-18px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
    //             >
    //               <LuPencil size={16} />
    //             </div>
    //           </div>
    //         </div>
    //         {/* 나이 */}
    //         <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
    //           <label>나이</label>
    //           <input
    //             className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize appearance-none placeholder:text-[#888] focus:outline-none focus:border-customGreen3 focus:ring-1 focus:ring-customGreen3"
    //             value={age}
    //             onChange={ageHandler}
    //             type="number"
    //             name="age"
    //             id="age"
    //             autoComplete="off"
    //             placeholder={'27세'}
    //           />
    //         </div>
    //         {/* 키 */}
    //         <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
    //           <label>키</label>
    //           <input
    //             className="w-full h-[40px] px-[20px] py-[8px] border-1 rounded-[50px] border-black bg-white text-[16px] font-[400] leading-[20px] capitalize appearance-none placeholder:text-[#888] focus:outline-none focus:border-customGreen3 focus:ring-1 focus:ring-customGreen3"
    //             value={height}
    //             onChange={heightHandler}
    //             type="number"
    //             name="height"
    //             id="height"
    //             autoComplete="off"
    //             placeholder={'180cm'}
    //           />
    //         </div>
    //         {/* 관심사 */}
    //         <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
    //           <label>관심사</label>
    //           <div className="flex justify-start items-start gap-[6px] flex-wrap self-stretch">
    //             <div className="flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
    //               {myInfo?.interest?.[0]}
    //             </div>
    //             <div className="flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
    //               {myInfo?.interest?.[1]}
    //             </div>
    //             <div className="relative flex justify-center items-center w-[70px] h-[40px] rounded-full border-1 border-black bg-white text-[16px] font-[400] leading-[20px] capitalize">
    //               {myInfo?.interest?.[2]}
    //               <div
    //                 onClick={() => {
    //                   openInterestModal();
    //                 }}
    //                 className="absolute bottom-0 right-[-18px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110"
    //               >
    //                 <LuPencil size={16} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         {/* 사진 */}
    //         <div className="flex flex-col items-start gap-[8px] self-stretch w-full text-[18px] font-[600] leading-normal">
    //           <label>사진</label>
    //           <label className="relative cursor-pointer" htmlFor="usersImg">
    //             <input type="file" accept="image/*" id="usersImg" onChange={previewImg} className="hidden" />
    //             {selectedImg === '' ? (
    //               // 어떤 경우에 나오는지 확인 못함. CSS 작업 필요
    //               <div className="w-[7.5rem] h-[10.25rem] flex flex-col justify-center items-center border-2 border-gray-DDD rounded-[1rem]">
    //                 <PiPlusThin size={50} className="fill-gray-E6" />
    //               </div>
    //             ) : (
    //               <div className="relative w-[120px] h-[164px] ">
    //                 <Image className="rounded-[11.364px] object-cover" src={selectedImg} alt="user_img" fill />
    //               </div>
    //             )}
    //             <div className="absolute bottom-[-10px] left-[100px] flex items-center justify-center capitalize w-[30px] h-[30px] bg-lightGreen rounded-full cursor-pointer hover:scale-110">
    //               <LuPencil size={16} />
    //             </div>
    //           </label>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}

export default SenderProfile;
