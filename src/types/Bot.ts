import { User } from './User'

export interface Bot {
  user: User
  status: string
  type: string
  id: string
  steamId: string
  proxy: string
  userName: string
  userPassword: string
  actionId: string
  isBotPublished: boolean
}