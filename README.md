# wanted-3team-ad-platform

## 프로젝트 실행 방법

1. 프로젝트 다운로드 후 압축해제
2. 프로젝트 폴더 최상단에서 터미널 명령어 실행
   1. `npm run install` : 패키지 설치(nodejs가 설치돼 있어야 합니다)
   2. `npm run dev` : 프로젝트와 json-server가 동시에 실행됩니다
3. 브라우저에서 `http://localhost:3000` 주소로 접속

### 프로젝트 실행이 안될 때

아래 경고가 나오며 실행이 안된다면 node_modules와 package-lock.json파일을 삭제 후 다시 패키지 설치부터 진행하면 해결된다. [참조, esbuild와 vite의 종속성 문제](https://stackoverflow.com/questions/71837533/why-vite-js-doesnt-work-when-i-use-npm-run-dev)

```bash
sh: vite: command not found
```


## 역할분담

### 한운기

  - 테마 색 설정 및 메뉴바/헤더 구현
  - 대시보드 레이아웃 및 날짜선택기능 구현
  - 모바일 페이지 구현
  - 데이터 캐싱 기능 구현

### 김영호

- 광고 관리
  - filter 메서드를 사용해 선택된 상태의 광고만 보여지도록 구현
  - 종료된 광고의 경우 수정하기 버튼이 동작하지 않도록 구현
- 광고 만들기, 수정
  - 폼 컴포넌트에 전달하는 mode 값에 따라 광고 만들기, 수정하기로 동작하도록 구현
  - URL을 통해 종료된 광고 수정에 접근할 경우 광고관리 페이지로 이동되도록 처리
  - 빈 값이나 유효하지 않은 값이 있을 경우 submit이 되지 않도록 처리

### 조혜빈
  - 통합광고현황 컴포넌트
  - 주간통합데이터
  - 주간통합 변화율
  - 라인차트 구현

### 정윤서

  - 매체현황 컴포넌트
  - 매체 주간 차트
  - 매체 주간 테이블

### 이성진

  - 데이터 페치 모듈 구현
  - 데이터 모델 구현
  - 통합광고 현황, 매체 현황, 광고관리 훅 구현


## 커밋 규칙

| 종류     | 설명                                         |
| -------- | -------------------------------------------- |
| feat     | 파일, 폴더, 새로운 기능 추가                 |
| fix      | 버그 수정                                    |
| style    | 코드 스타일 변경 + UI 변경                   |
| docs     | 문서 생성, 추가, 수정 README.md              |
| chore    | 수정 (JSON 데이터 포맷 변경 / css 변경 등)   |
| conf     | .env, .gitignore 추가                        |
| refactor | 코드 리팩토링                                |
| rename   | 파일 혹은 폴더명 수정, 옮기는 작업만 한 경우 |
| remove   | 파일 삭제                                    |
| init     | 프로젝트 초기 설정                           |

## 계획

- **대시보드**

  ![ad platform 기획 001](https://user-images.githubusercontent.com/77876601/178675841-b05b49d6-6f5f-488c-8aa8-a97f831d7282.jpeg)

- **광고관리**

  ![ad platform 기획 003](https://user-images.githubusercontent.com/77876601/178675860-26c007c9-9d05-44bc-8296-f880b6664f22.jpeg)

- **모바일 드롭다운 메뉴**

  ![ad platform 기획 002](https://user-images.githubusercontent.com/77876601/178675856-43045e16-b9ba-40a9-bf61-bce15cff82a6.jpeg)

## 커스텀 훅 문서(데이터 불러오기)

### useMediaStatus

**매체 현황**과 관련된 기능

- 훅을 실행하면 `{ loading, mediaStatus, getMediaStatus }` 3개 값을 가진 객체를 반환한다.

- import할 때 매개변수로 queryOption을 받고 그 날짜로 초기 값을 불러온다.

- loading은 훅이 데이터를 불러오는 동안 `boolean`으로 반환한다.

- mediaStatus은 **매체 현황** 값을 갖는다.

- getMediaStatus은 queryOption을 주고 실행하면 option에 맞는 **새로운 값을 요청**한다.
  - queryField는 선택사항으로 기본값은 "date"다. 해당 앱에서는 쓸 일이 없을 거 같다.

```ts
interface QueryOption {
  gte: Date;
  lte: Date;
  queryField?: string;
}
```

### useTotalAdStatus

**통합 광고 현황**과 관련된 기능

- 훅을 실행하면 `{ loading, totalAdStatus, getTotalAdStatus }` 3개 값을 가진 객체를 반환한다.

- import할 때 매개변수로 queryOption을 받고 그 날짜로 초기 값을 불러온다.

- totalAdStatus은 **광고 현황** 값을 갖는다.

- getTotalAdStatus은 queryOption을 주고 실행하면 option에 맞는 **새로운 값을 요청**한다.

### useAdvertisingManagementQuery

**광고관리**와 관련된 기능

훅을 실행하면 `{ loading, managementState, createAdvertising, modifyAdversising, deleteAdversising, getManagementState }` 5개 값을 가진 객체를 반환한다.

- managementState

  광고 상태 값을 갖는다.

- createAdvertising

  | 조건 | 매개변수                                 |
  | ---- | ---------------------------------------- |
  | 필수 | adType, title, budget, startDate, status |
  | 선택 | endDate                                  |

- modifyAdversising

  | 조건 | 매개변수                                         |
  | ---- | ------------------------------------------------ |
  | 필수 | id                                               |
  | 선택 | adType, title, budget, startDate, status,endDate |

- deleteAdversising

  | 조건 | 매개변수 |
  | ---- | -------- |
  | 필수 | id       |

- getManagementState

  managementState을 다시 요청한다.

- 사용 예시

```ts
// 광고 만들기
const { createAdvertising, modifyAdversising, deleteAdversising, getManagementState } = useAdvertisingManagementQuery();
createAdvertising({
  adType: 'web',
  budget: 2384710982,
  startDate: new Date('2022-07-01'),
  title: '테스트 광고 생성',
  status: 'active',
});

// 광고 수정
modifyAdversising({
  id: 5, // id값은 필수 입력
  budget: 500,
  title: '테스트 광고 수정',
  status: 'ended',
});

// 광고 삭제
deleteAdversising(5); // 광고 id만 전달한다

// 광고 목록 다시 요청
getManagementState();
```
