'use client';
import React, { useEffect, useState } from 'react';

function FavorableRatingAlgorithms() {
  const [favorableRating, setFavorableRating] = useState<number>(0); //호감도
  const [congratulationsMessage, setCongratulationsMessage] = useState<boolean>(false); //호감도 100% 달성시 축하메시지 토글
  const [totalChatCount, setTotalChatCount] = useState<number>(0); //A와 B의 총 채팅 수

  const [AScore, setAScore] = useState<number>(0); //A의 총 기여도(점수)
  const [AContinualCount, setAContinualCount] = useState<number>(0); //A의 연속된 채팅 수
  const [AChat, setAChat] = useState<string[]>(['log']); //A의 채팅

  const [BScore, setBScore] = useState<number>(0); //B의 총 기여도(점수)
  const [BContinualCount, setBContinualCount] = useState<number>(0); //B의 연속된 채팅 수
  const [BChat, setBChat] = useState<string[]>(['log']); //B의 채팅

  /**호감도 난이도 */
  const favorableRatingGoal = 100; //호감도 목표치

  /**A 채팅 전송 버튼 */
  const handleAChatBtn = () => {
    setBContinualCount(0); // B(상대)의 연속된 채팅 수 리셋
    // 연속된 채팅 수가 3이상일 때 기여도에 반영 X (한사람만 기여도를 계속 돌리는 것을 방지)
    if (AContinualCount < 3) {
      setAScore(AScore + 1); // 총 기여도 +1
      increaseFavorableRating(AScore + BScore + 1); // A 기여도 + B 기여도 합 + 1 값을 전달하여 호감도 계산
    }
    setAContinualCount(AContinualCount + 1); // 연속된 채팅 수 +1
    setTotalChatCount(totalChatCount + 1); // A와 B의 총 채팅 수 +1
    setAChat([...AChat, `A${AScore}`]); // 채팅 내용 전송
  };

  /**B 채팅 전송 버튼 */
  const handleBChatBtn = () => {
    setAContinualCount(0);
    if (BContinualCount >= 3 && AContinualCount === 0) {
    } else {
      setBScore(BScore + 1);
      increaseFavorableRating(AScore + BScore + 1);
    }
    setBContinualCount(BContinualCount + 1);
    setTotalChatCount(totalChatCount + 1);
    setBChat([...BChat, `B${BScore}`]);
  };

  /**호감도 % 계산 및 100% 달성시 축하메시지 상태 true로 변경 */
  const increaseFavorableRating = (score: number) => {
    const rating = (score / favorableRatingGoal) * 100;
    if (rating >= 100) {
      return setCongratulationsMessage(true);
    }
    setFavorableRating(Math.floor(rating));
  };

  useEffect(() => {
    // 현재 호감도 % 확인
    console.log('rating : ', Math.floor(favorableRating), '%');
  }, [favorableRating]);

  return (
    <div className="flex flex-col gap-12">
      {congratulationsMessage === false ? (
        <>
          <div className="flex justify-center font-bold text-5xl">
            호감도 : <span className="text-red-500">{favorableRating}</span>%
          </div>
          <div className="flex justify-center gap-4">
            <button //호감도 100% 버튼
              onClick={() => {
                setFavorableRating(100);
                setCongratulationsMessage(true);
              }}
            >
              100%
            </button>
            <button //호감도 95% 버튼
              onClick={() => {
                setFavorableRating(95);
                setAScore(50);
                setBScore(45);
              }}
            >
              95%
            </button>
          </div>
        </>
      ) : (
        <h1 className="flex justify-center text-center text-3xl font-bold text-green-600">
          축하해요! <br /> 초록불이 켜졌습니다!!
        </h1>
      )}

      <div className="flex flex-col gap-2 p-4 rounded-xl border-2 border-red-500">
        <div>A 기여도(점수) : {AScore}</div>
        <div>A 연속 채팅수 : {AContinualCount}</div>
        <div>B 기여도(점수) : {BScore}</div>
        <div>B 연속 채팅수 : {BContinualCount}</div>
        <div>채팅수 총합 : {totalChatCount}</div>
        <div className="flex gap-2 w-full">
          <button className="w-1/2 rounded-xl border-2 border-green-500 bg-green-300" onClick={handleAChatBtn}>
            A
          </button>
          <button className="w-1/2 rounded-xl border-2 border-blue-500 bg-blue-300" onClick={handleBChatBtn}>
            B
          </button>
        </div>
      </div>
      <div>
        <div className="flex gap-6 p-4">
          <div className="flex flex-col items-center gap-2 w-[10rem] rounded-xl border-2 border-green-500 p-2">
            {AChat.map((a, index) => {
              return <div key={index}>{a}</div>;
            })}
          </div>
          <div className="flex flex-col items-center gap-2 w-[10rem] rounded-xl border-2 border-blue-500 p-2">
            {BChat.map((b, index) => {
              return <div key={index}>{b}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavorableRatingAlgorithms;
