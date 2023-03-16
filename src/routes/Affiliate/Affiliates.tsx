import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AffiliateStatistics, { affiliateStatisticItem } from '../../components/affiliate/AffiliateStatistics'
import UserSearch from '../../components/users/UserSearch'
import { useUserContext } from '../../store/UserStore'
import { depositType, gameModes } from '../../types/Afiliates'

interface IAffiliatesAllStatistic {
  data: {
    data: {
      count: number
      claimed: Array<{
        code: string
        id: number
        steamid: string
        username: string
      }> | false
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
      coinflipAndJackpots: Array<{ // shop balance updates of connected users
        id: number
        timestamp: string
        mode: gameModes
        bet_value: number
        userid: number
      }> | false
    }
    error: boolean
  }
  error: boolean
}

const Affiliates = () => {
  const [user] = useUserContext()
  const [data, setData] = useState<affiliateStatisticItem[]>([])
  const navigate = useNavigate()

  const foundUser = (obj: Record<string, string>) => {
    const keys = Object.keys(obj)
    navigate(`/affiliates/${keys[0]}/${obj[keys[0]]}`)
  }

  const updateStatisticObj = () => {
    user.socket?.emit('admin:affiliate:all', { limit: 3000, offset: 0 }, (data: IAffiliatesAllStatistic) => {
      if (!data?.error) {
        console.log(data?.data)
        let codes: affiliateStatisticItem[] = []
        if (Array.isArray(data.data?.data?.codeData)) {
          codes = data.data.data.codeData.map(item => {
            const depositors = Array.isArray(data.data.data.claimed) ? [...data.data.data.claimed].filter(code => Number(code.code) === item.id) : []
            const shopDeposits: number = Array.isArray(data.data.data.giftcardAndDeposit) && depositors.length > 0
              ? [...data.data.data.giftcardAndDeposit].filter(deposit => depositors.findIndex(user => user.id === deposit.userid) >= 0).reduce((prev, deposit) => (prev += deposit.value), 0)
              : 0
            const cryptoDeposit: number = Array.isArray(data.data.data.cryptoRes) && depositors.length > 0 ? [...data.data.data.cryptoRes].filter(deposit => depositors.findIndex(user => user.id === deposit.user_id) >= 0).reduce((prev, deposit) => (prev += deposit.value), 0) : 0
            const jackpotAndCoinflipDepositsArray = Array.isArray(data.data.data.coinflipAndJackpots) ? [...data.data.data.coinflipAndJackpots].filter(game => (game.mode === gameModes.COINFLIP || game.mode === gameModes.JACKPOT)) : []
            const gameDeposits: number = jackpotAndCoinflipDepositsArray.length > 0 && depositors.length > 0 ? jackpotAndCoinflipDepositsArray.filter(game => depositors.findIndex(user => user.id === game.userid) >= 0).reduce((prev, game) => (prev += game.bet_value), 0) : 0
            return {
              codeName: { name: item.code, id: item.owner },
              codeClaims: depositors.length,
              depositors: depositors
                .reduce((cur, user) => Array.isArray(data.data.data.giftcardAndDeposit) && data.data.data.giftcardAndDeposit.findIndex(transaction => transaction.userid === user.id) >= 0
                  ? ++cur
                  : Array.isArray(data.data.data.cryptoRes) && data.data.data.cryptoRes.findIndex(transaction => transaction.user_id === user.id) >= 0
                    ? ++cur
                    : jackpotAndCoinflipDepositsArray.length > 0 && jackpotAndCoinflipDepositsArray.findIndex(game => game.userid === user.id) >= 0
                      ? ++cur
                      : cur,
                0),
              wagered: Array.isArray(data.data.data.coinflipAndJackpots) && depositors.length > 0 ? data.data.data.coinflipAndJackpots.filter(game => depositors.findIndex(user => user.id === game.userid) >= 0).reduce((prev, game) => (prev += game.bet_value), 0) : 0,
              gameDeposits,
              shopDeposits: shopDeposits + cryptoDeposit,
              totalDeposits: cryptoDeposit + shopDeposits + gameDeposits
            }
          })
        }
        setData(codes)
      } else {
        console.log('error')
      }
    })
  }

  useEffect(() => {
    if (user.isSystemConnect) {
      updateStatisticObj()
    }
  }, [])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <AffiliateStatistics affiliatesData={data} />
        </div>
      </div>
    </>
  )
}

export default Affiliates
