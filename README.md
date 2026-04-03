# 💅 Nail Art AI: 사용자 맞춤형 네일 디자인 생성 플랫폼

> **AI를 활용하여 상상 속의 네일 아트를 현실로 시각화하고, 나만의 스타일을 관리하는 서비스입니다.**

## 📑 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [주요 기능](#-주요-기능)
3. [기술 스택](#-기술-스택)
4. [아키텍처 및 폴더 구조](#-아키텍처-및-폴더-구조)
5. [기술적 성장 및 문제 해결](#-기술적-성장-및-문제-해결)
6. [시작하기](#-시작하기)

---

## 🚀 프로젝트 소개
*   **개발 기간**: 2025.03 ~ 2026.03 (약 1년)
*   **서비스 목적**: 사용자가 원하는 네일 사양(모양, 길이, 색상, 스타일)을 선택하면 AI가 이를 바탕으로 고품질의 네일 아트 이미지를 생성하여 개인별 스타일링을 돕는 서비스입니다.
*   **주요 성과**:
    *   **Polar.sh 기반 구독 결제 시스템 구축**: 유료 디자인 생성 권한 제어 및 결제 웹훅(Webhook) 처리 로직 구현
    *   **Stable Diffusion에서 Nano Banana API로 전환**: 이미지 생성 엔진 고도화를 통한 비약적 품질 향상
    *   **SEO 및 데이터 분석 환경 구축**: Google Search Console, GA4, Clarity를 통한 가시성 확보 및 사용자 행동 분석
    *   **Cloudflare Functions 서버리스 아키텍처**: 보안성과 확장성을 고려한 백엔드 API 설계
    *   **Supabase + Resend SMTP**: 안정적인 사용자 인증(Auth) 흐름 및 커스텀 이메일 인프라 최적화
    *   **Tailwind CSS v4**를 활용한 최신 스타일링 워크플로우 도입

## ✨ 주요 기능

### 🎨 1. AI 디자인 생성 및 프롬프트 빌더
*   **세밀한 선택 시스템**: 네일의 모양(Shape), 길이(Length), 색상(Color), 아트 스타일을 선택하면 최적의 이미지를 생성하도록 영문 프롬프트를 자동으로 빌드합니다.
*   **프리미엄 기능**: Polar.sh를 통한 결제 시스템을 연동하여 유료 디자인 생성 및 구독 기반 기능을 제공합니다.

### 🔐 2. 인증 및 보안
*   **Supabase Auth**: 이메일 기반 로그인 및 회원가입, 비밀번호 재설정 프로세스를 구현했습니다.
*   **커스텀 이메일**: Resend SMTP를 연동하여 안정적인 인증 메일 발송 환경을 구축했습니다.
*   **봇 방지**: Cloudflare Turnstile을 적용하여 회원가입 시 자동화된 계정 생성을 방지합니다.

### 📊 3. 분석 및 SEO 최적화
*   **SEO**: 검색 엔진 최적화를 위해 메타 태그 관리 및 Google Search Console을 통한 색인 관리를 수행합니다.
*   **데이터 분석**: GA4와 Microsoft Clarity를 연동하여 사용자 유입 경로 및 히트맵 기반의 행동 패턴을 추적합니다.

---

## 🛠 기술 스택

### Frontend
- **Framework**: `React 19` (Vite)
- **Styling**: `Tailwind CSS v4`, `PostCSS`
- **State Management**: `Context API` (Localization, Auth)
- **Form Management**: `React Hook Form`
- **Routing**: `React Router DOM v7`

### Backend & Database
- **BaaS**: `Supabase` (Auth, Database, RLS)
- **Serverless**: `Cloudflare Pages Functions` (API Endpoints, Webhooks)
- **Security**: `Cloudflare Turnstile` (Bot protection)
- **Email Service**: `Resend` (Custom SMTP for Auth)
- **Payment**: `Polar.sh`

### Analytics & SEO
- **Search Engine**: `Google Search Console` (Indexing & SEO monitoring)
- **User Analytics**: `Google Analytics 4 (GA4)`
- **Behavior Analysis**: `Microsoft Clarity` (Heatmaps & Session recordings)

### Tools & Deployment
- **Deployment**: `Cloudflare Pages` (Continuous Deployment)
- **Environment**: `Wrangler` (CF Pages local dev environment)
- **Linter**: `ESLint`, `Prettier`

---

## 📂 아키텍처 및 폴더 구조

```text
src/
├── components/          # 공통 UI 및 레이아웃 컴포넌트 (Tailwind 활용)
├── contexts/            # 전역 상태 (LanguageContext)
├── constants/           # 정적 설정 (Art Styles, Translations)
├── pages/               # 주요 뷰 (Landing, Generate, MyPage, Terms 등)
├── utils/               # 프롬프트 빌더 등 비즈니스 로직
└── supabase.js          # Supabase 클라이언트 설정

functions/               # Cloudflare Workers/Functions (Server Side Logic)
└── api/                 # AI 생성, 결제(Polar), 회원 세션 API
```

---

## 💡 기술적 성장 및 문제 해결

### 1. 이미지 생성 엔진 고도화: Stable Diffusion → Nano Banana API 전환
*   **문제**: 초기 단계에서 Stable Diffusion을 활용했으나, 네일 아트 특유의 정교한 디테일 표현이 뭉개지는 한계가 발견됨.
*   **해결**: 네일 디자인에 최적화된 **Nano Banana API**로 생성 엔진을 전격 교체하고 프롬프트 파이프라인을 재설계함.
*   **성과**: 이미지 실사감 및 디자인 디테일 표현력 대폭 향상 (시술 전 가상 체험 서비스의 실효성 확보).

### 2. 보안을 강화한 서버리스 백엔드 구축 (Cloudflare Functions)
*   **문제**: 프론트엔드에서 API Key를 직접 관리할 경우 노출 위험 및 비용 발생 우려.
*   **해결**: **Cloudflare Functions**를 미들웨어로 구축하여 모든 API Key를 서버 측 환경 변수로 은닉하고 이중 인증 보안 계층을 강화함.
*   **성과**: 외부 API Key 노출을 원천 차단하고, 봇 등 비정상 접근을 막아 운영 비용 절감 및 안정성 확보.

### 3. 고성능 폼 관리 및 유효성 검사 (React Hook Form)
*   **문제**: 복잡한 사용자 입력 폼에서 상태 변화 시마다 발생하는 불필요한 전체 리렌더링으로 인한 UX 저하.
*   **해결**: **React Hook Form**을 도입하여 비제어 컴포넌트 방식으로 폼 데이터를 관리함.
*   **성과**: 렌더링 부하를 최소화하여 매끄러운 입력 경험을 제공하고, 폼 관리 로직의 유지보수 효율성을 향상시킴.

### 4. 이메일 발송 안정성 및 브랜드 신뢰도 향상 (Supabase + Resend SMTP)
*   **문제**: Supabase 기본 이메일 제공자의 엄격한 발송 제한으로 인한 인증 메일 누락 발생.
*   **해결**: 고성능 이메일 API 서비스인 **Resend**를 커스텀 SMTP로 연동함.
*   **성과**: 인증 흐름의 안정성을 확보하고 커스텀 도메인 이메일 발송을 통해 브랜드 신뢰도 제고.

### 5. 데이터 기반의 UX 개선 환경 구축 (SEO & Analytics)
*   **문제**: 신규 사용자의 유입 경로 및 서비스 내 주요 이탈 지점을 파악하기 어려운 블랙박스 상태였음.
*   **해결**: **GA4**와 **Microsoft Clarity**를 연동하고, **Google Search Console**을 통해 검색 결과 가시성을 관리함.
*   **성과**:
    *   히트맵 분석을 통해 사용자 클릭 집중 구역을 파악하여 UI 레이아웃 개선의 근거 마련.
    *   SEO 최적화를 통해 주요 키워드 검색 노출도를 높이고 사이트 인덱싱 상태를 체계적으로 관리함.

---

## 🛠 시작하기

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행 (Vite + Cloudflare Functions)
npm run dev:pages

# 빌드
npm run build
```
