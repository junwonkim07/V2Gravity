# 내가 지금 해야 할 일 (Marzban 구독 판매 서비스)

이 문서는 현재 프론트(스토어프론트) 작업이 반영된 상태에서, 실제 서비스 오픈까지 내가 해야 할 작업을 순서대로 정리한 체크리스트입니다.

관련 기술 계약 문서: [marzban-medusa-integration.md](./marzban-medusa-integration.md)

## 1) Medusa 백엔드 준비

- [ ] Medusa 서버 저장소를 준비한다. (이미 있으면 그대로 사용)
- [ ] 로컬/서버에서 Medusa + Postgres + Redis가 정상 실행되는지 확인한다.
- [ ] 환경변수 추가
  - [ ] `MARZBAN_BASE_URL`
  - [ ] `MARZBAN_API_KEY`
  - [ ] `MARZBAN_TIMEOUT_MS` (선택)

확인 기준:
- Medusa admin/store API가 정상 응답한다.
- 환경변수 로드 후 서버가 에러 없이 부팅된다.

## 2) 결제 완료 -> 구독 발급 백엔드 로직 구현

- [ ] 주문 결제 완료 이벤트 핸들러를 만든다.
- [ ] 핸들러에서 주문 라인아이템을 읽고, 구독 상품인지 판별한다.
- [ ] Marzban API 호출로 사용자/구독 링크를 발급한다.
- [ ] 결과를 구독 테이블에 저장한다.
- [ ] 같은 주문/아이템 재처리 시 중복 발급되지 않게 idempotency 처리한다.

권장 상태값:
- `pending`, `active`, `expired`, `cancelled`

## 3) DB 스키마 추가

- [ ] subscriptions 테이블(또는 동등한 모델) 추가
- [ ] 최소 컬럼
  - [ ] `id`
  - [ ] `order_id`
  - [ ] `line_item_id`
  - [ ] `customer_id`
  - [ ] `status`
  - [ ] `marzban_username`
  - [ ] `subscription_url`
  - [ ] `expires_at`
  - [ ] `metadata` (json)
  - [ ] `created_at`, `updated_at`

## 4) Store API 엔드포인트 2개 구현

프론트는 아래 API를 이미 호출하도록 반영되어 있음.

- [ ] `GET /store/subscriptions/me`
  - [ ] 로그인 고객의 구독 목록 반환
- [ ] `GET /store/orders/:id/subscription`
  - [ ] 해당 주문이 로그인 고객 소유인지 검증
  - [ ] 주문 연계 구독 1건(또는 null) 반환

주의사항:
- [ ] 반드시 고객 JWT 인증 필요
- [ ] 타 고객 주문 접근 차단

## 5) 상품 데이터 정리 (구독 플랜 정의)

- [ ] Medusa 상품/variant metadata에 플랜 규칙 저장
  - 예: `plan_id`, `duration_days`, `traffic_limit_gb`, `device_limit`
- [ ] 이벤트 핸들러가 해당 metadata를 읽어 Marzban 발급 파라미터로 사용하게 연결

## 6) 운영 안정성(필수)

- [ ] 실패 재시도 전략(큐/잡) 추가
- [ ] 로그 마스킹 (subscription_url 전체 노출 금지)
- [ ] 환불/취소 시 구독 비활성화 정책 구현
- [ ] 관리자 알림(발급 실패) 추가

## 7) 프론트 연결 확인 (이미 코드 반영됨)

아래 화면에 구독 정보가 나오도록 구현되어 있음.

- [ ] 계정 > Subscriptions 페이지
- [ ] 주문 완료 페이지
- [ ] 주문 상세 페이지

체크 방법:
- [ ] 백엔드 API가 정상 응답하면 화면에 자동 반영되는지 확인
- [ ] subscription_url이 있을 때 링크 열기/복사 동작 확인
- [ ] subscription_url이 없을 때 "발급 중" 안내가 보이는지 확인

## 8) 로컬 통합 테스트 순서

- [ ] Medusa 백엔드 실행
- [ ] 이 storefront 실행
- [ ] 테스트 결제로 주문 완료
- [ ] 이벤트 처리 후 DB에 subscription row 생성 확인
- [ ] 계정/주문 화면에서 링크 노출 확인

## 9) 배포 전 최종 점검

- [ ] 운영 환경변수 설정 확인
- [ ] CORS/도메인 설정 확인
- [ ] 결제 웹훅/이벤트가 운영에서 정상 유입되는지 확인
- [ ] 장애 대응(재시도/알림) 동작 확인

---

## 빠른 시작(오늘 할 최소 작업)

1. Medusa 백엔드에 subscriptions 테이블 + 2개 store API 구현
2. 결제 완료 이벤트 핸들러에서 Marzban 발급 연결
3. 로컬에서 1회 결제 테스트 후 계정 페이지에 링크 노출 확인
