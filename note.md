# Local 실행 명령어 노트

아래만 따라 하면 로컬에서 바로 실행 가능.

## 1) Storefront 실행 (현재 저장소)

작업 경로:

```powershell
cd C:\Users\junwo\OneDrive\문서\github\Tofu-ray
```

환경 파일 준비 (최초 1회):

```powershell
Copy-Item .env.template .env.local
```

필수 env 확인 (`.env.local`):

```env
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_STRIPE_KEY=pk_test_... # Stripe 쓸 때만
```

의존성 설치 + 실행:

```powershell
yarn
yarn dev
```

접속:
- http://localhost:8000

## 2) Medusa 백엔드 실행 (별도 저장소/프로젝트)

이미 백엔드 저장소가 있으면 그 경로에서:

```powershell
yarn
yarn dev
```

기본 포트:
- http://localhost:9000

백엔드가 아직 없으면 빠른 생성:

```powershell
npx create-medusa-app@latest
```

생성 후 backend 폴더에서 dev 실행.

## 3) 한번에 띄우는 최소 순서

터미널 1 (backend):

```powershell
# 백엔드 프로젝트 경로
yarn dev
```

터미널 2 (storefront):

```powershell
cd C:\Users\junwo\OneDrive\문서\github\Tofu-ray
yarn dev
```

## 4) 실행 확인용 빠른 체크

브라우저에서:
1. http://localhost:8000 접속
2. 상품 상세 -> Add to cart
3. Cart -> Checkout 진입

문제 생기면 먼저 확인:
1. backend 9000 살아있는지
2. `.env.local`의 `MEDUSA_BACKEND_URL` 값
3. `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` 값
