# WineLab 개발 로드맵

AI 기반 음식·와인 페어링 추천 모바일 앱  
스택: Expo Router v6 · React Native · NativeWind v4 · TypeScript · MySQL(RDS)

---

## Phase 1 — 데이터 파이프라인 (viviner/)

### ✅ 완료

| 항목 | 내용 |
|------|------|
| HTTP 403 수정 | `requester.py` — User-Agent + Session 추가 |
| 검색 엔진 교체 | `explore/explore` API → **Algolia `WINES_prod`** (정확한 이름 매칭) |
| grapes 필드 수정 | `hit.style.grapes` 없음 확인 → `vintages/{id}` API로 품종 이름 조회 |
| MySQL 마이그레이션 | SQLite 제거 → `mysql-connector-python` + `.env` 환경변수 |
| DB 스키마 설계 | `UNIQUE KEY (id, vintage_year)` — 같은 와인 빈티지별 개별 행 저장 |
| FULLTEXT 인덱스 | `(name, winery)` — 앱에서 한국어 이름 검색 지원 |
| `import_to_db.py` | 이름 목록 파일 → Algolia 검색 → taste API → MySQL UPSERT |
| `bulk_scraper.py` | explore API 전체 순회 → 수천 개 와인 자동 수집 → RDS 저장 |

### DB 스키마 (최종)

```sql
wines (
  pk               INT AUTO_INCREMENT PK,
  id               INT,              -- Vivino wine ID
  name             VARCHAR(255),
  winery           VARCHAR(255),
  region           VARCHAR(255),
  country          VARCHAR(100),
  wine_type        VARCHAR(50),      -- Red/White/Rosé/Sparkling/Dessert/Port
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

### 📋 남은 작업

- [ ] `bulk_scraper.py` 실제 실행 테스트 (`--dry-run` 먼저)
- [ ] AWS RDS 생성 및 `.env` 연결 설정
- [ ] 전체 수집 실행 — 예상 ~4,800개 (min_rating=3.5 기준, 약 40분)

```bash
# 로컬 테스트
python bulk_scraper.py --dry-run --types 1 --min-rating 4.5

# RDS 전체 적재
python bulk_scraper.py --min-rating 3.5
```

---

## Phase 2 — 백엔드 API

### 📋 남은 작업

- [ ] 기술 스택 결정 (Next.js API Routes vs Express vs FastAPI)
- [ ] `/api/wines/search?q=` — FULLTEXT 검색 엔드포인트
- [ ] `/api/wines/:id` — 와인 상세 조회
- [ ] `/api/recommend` — 음식 → 와인 페어링 추천 (LLM 연동)
- [ ] RDS 연결 및 쿼리 레이어

---

## Phase 3 — 모바일 앱 (Expo)

### ✅ 완료

| 항목 | 내용 |
|------|------|
| 로그인 | 카카오 · 구글 소셜 로그인 |
| 네비게이션 | 하단 탭 바 + 아이콘 |
| UI 컴포넌트 | `Button`, `Input`, `TasteSlider` |
| 디자인 토큰 | `cream`, `gold` 커스텀 색상 (tailwind.config.js) |

### 📋 남은 작업

- [ ] 홈 화면 — 음식 입력 or 사진 업로드
- [ ] 와인 검색 화면
- [ ] 와인 상세 화면 — taste radar chart, grapes, 이미지
- [ ] 페어링 추천 결과 화면
- [ ] 소믈리에 AI 채팅 화면 (LLM)
- [ ] 온보딩 플로우

---

## Phase 4 — AI 기능

### 📋 남은 작업

- [ ] 음식 → 와인 페어링 로직 (taste profile 매칭)
- [ ] Claude/GPT 소믈리에 채팅 (Vivino DB 기반 RAG)
- [ ] 사진 업로드 → 음식 인식 → 와인 추천

---

## 파일 구조 현황

```
winelab-app/
├── viviner/                  # Python 데이터 파이프라인
│   ├── bulk_scraper.py       # ✅ explore API 대량 수집
│   ├── import_to_db.py       # ✅ 이름 기반 단건 저장
│   ├── search_wine.py        # ✅ Algolia 검색 + grapes 조회
│   ├── wine_profile.py       # ✅ taste profile (tannin/acidity/sweetness/body)
│   ├── wines_input.txt       # 테스트용 와인 5개
│   └── utils/
│       ├── constants.py      # BASE_URL
│       └── requester.py      # HTTP 클라이언트
├── components/ui/            # Button, Input, TasteSlider
├── wireframes/               # 06-wine-detail.html
└── CLAUDE.md
```

---

## API 호출 구조 (현재)

```
이름 기반 (import_to_db):        bulk 수집 (bulk_scraper):
  Algolia 검색 (1회)               explore/explore (1회/페이지)
      ↓                                ↓
  vintages/{id} → grapes (1회)    wine.style.grapes 직접 포함 ✅
      ↓                                ↓
  wines/{id}/tastes (1회)         wines/{id}/tastes (1회)
      ↓                                ↓
  MySQL UPSERT                    MySQL UPSERT
  총 3회/와인                      총 2회/와인
```
