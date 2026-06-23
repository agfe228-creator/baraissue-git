# 축제바라

전국 축제, 박람회, 전시회, 공연 정보를 검색하고 확인하는 정보 포털형 블로그입니다.

## 실행 방법

```bash
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 시드 데이터 생성

```bash
npm run seed
```

초기 데이터는 총 400개입니다. 축제, 박람회, 전시회, 공연이 각각 100개씩 생성됩니다.

## 빌드 방법

```bash
npm run build
```

## 클릭 가능한 요소

- 로고: `/`
- 상단 메뉴: `/festival`, `/fair`, `/exhibition`, `/performance`, `/region/seoul`, `/month/6`
- 검색 버튼과 검색 아이콘: `/search?q=검색어`
- 햄버거 버튼: 모바일 메뉴 열기/닫기
- 인기 키워드 칩: `/search?q=키워드`
- 카테고리 카드: 각 카테고리 목록 페이지
- 행사 카드와 자세히 보기 버튼: `/event/[slug]`
- 하트 버튼: localStorage 관심 행사 저장/해제
- 공유 버튼: 현재 상세 페이지 URL 복사 또는 네이티브 공유
- 홈페이지 링크: 새 탭으로 외부 링크 열기
- 지역 바로가기: `/region/[slug]`
- 더보기 링크: 관련 목록 페이지
- 필터 select: URL query 갱신
- 정렬 select: 최신순/시작일순 변경
- 목록/그리드 전환: 현재 화면 보기 방식 변경
- 페이지네이션: `page` query 갱신
- 상세 탭: 행사 소개, 교통 안내, 주차 정보, FAQ, 관련 행사 전환
- 모바일 하단 탭바: 홈, 검색, 찜, 메뉴
- 문의 폼 제출: 현재는 콘솔 기록과 화면 안내
- 푸터 링크: 소개, 문의, 개인정보처리방침, 이용약관

## 공공데이터 API 연결 위치

외부 API 연동은 `src/providers` 아래 provider 파일에서 진행합니다.

- `src/providers/festivalProvider.ts`
- `src/providers/fairProvider.ts`
- `src/providers/exhibitionProvider.ts`
- `src/providers/performanceProvider.ts`

`scripts/sync-events.ts`는 provider 결과를 모아 slug 기준으로 중복을 제거하는 구조입니다.

한국관광공사 TourAPI 키가 있으면 `.env`에 아래 값을 넣고 동기화할 수 있습니다.

```env
TOUR_API_SERVICE_KEY="발급받은_서비스키"
```

```bash
npm run sync
```

키가 없으면 provider는 seed 데이터를 사용합니다. 현재 TourAPI 연동은 행사/축제 데이터를 우선 가져오고, 박람회/전시회/공연은 제목 키워드로 1차 분류합니다. 정확도를 높이려면 이후 공공데이터포털의 전시·공연 전용 API를 추가 provider로 붙이면 됩니다.

## 애드센스 코드 삽입 위치

광고 삽입 위치는 `src/components/AdBox.tsx`입니다. 애드센스 심사 전에는 빈 광고 박스가 사용자 경험을 해칠 수 있어 기본값으로 숨깁니다. 승인 후 `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS="true"`로 위치를 확인한 뒤 이 컴포넌트 안에 광고 스크립트와 슬롯 코드를 넣으면 메인, 목록, 상세 페이지에 반영됩니다.

## 주요 페이지

- `/`
- `/festival`
- `/fair`
- `/exhibition`
- `/performance`
- `/region/[slug]`
- `/month/[month]`
- `/search`
- `/favorites`
- `/event/[slug]`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
