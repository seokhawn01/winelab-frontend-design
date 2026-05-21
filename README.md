# 🍷 WineLab

> AI 기반 음식·와인 페어링 추천 모바일 앱

음식을 입력하면 어울리는 와인을 추천해주고, 개인 취향 프로파일을 기반으로 소믈리에 AI가 큐레이션해주는 앱입니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 모바일 | Expo (Router v6) · React Native · TypeScript |
| 스타일 | NativeWind v4 (Tailwind CSS) |
| 데이터 파이프라인 | Python · Vivino API · Algolia |
| 데이터베이스 | MySQL 8.4 (AWS RDS) |
| AI (예정) | Claude API · RAG |

---

## 진행 현황

### ✅ 완료

- 카카오 · 구글 소셜 로그인
- 하단 탭 네비게이션
- UI 컴포넌트 (`Button`, `Input`, `TasteSlider`)
- 디자인 토큰 — `cream`, `gold` 커스텀 색상
- Vivino 데이터 파이프라인 (`bulk_scraper.py`)
- AWS RDS 스키마 및 연결 설정

### 🔄 진행 중

- 홈 화면 · 와인 검색 · 상세 화면
- 페어링 추천 결과 화면
- 백엔드 API (`/api/wines`, `/api/recommend`)

---

## 프로젝트 구조

```
winelab-app/
├── app/                    # Expo Router 화면
│   ├── (auth)/             # 로그인·회원가입
│   ├── (tabs)/             # 탭 네비게이션
│   └── _layout.tsx
├── components/
│   └── ui/                 # Button, Input, TasteSlider
├── docs/
│   └── PRD.md              # 기능 명세
├── viviner/                # Python 데이터 파이프라인
│   ├── bulk_scraper.py     # Vivino 전체 수집 → RDS
│   ├── import_to_db.py     # 이름 기반 단건 저장
│   ├── search_wine.py      # Algolia 검색 모듈
│   ├── wine_profile.py     # taste profile 조회
│   ├── wines_input.txt     # 테스트용 와인 목록
│   └── utils/
│       ├── constants.py
│       └── requester.py
├── ROADMAP.md
└── global.css
```

---

## 시작하기

### 모바일 앱

```bash
npm install
npx expo start
```

### 데이터 파이프라인

```bash
cd viviner

# 패키지 설치
pip install -r requirements.txt

# .env 설정 (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS)
cp .env.example .env

# 테스트 (DB 저장 없이)
python bulk_scraper.py --dry-run --max-wines 10

# 전체 수집 (~3,700개)
python bulk_scraper.py --min-rating 3.5
```

---

## DB 스키마

```sql
wines (
  pk               INT AUTO_INCREMENT PK,
  id               INT,              -- Vivino wine ID
  name             VARCHAR(255),
  winery           VARCHAR(255),
  region           VARCHAR(255),
  country          VARCHAR(100),
  wine_type        VARCHAR(50),      -- Red / White / Rosé / Sparkling / Dessert / Port
  vintage_year     SMALLINT,         -- 0 = NV
  grapes           TEXT,             -- "Cabernet Sauvignon, Merlot, ..."
  w_tannin         DECIMAL(3,2),
  w_acidity        DECIMAL(3,2),
  w_sweetness      DECIMAL(3,2),
  w_body           DECIMAL(3,2),
  ratings_average  DECIMAL(3,2),
  image_bottle_url TEXT,
  UNIQUE KEY (id, vintage_year),
  FULLTEXT KEY (name, winery)
)
```

---

## 주요 화면 (MVP)

| 화면 | 설명 |
|------|------|
| 홈 | 취향 레이더 차트 + 추천 와인 카드 3개 |
| AI 추천 | 음식 입력 → 페어링 와인 추천 |
| 와인 상세 | 맛 프로파일 바 · 품종 · 이미지 |
| 검색 | 이름 검색 + 레드/화이트 등 필터 |
| 마이페이지 | 취향 설정 · 컬렉션 · 캘린더 |

---

> 상세 개발 계획은 [ROADMAP.md](./ROADMAP.md) 참고
