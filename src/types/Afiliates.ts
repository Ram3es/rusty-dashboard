import { User } from './User'

export enum depositType {
  GIFTCARD = 'deposit-giftcards',
  STEAM = 'steam-deposit'
}

export enum gameModes {
  COINFLIP = 'coinflip',
  JACKPOT = 'jackpot',
  MINES = 'mines',
  PLINKO = 'plinko',
  PVP_MINES = 'pvp-mines',
  UPGRADER = 'upgrader',
  WHEEL = 'wheel',
}

export interface affiliateDataObj {
  error: boolean
  data?: {
    claimed: Array<{
      code: string
      id: number
      steamid: string
      username: string
      timestamp: string
      avatar: string
    }> | false
    codeData: Array<{
      avatar: string
      balance: number // allow to claim
      code: string // name
      earnings: number // total earned
      id: number // code id
      owner: number // id
      timestamp: string
      username: string
      wager: number // total deposited
    }>
    cryptoRes: Array<{ // shop balance updates of connected users
      timestamp: string
      value: number
      user_id: number
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
    coinflipAndJackpots: Array<{ // shop balance updates of connected users
      id: number
      timestamp: string
      mode: gameModes
      bet_value: number
      userid: number
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
