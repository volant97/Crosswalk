/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CardFornt from './CardFornt';
import CardBack from './CardBack';

type Props = {
  age: number | null;
  avatar: number | null;
  name: string | null;
  interest: string[] | null;
  height: number | null;
  gender: string | null;
  mbti: string | null;
  isFlipped: boolean;
  setIsFlipped: (isFlipped: boolean) => void;
  userImg: string | null;
  isClickedIndex: number | null;
  index: number;
};

function UserCard({
  age,
  avatar,
  name,
  interest,
  height,
  gender,
  mbti,
  isFlipped,
  userImg,
  setIsFlipped,
  isClickedIndex,
  index
}: Props) {
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);
  }, []);

  if (!userImg) return;

  return (
    <>
      <div className={`card ${isFlipped && isClickedIndex === index ? 'flipped' : ''}`} onClick={handleClick}>
        <CardFornt
          isFlipped={isFlipped}
          isClickedIndex={isClickedIndex}
          index={index}
          name={name}
          avatar={avatar}
          age={age}
          interest={interest}
        />
        <CardBack
          isFlipped={isFlipped}
          isClickedIndex={isClickedIndex}
          index={index}
          name={name}
          userImg={userImg}
          age={age}
          interest={interest}
          height={height}
          gender={gender}
          mbti={mbti}
        />
      </div>
      <style jsx>{`
        .card {
          transition: transform 0.7s;
        }

        .flipped {
          transform: perspective(800px) rotateY(180deg);
        }

        .flipped .card-back {
          display: block;
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  );
}

export default UserCard;
