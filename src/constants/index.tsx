import { TimeOption } from '../types/TimeOption'

export const API_URLS = {
  API_URL: import.meta.env.VITE_API_URL
}

export const TIME_OPTIONS: TimeOption[] = [
  { id: 1, name: 'Day', unavailable: false },
  { id: 2, name: 'This Week', unavailable: false },
  { id: 3, name: 'This Month', unavailable: false }
]
