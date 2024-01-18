import React from 'react';
import AcceptBtn from './Btn/AcceptBtn';
import DeclineBtn from './Btn/DeclineBtn';
import Image from 'next/image';

type Props = {
  listId: number;
  avatar: number;
  senderName: string;
  age: number;
  message: string;
};

function RequestCard({ listId, avatar, senderName, age, message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-[12px] w-[320px] p-[16px] font-pretendard bg-gray-FA rounded-[16px]">
      <div className="flex items-center gap-[8px] self-stretch">
        <div className="relative flex justify-center items-center w-[42px] h-[42px] rounded-full">
          <Image className="rounded-full" src={`/assets/avatar/avatar${avatar}.png`} alt="avatar" fill />
        </div>
        <div className="flex flex-col items-start gap-[6px]">
          <div className="flex items-end gap-[4px]">
            <p className="text-[16px] font-[500] leading-none">{senderName}</p>
            <p className="text-[14px] font-[400] text-gray-999 leading-none">{age}</p>
          </div>
          <p className="text-[14px] font-[400] text-gray-666 leading-[20px] capitalize">{message}</p>
        </div>
      </div>
      <div className="flex items-start w-[200px] h-[32px] gap-[8px]">
        <DeclineBtn listId={listId} />
        <AcceptBtn listId={listId} />
      </div>
    </div>
  );
}

export default RequestCard;

// const inputDate = new Date(createdAt);
// const year = inputDate.getFullYear() % 100; // Extract last two digits of the year
// const month = inputDate.getMonth() + 1; // Month is zero-based, so add 1
// const day = inputDate.getDate();
// const hours = inputDate.getHours();
// const minutes = inputDate.getMinutes();
// const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;

// <div className="flex justify-center">
// <div className="flex flex-col items-center w-[280px] p-[20px] border-2 border-solid border-black mb-[20px] rounded-[20px]">
//   <div className="w-full flex justify-between items-center mb-[10px] text-sm font-bold">
//     이미지 : {avatar}
//     <Image className="rounded-full" src={avatar} alt="아바타이미지" width={30} height={30} />
//     <h1 className="ml-[-35px]">{senderName}님</h1>
//     <h1 className="ml-[-35px]">{age}세</h1>
//     <h1 className="text-xs text-slate-400">{formattedDate}</h1>
//   </div>

//   <h2 className="mb-[40px] text-l bold font-bold">&quot;{message}&quot;</h2>
//   <div className="flex gap-[20px]">
//     <Button className="hover:scale-110" color="success" variant="ghost">
//       <BiSolidMessageCheck size={20} />
//     </Button>
//     <Button className="hover:scale-110" color="danger" variant="ghost">
//       <IoClose size={20} />
//     </Button>
//   </div>
// </div>
// </div>
