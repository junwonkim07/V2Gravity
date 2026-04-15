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

## 2) Backend(App + Worker) 분리 실행

백엔드 저장소 경로(현재 로컬 기준):

```powershell
cd C:\Users\junwo\OneDrive\문서\github\Tofu-ray_Backend
```

환경 파일 준비:

```powershell
Copy-Item .env.example .env
```

`.env` 필수 값:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME
REDIS_URL=redis://default:PASSWORD@HOST:6379
ORDER_PAID_QUEUE_NAME=order_paid_events
EVENT_WEBHOOK_SECRET=change-me
STORE_JWT_SECRET=change-me
MARZBAN_URL=http://localhost:8000
MARZBAN_USERNAME=admin
MARZBAN_PASSWORD=change-me
```

의존성 설치:

```powershell
pip install -r requirements.txt
```

앱 서버 실행 (터미널 A):

```powershell
uvicorn main:app --host 0.0.0.0 --port 9000 --reload
```

워커 실행 (터미널 B):

```powershell
python worker.py
```

## 3) 한번에 띄우는 최소 순서

터미널 1 (backend app):

```powershell
cd C:\Users\junwo\OneDrive\문서\github\Tofu-ray_Backend
uvicorn main:app --host 0.0.0.0 --port 9000 --reload
```

터미널 2 (backend worker):

```powershell
cd C:\Users\junwo\OneDrive\문서\github\Tofu-ray_Backend
python worker.py
```

터미널 3 (storefront):

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
