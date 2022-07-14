# wanted-3team-ad-platform

## Commit convention

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

## Custom hook documents: for data fetch

### `useMediaQuery` : 매체 현황을 요청한다

훅을 실행하면 `{ loading, mediaReports, queryMediaReports }` 3개 값을 가진 객체를 반환한다.

- 훅이 데이터를 불러오는 동안 `loading`이 `boolean` 값을 갖는다.
- `mediaReports`은 **매체 현황** 값을 갖는다.
- `queryMediaReports`에 `queryOption`을 주고 실행하면 option에 따라 **새로운 값을 요청**한다.

### `useIntegrationStatusQuery` : 통합 광고 현황을 요청한다

훅을 실행하면 `{ loading, integrationReports, queryIntegrationStatus }` 3개 값을 가진 객체를 반환한다.

- `integrationReports`은 **매체 현황** 값을 갖는다.
- `queryIntegrationStatus`에 `queryOption`을 주고 실행하면 option에 따라 **새로운 값을 요청**한다.

### `useAdvertisingManagementQuery` : 광과관리를 요청한다

훅을 실행하면 `{ loading, managementState }` 2개 값을 가진 객체를 반환한다.

- `managementState`은 **매체 현황** 값을 갖는다.
- `queryOption`을 정하지 않아 query를 작동하는 기능은 없다
