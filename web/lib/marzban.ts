import axios from 'axios'

const BASE_URL = process.env.MARZBAN_URL
let token: string | null = null

// 로그인 토큰 발급
async function getToken() {
  if (token) return token

  const res = await axios.post(`${BASE_URL}/api/admin/token`, {
    username: process.env.MARZBAN_USERNAME,
    password: process.env.MARZBAN_PASSWORD,
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })

  token = res.data.access_token
  return token
}

// 플랜별 만료일 계산
export function getExpireDate(plan: '1month' | '3month' | '1year') {
  const now = new Date()
  if (plan === '1month')  now.setMonth(now.getMonth() + 1)
  if (plan === '3month')  now.setMonth(now.getMonth() + 3)
  if (plan === '1year')   now.setFullYear(now.getFullYear() + 1)
  return Math.floor(now.getTime() / 1000) // Unix timestamp
}

// 유저 생성
export async function createMarzbanUser(username: string, plan: '1month' | '3month' | '1year') {
  const t = await getToken()

  const res = await axios.post(`${BASE_URL}/api/user`, {
    username,
    proxies: { vless: {}, vmess: {} }, // 필요한 프로토콜만
    data_limit: 0,                      // 0 = 무제한
    expire: getExpireDate(plan),
  }, {
    headers: { Authorization: `Bearer ${t}` }
  })

  return res.data
}

// 구독 링크 조회
export async function getMarzbanSubLink(username: string) {
  return `${BASE_URL}/sub/${username}`
}

// 만료일 연장 (재구독)
export async function extendMarzbanUser(username: string, plan: '1month' | '3month' | '1year') {
  const t = await getToken()

  const res = await axios.put(`${BASE_URL}/api/user/${username}`, {
    expire: getExpireDate(plan),
  }, {
    headers: { Authorization: `Bearer ${t}` }
  })

  return res.data
}

// 유저 삭제
export async function deleteMarzbanUser(username: string) {
  const t = await getToken()

  await axios.delete(`${BASE_URL}/api/user/${username}`, {
    headers: { Authorization: `Bearer ${t}` }
  })
}