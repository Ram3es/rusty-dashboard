import { TimeOption } from '../types/TimeOption'

export const API_URLS = {
  API_URL: import.meta.env.VITE_API_URL
}

export const TIME_OPTIONS: TimeOption[] = [
  { id: 1, name: 'Day', unavailable: false },
  { id: 2, name: 'Week', unavailable: false },
  { id: 3, name: 'Month', unavailable: false }
]

export const TIME_OPTIONS_AFFILIEATES: TimeOption[] = [
  { id: 1, name: 'Day', unavailable: false, days: 1 },
  { id: 2, name: 'Week', unavailable: false, days: 7 },
  { id: 3, name: 'Month', unavailable: false, days: 30 }
  // { id: 4, name: 'All', unavailable: false, days: 999 }
]
