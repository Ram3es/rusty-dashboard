import { Time } from './Time'

export interface User {
  name: string
  email?: string
  avatar: string
}

export interface UserWithFields extends User {
  steam64Id: string
  uid: string
  discordId: string
  affiliateCode: string
  tradeUrl: string
  withrdraw: string
  muted: boolean
  mutedLength: Time
  mutedReason: string
  banned: boolean
  bannedLength: Time
  bannedReason: string
  created: Date
  registerIp: string
  lattestIp: string
  lattestLogin: Date
}
