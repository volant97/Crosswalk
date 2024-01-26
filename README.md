# Crosswalk

![log in (1)](https://github.com/volant97/Crosswalk/assets/146087609/0fac1650-1116-4cbf-9dc0-2c0f334868f8)

![main](https://github.com/volant97/Crosswalk/assets/146087609/0598a5b9-5865-439e-b6b0-7a9185956895)

![chat list](https://github.com/volant97/Crosswalk/assets/146087609/c52125d5-3cc7-43ae-a58d-c477ed272519)

## Introduction

**Crosswalk : 블라인드 매칭 및 실시간 채팅을 통해 소울메이트를 만들 수 있는 서비스**

- 웹 앱 형태로 나와 관심사가 맞거나 맘에드는 사람을 픽하여 하나씩 알아가고 나와 맘이 맞는 친구를 찾아 줍니다!
-  횡단보도 양끝에서 마주친 두 사람. 실시간 대화를 진행하고 호감도를 쌓아 신호등을 밝혀주세요. 초록불이 켜지길    기대할게요!
 - 서로를 밝혀주는 운명의 신호등을 찾길 바라요.

## Duration

2024.01.04 ~ 2024.02.08

## Team Member

|  팀원  |         역할          |            깃허브             |              블로그              |
| :----: | :-------------------: | :---------------------------: | :------------------------------: |
| 윤창근 |  리더, 로그인, 받은 요청함   |  https://github.com/volant97  | https://y-developer.tistory.com/ |
| 이하민 |  부리더, 알림창, 전체 규격 CSS     |  https://github.com/dancinncoder  | https://whereannalee.tistory.com// |
| 임세현 |  채팅리스트 및 채팅방 | https://github.com/yachaechae |   https://velog.io/@yachaechae   |
| 서지훈 |  메인 페이지, 마이페이지, 프로필 디테일페이지   |  https://github.com/Jihunee   | https://jihune6439.tistory.com/  |

## Development Environment

1. Next
2. TypeScript
3. HTML
4. Tailwind CSS
5. Recoil
6. NextUI

## Data Manamgement

- supabase

## Features

- 블라인드 매칭 및 실시간 채팅을 통해 소울메이트를 만들 수 있는 서비스
  
1.  Supabase 소셜 로그인
    supabase Auth를 사용하여 구글, 카카오, 스포티파이로 저희 컬러에 맞는 신호등 색의 로고로
    3가지의 소셜로그인을 구현 하였습니다.

2.  Supabase DB  
    - User DB
        -로그인한 유저를 supabase 트리거를 통해 Auth user 값이 들어오면 자동적으로 custom_usesr 테이블에
        유저의 uid값이 저장되어 추가로 회원등록하는 곳에서 custom_users에 추가 적인 유저정보를 저장 및 수정
        할 수 있게 끔 구현하였습니다.
    - Flirting Message
     -Flirting Message를 데이터 베이스에 담아주어 받은 요청함에서 사용 할 수 있게 끔 해주었습니다.
    - Chat Message
    -ChatMessage를 데이터 베이스에 담아주어 채팅방에서 사용할 수 있게 끔 해주었습니다.
    

3.  supabase RealTime 
    - 받은 요청 및 실시간 알림 서비스
    -supabase에서 realTime를 활용하여 요청 및 알림을 실시간으로 값을 요청 하거나 응답 받을 수 있게 user의 UI/UX를 고려하여 user의 편의성을 중점으로 생각하여 구현하였습니다.
    - 채팅 실시간 구현
    -realTime를 활용하여 채팅이 실시간으로 가능 하게끔 하여 실시간 채팅이 원할하게 되도록 구현하였습니다.

4.  recoil을 사용하여 유저 정보를 전역적으로 상태관리
    처음에 가져오는 유저 정보를 전역적으로 상태관리하여 어디서든지 사용할 수 있게 끔 관리 해주었습니다.

5.  React-Swiper 
    복잡한 슬라이더 구조를 react-swipre을 활용하여 좀 더 코드의 가독성을 높이는 방향으로 하여금 swiper를
    선택하였으며 swiper을 활용하여 좀 더 부드럽고 편한 슬라이더를 구현하였습니다.
    
### Crosswalk 서비스 부분

1. 소셜 로그인
   해당 로그인할 플랫폼으로 로고로하여 로고를 클릭하면 간단한 로그인을 할 수 있습니다.

2. 개인정보 제공 동의  
   저희가 user의 개인정보를 이용하여 1대1 매칭 시스템이다 보니 user의 개인정보 제공 동의가 필요합니다.

- 메인
-카드 슬라이더  
   - 카드를 통하여 유저의 아바타 및 유저의 정보 및 관심사 부분을 보여줍니다.
   - 괜찮아요 버튼 및 어필하기 버튼을 통하여 유저를 선택하거나 넘길 수 있습니다.

- 알림
    - 유저의 요청이 수락 되었거나 요청을 보냈거나 하는 것을 실시간 알림으로 통하여 유저에게 보여줍니다.
    - 받은 알림이 없을 때는 받은 알림이 없습니다와 같은 문구를 띄워 유저에게 알려줍니다.
- 받은 요청함
    - 상대가 어필하기를 통해 요청을 보내면 실시간으로 응답을 받아 수락 혹은 거절 버튼을 
        통하여 유저를 선택 할 수 있습니다.
    - 수락을 하면 긍적인 문구를 통해 유저에게 알려주고 거절을 누르면 아쉬운 문구를 통해 유저에게 알려줍니다.
- 채팅 리스트 
    -어필하기를 통해 수락 받아 서로가 신호가 맞으면 채팅방을 생성 해주며 상태에 따라 아바타 아웃라인 컬러가
변경됩니다. 
    - 노란색이면 현재 진행중 상태 
    - 빨간색이면 상대가 거절한 상태
    - 초록색이면 호감도 100%인 상태
- 채팅방
    - 서로의 실시간 채팅을 주고 받을 수있습니다.
    - 연결 되었으면 안내 문구와 함께 채팅을 시작할 수 있습니다.
    - 호감도 100%가 되면 서로의 시크릿 사진이 공개 됩니다. (얼굴사진)
- 마이페이지 
    -  나의 정보를 확인 할 수 있으며 나의 정보를 수정할 수 있습니다.
    -  로그아웃을 할 수 있습니다.

## Distribution
- Vercel (예정)