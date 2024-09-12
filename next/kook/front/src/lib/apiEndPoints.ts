import Env from './env'

export const BASE_URL = `${Env.BACKEND_URL}`
export const REGISTER_URL = `${BASE_URL}/api/register`
export const LOGIN_URL = `${BASE_URL}/api/login`
export const CHECK_CREDENTIALS_URL = `${BASE_URL}/api/check/credentials`