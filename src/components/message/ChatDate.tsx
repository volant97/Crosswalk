import { format, parseISO } from 'date-fns';
import Image from 'next/image';

export function GetCurrentTime(time: string | undefined) {
  if (time) {
    const formattedTime = format(parseISO(time), 'p');
    return formattedTime;
  }
}

//TODO: invalid date 에러 떠서, 임시방편으로 아래 코드로 바꿈
export function DisplayDateTime(date: string) {
  // TODO: if (date)는 없으면 안되나?
  // TODO: invalid date format이 뜨는 이유 알아보기 & else 문을 위로 올려버리기

  const parsedDate = new Date(date);

  if (!date || !isNaN(parsedDate.getTime())) {
    return <>유효하지 않은 날짜데이터입니다.</>
  }

  const year = parsedDate.getFullYear();
  const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
  const day = ('0' + parsedDate.getDate()).slice(-2);
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <div className="flex mr-auto ml-auto justify-center mt-[1rem]">
      <div className="flex justify-center items-center border-1 border-solid border-gray-DDD  py-[0.5rem] rounded-[3.125rem] text-[0.875rem] px-[1rem] text-gray-999">
        <Image
          src="/assets/figmaImg/Calendar.png"
          className="w-[1rem] h-[1rem] mr-[0.25rem]"
          width={50}
          height={50}
          alt="캘린더"
        />
        {formattedDate}
      </div>
    </div>
  );


}
// export function DisplayDateTime(date: string) {
//   if (date) {
//     const formattedDate = format(parseISO(date), 'yyyy년 MM월 dd일');
//     return (
//       <div className="flex mr-auto ml-auto justify-center mt-[1rem]">
//         <div className="flex justify-center items-center border-1 border-solid border-gray-DDD  py-[0.5rem] rounded-[3.125rem] text-[0.875rem] px-[1rem] text-gray-999">
//           <Image
//             src="/assets/figmaImg/Calendar.png"
//             className="w-[1rem] h-[1rem] mr-[0.25rem]"
//             width={50}
//             height={50}
//             alt="캘린더"
//           />
//           {formattedDate}
//         </div>
//       </div>
//     );
//   }
// }

// export function ConvertedDate(date: string | undefined, idx: number) {
//   if (date) {
//     console.log('원본 날짜 문자열:', date);
//     const formattedDate = format(parseISO(String(date)), 'P');

//     console.log('형식이 적용된 날짜:', formattedDate);
//     return formattedDate;
//   }
// }

//TODO: invalid date 에러 떠서, 임시방편으로 아래 코드로 바꿈
export function ConvertedDate(date: string | undefined, idx: number) {
  if (date) {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
      const year = parsedDate.getFullYear();
      const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
      const day = ('0' + parsedDate.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;

      // console.log('원본 날짜 문자열:', date);
      // console.log('형식이 적용된 날짜:', formattedDate);

      return formattedDate;
    } else {
      console.error('Invalid ISO date format for date:', date);
      return '';
    }
  }
}

// export function ConvertedDate(date: string | undefined, idx: number) {
//   if (date) {
//     const isValidDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(date);
//     if (!isValidDate) {
//       console.error(`Invalid ISO date format for date: ${date}`);
//       return null;
//     }

//     const formattedDate = format(parseISO(date), 'P');
//     console.log('Formatted date:', formattedDate);
//     return formattedDate;
//   }
// }
