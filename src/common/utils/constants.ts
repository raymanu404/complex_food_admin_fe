import { PathRecord } from './interfaces'

const BACKEND_BASE_API_URL = import.meta.env.VITE_BACKEND_BASE_API_URL
const BACKEND_ADMIN_PATH = import.meta.env.VITE_ADMIN_API_PATH
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLIC_KEY_API = import.meta.env.VITE_SUPABASE_PUBLIC_KEY_API
const CLIENT_APP_URL = import.meta.env.VITE_CLIENT_APP_URL
const SUPABASE_SERVICE_ROLE_KEY_API = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY_API

const APP_CLIENT_PATH_HOME = '/home'

const DEFAULT_PAGE_SIZE = 10

const DEFAULT_NA = 'N/A'
const RO_CURRENCY = 'RON'
const VAT = 'VAT'

const PATHS: PathRecord = {
  HOME: '/home',
  ORDERS: '/orders',
  PRODUCTS: '/products',
  LOGIN: '/login',
  NOT_FOUND: '/not-found',
  EVERYTHING: '*',
  USERS: '/users',
  INVITE_ADMIN: '/invite_admin',
  CONFIRM_ACCOUNT: '/confirm_account',
  DEFAULT: '/',
}

const SUPABASE_PRODUCTS_STORAGE_NAME = 'products'
const SUPABASE_STORAGE_RELATIVE = 'storage/v1/object/public'
const SUPABASE_STORAGE_PUBLIC_FOLDER = 'public'
const SUPABASE_STORAGE_CATEGORIES_FOLDER = 'categories'

export {
  BACKEND_BASE_API_URL,
  APP_CLIENT_PATH_HOME,
  BACKEND_ADMIN_PATH,
  DEFAULT_PAGE_SIZE,
  DEFAULT_NA,
  RO_CURRENCY,
  SUPABASE_PUBLIC_KEY_API,
  SUPABASE_URL,
  SUPABASE_PRODUCTS_STORAGE_NAME,
  SUPABASE_STORAGE_RELATIVE,
  SUPABASE_STORAGE_PUBLIC_FOLDER,
  PATHS,
  CLIENT_APP_URL,
  VAT,
  SUPABASE_SERVICE_ROLE_KEY_API,
  SUPABASE_STORAGE_CATEGORIES_FOLDER,
}
