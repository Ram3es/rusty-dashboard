import { User } from './User'

enum depositType {
  GIFTCARD = 'deposit-giftcards',
  STEAM = 'steam-deposit'
}

export interface affiliateDataObj {
  error: boolean
  data?: {
    codeData: {
      avatar: string
      balance: number // allow to claim
      code: string // name
      earnings: number // total earned
      id: number // code id
      owner: number // id
      timestamp: string
      username: string
      wager: number // total deposited
    }
    cryptoRes: Array<{ // shop balance updates of connected users
      timestamp: string
      value: number
    }> | false
    giftcardAndDeposit: Array<{ // shop balance updates of connected users
      id: number
      timestamp: string
      total: number
      type: depositType
      userid: number
      value: number
    }> | false
    users: Array<{ // all trades of connected users to affiliate code
      affiliate_id: number
      earning: number
      id: number
      timestamp: string
      userid: number
      wager: number
    }> | false
  }
  msg?: string
}

export interface generalInfoObj {
  user: User
  statistic: {
    code: string
    claims: string
    depositors: string
    totalDeposited: string
    earnings: string
    currentBalance: string
  }
}
