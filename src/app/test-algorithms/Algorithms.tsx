'use client';
import React, { useEffect, useState } from 'react';

function Algorithms() {
  const [favorableRating, setFavorableRating] = useState<number>(0);
  const [congratulationsMessage, setCongratulationsMessage] = useState<boolean>(false);

  const [AScore, setAScore] = useState<number>(0);
  const [AContinualCount, setAContinualCount] = useState<number>(0);
  const [AChat, setAChat] = useState<string[]>(['log']);

  const [BScore, setBScore] = useState<number>(0);
  const [BContinualCount, setBContinualCount] = useState<number>(0);
  const [BChat, setBChat] = useState<string[]>(['log']);

  /**호감도 난이도 */
  const favorableRatingGoal = 100;

  const handleAChatBtn = () => {
    setBContinualCount(0);
    if (AContinualCount >= 3 && BContinualCount === 0) {
    } else {
      setAScore(AScore + 1);
      increaseFavorableRating(AScore + BScore + 1);
    }
    setAContinualCount(AContinualCount + 1);
    setAChat([...AChat, `A${AScore}`]);
  };

  const handleBChatBtn = () => {
    setAContinualCount(0);
    if (BContinualCount >= 3 && AContinualCount === 0) {
    } else {
      setBScore(BScore + 1);
      increaseFavorableRating(AScore + BScore + 1);
    }
    setBContinualCount(BContinualCount + 1);
    setBChat([...BChat, `B${BScore}`]);
  };

  const increaseFavorableRating = (score: number) => {
    const rating = (score / favorableRatingGoal) * 100;
    if (rating > 100) {
      return setCongratulationsMessage(true);
    }
    setFavorableRating(Math.floor(rating));
  };

  useEffect(() => {
    console.log('rating : ', Math.floor(favorableRating), '%');
  }, [favorableRating]);

  return (
    <div className="flex flex-col gap-12">
      {congratulationsMessage === false ? (
        <>
          <div className="flex justify-center font-bold text-5xl">
            호감도 : <span className="text-red-500">{favorableRating}</span>%
          </div>
          <button
            onClick={() => {
              setFavorableRating(100);
              setCongratulationsMessage(true);
            }}
          >
            100%
          </button>
        </>
      ) : (
        <h1 className="flex justify-center text-center text-3xl font-bold text-green-600">
          축하해요! <br /> 초록불이 켜졌습니다!!
        </h1>
      )}

      <div className="flex flex-col gap-2 p-4 rounded-xl border-2 border-red-500">
        <div>AScore : {AScore}</div>
        <div>AContinualCount : {AContinualCount}</div>
        <div>BScore : {BScore}</div>
        <div>BContinualCount : {BContinualCount}</div>
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

export default Algorithms;
