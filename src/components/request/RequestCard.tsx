import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { BiSolidMessageCheck } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

type Props = {
  avatar: number;
  senderName: string;
  age: number;
  message: string;
};

function RequestCard({ avatar, senderName, age, message }: Props) {
  // const inputDate = new Date(createdAt);
  // const year = inputDate.getFullYear() % 100; // Extract last two digits of the year
  // const month = inputDate.getMonth() + 1; // Month is zero-based, so add 1
  // const day = inputDate.getDate();
  // const hours = inputDate.getHours();
  // const minutes = inputDate.getMinutes();
  // const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;

  return (
    <>
      <div className="flex justify-between gap-[1rem] w-full h-[4.5rem] p-[0.75rem] border-1 border-black">
        <div className="w-[11.875rem] border-1 border-red-600">
          {avatar}
          {senderName}
          {age}
          {message}
        </div>
        <div className="w-[2.625rem] border-1 border-red-600">2</div>
      </div>
    </>
  );
}

export default RequestCard;

// {/* <div className="flex justify-center">
//   <div className="flex flex-col items-center w-[280px] p-[20px] border-2 border-solid border-black mb-[20px] rounded-[20px]">
//     <div className="w-full flex justify-between items-center mb-[10px] text-sm font-bold">
//       이미지 : {avatar}
//       {/* <Image className="rounded-full" src={avatar} alt="아바타이미지" width={30} height={30} /> */}
//       <h1 className="ml-[-35px]">{senderName}님</h1>
//       <h1 className="ml-[-35px]">{age}세</h1>
//       {/* <h1 className="text-xs text-slate-400">{formattedDate}</h1> */}
//     </div>

//     <h2 className="mb-[40px] text-l bold font-bold">&quot;{message}&quot;</h2>
//     <div className="flex gap-[20px]">
//       <Button className="hover:scale-110" color="success" variant="ghost">
//         <BiSolidMessageCheck size={20} />
//       </Button>
//       <Button className="hover:scale-110" color="danger" variant="ghost">
//         <IoClose size={20} />
//       </Button>
//     </div>
//   </div>
// </div>; */}
