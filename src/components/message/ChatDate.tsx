import { format, parseISO } from 'date-fns';
import Image from 'next/image';

export function GetCurrentTime(time: string | undefined) {
  if (time) {
    const formattedTime = format(parseISO(time), 'p');
    return formattedTime;
  }
}

export function DisplayDateTime(date: string) {
  if (date) {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
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
    } else {
      console.error('잘못된 형식의 날짜입니다.', date);
      return null;
    }
  } else {
    return null;
  }
}

export function ConvertedDate(date: string | undefined, idx: number) {
  if (date) {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
      const year = parsedDate.getFullYear();
      const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
      const day = ('0' + parsedDate.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    } else {
      console.error('잘못된 ISO 날짜 형식입니다.', date);
      return '';
    }
  }
}
