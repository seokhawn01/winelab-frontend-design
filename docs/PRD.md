# WineLab PRD (Frontend Focused)

## 1. 목적

현재 단계는 **프론트엔드 UI 구현**에 집중한다.  
백엔드/AI 기능은 **Mock 데이터 기반**으로 대체한다.

---

## 2. MVP 핵심 기능 (프론트 기준)

### 인증
- 로그인 화면 UI
- 회원가입 화면 UI
- 유효성 검사 (프론트)

### 취향 설정
- 4가지 슬라이더 UI
  - 탄닌 / 산미 / 바디 / 당도
- 기본값: 2.5

### 홈 화면
- 사용자 인사 UI
- 취향 레이더 (Mock 데이터)
- 추천 와인 카드 3개

### AI 추천 화면
- 음식 입력 UI
- 추천 결과 카드 (Mock 데이터)
- 추천 이유 텍스트 표시

### 와인 상세
- 와인 정보 UI
- 맛 프로파일 바
- “마셨어요” 버튼

### 검색
- 검색 입력 UI
- 필터 (레드/화이트 등)
- 결과 리스트 UI

### 마이페이지
- 취향 프로파일
- 캘린더 UI
- 컬렉션 리스트

### 리뷰 작성
- 4가지 속성 점수 선택
- 텍스트 입력
- 저장 버튼 UI

---

## 3. 제외 기능 (현재 단계)

- 실제 로그인 API
- AI 추천 API
- OCR 스캔
- 서버 데이터 저장
- 소셜 기능

---

## 4. Mock 데이터 구조

```ts
export const mockWine = {
  id: "1",
  name: "Cabernet Sauvignon",
  type: "red",
  region: "France",
  attributes: {
    tannin: 3.5,
    acidity: 3.0,
    body: 4.0,
    sweetness: 1.5
  }
}