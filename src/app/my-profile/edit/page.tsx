'use client';
import ChooseAvatarModal from '@/components/common/modal/ChooseAvatarModal';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import NavBar from '@/components/common/ui/NavBar';
import interestData from '../../../data/interestData.json';
import mbti from '../../../data/mbti_data.json';
import FetchMyProfileCard from '@/components/main/FetchMyProfileCard';
import Image from 'next/image';
import Link from 'next/link';
import React, { FormEventHandler, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi2';
import { IoChevronBackOutline } from 'react-icons/io5';
import useAlertModal from '@/components/common/modal/AlertModal';
import { PiPlusThin } from 'react-icons/pi';

// MEMO: form 태그 안에 input 을 다 넣어서
// input 입력이 모두 완료된 후 한꺼번에 form의 onSubmit 이벤트 함수로
// supabase 데이터 update하는 방향으로 설계함

function MyProfileEdit() {
  const { interests } = interestData;
  const [selectedImg, setSelectedImg] = useState('');
  const [file, setFile] = useState<any>();
  const { openModal, AlertModal } = useAlertModal();

  const previewImg = (event: any) => {
    const imgFile = event.target.files[0];
    if (imgFile) {
      setFile(imgFile);
      const imgUrl = URL.createObjectURL(imgFile);
      setSelectedImg(imgUrl);
    }
  };

  const saveMyProfile = async (e: any) => {
    e.preventDefault();
    alert('1');
    openModal('사진변경 중 오류 발생');

    // const modifiedCustomUser = {
    //   id: uuid,
    //   address: position.address,
    //   coordinates: { lat: position.lat, lng: position.lng },
    //   cost,
    //   togetherNum,
    //   createdAt: getDate(),
    //   email,
    //   gender,
    //   imgPath: imgPath,
    //   isDone: false,
    //   password,
    //   title,
    //   content,
    //   imgFileName,
    // };

    //  // 유효성 검사
    //  if (
    //   !cost ||
    //   !gender ||
    //   !togetherNum ||
    //   !email ||
    //   !password ||
    //   !imgPath ||
    //   !title ||
    //   !content
    // ) {
    //   return handleOpenAlert('입력하지 않은 곳이 있습니다.');
    // } else if (
    //   checkValidation('월세', cost, 6) &&
    //   checkValidation('모집인원 수', togetherNum, 3) &&
    //   checkEmailValidation(email) &&
    //   checkValidation('비밀번호', password, 10) &&
    //   checkValidation('제목', title, 30) &&
    //   checkValidation('내용', content, 500)
    // ) {
    //   if (await handleOpenModal('새 투게더를 등록하시겠습니까?')) {
    //     Mutation.mutate(newTogether);
    //   }
    // }
  };

  return (
    <div className="relative max-w-96 px-8 h-[45rem] border-solid border-1 border-black ">
      <header className="flex font-virgil max-w-80 w-full h-16 flex sticky bg-white top-0 items-center justify-center mb-1">
        <Link href="/main" className="absolute left-0">
          <IoChevronBackOutline size="21" />
        </Link>
        <div className="!font-virgil my-[15px]">CrossWalk</div>
        <div className="absolute right-0 cursor-pointer">
          <Link href="/notification">
            <HiOutlineBell size={25} />
          </Link>
        </div>
      </header>
      <NavBar />
      <div className="min-h-[calc(100dvh-12rem)] overflow-hidden max-h-[calc(100dvh-7rem)] border-1">
        <div>
          <Image src="" width={50} height={50} alt="my avatar" />
          <ChooseAvatarModal />
        </div>
        <form onSubmit={saveMyProfile}>
          <p>홍길동 31</p>
          <div className="flex flex-column">
            <label>이름</label>
            <input type="text" name="name" id="id" placeholder="홍길동" className="border-1" />
          </div>
          <div>
            <p>성별</p>
            <label htmlFor="male">남자</label>
            <input type="radio" name="gender" id="male" value="남자" />

            <label htmlFor="female">여자</label>
            <input type="radio" name="gender" id="female" value="여자" />
          </div>
          <div className="flex flex-row flex-wrap">
            <p>MBTI</p>
            {mbti.map((item, index) => {
              const commonProps = {
                key: index,
                id: `interest-${item}`,
                htmlFor: `interest-${item}`
              };
              return (
                <div key={index} className="flex flex-row ">
                  <label {...commonProps}>{item}</label>
                  <input type="radio" name="mbti" id={`mbti-${item}`} value={item} />
                </div>
              );
            })}
          </div>
          <div className="flex flex-column">
            <label>나이</label>
            <input type="number" name="age" id="age" placeholder="21" className="border-1" />
          </div>
          <div className="flex flex-column">
            <label>키</label>
            <input type="number" name="height" id="height" placeholder="180" className="border-1" />
          </div>
          <div className="flex flex-row flex-wrap">
            <p>관심사</p>
            {interests.map((interest, index) => {
              const commonProps = {
                key: index,
                id: `interest-${interest.id}`,
                htmlFor: `interest-${interest.id}`
              };
              return (
                <div key={index}>
                  <label {...commonProps}>{interest.name}</label>
                  <input type="radio" name="interest" id={`interest-${interest.id}`} value={interest.name} />
                </div>
              );
            })}
          </div>
          <div className="flex flex-column">
            <p>사진</p>
            <label htmlFor="usersImg">
              {selectedImg === '' ? (
                <div className="w-[3rem] h-[3rem] flex flex-col justify-center items-center border-2 border-gray-DDD rounded-[50px]">
                  <PiPlusThin size={90} className="fill-gray-E6" />
                </div>
              ) : (
                <div className="">
                  <Image
                    className="rounded-[50px] w-[3rem] h-[3rem] object-cover"
                    src={selectedImg}
                    alt="업로드이미지"
                    width={50}
                    height={50}
                  />
                </div>
              )}
            </label>
            <input type="file" accept="image/*" id="usersImg" onChange={previewImg} className="hidden" />
          </div>
          <button type="submit" className="border-1">
            완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyProfileEdit;

{
  /* <ConfirmModal />

      <ChooseAvatarModal /> */
}
