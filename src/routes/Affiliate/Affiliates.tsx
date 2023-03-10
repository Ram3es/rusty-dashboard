import AffiliateStatistics from '../../components/affiliate/AffiliateStatistics'
import UserSearch from '../../components/users/UserSearch'
import { useUserContext } from '../../store/UserStore'

enum depositType {
  GIFTCARD = 'deposit-giftcards',
  STEAM = 'steam-deposit'
}

interface affiliateDataObj {
  error: boolean
  data?: {
    codeData: {
      avatar: string
      balance: number
      code: string // name
      earnings: number
      id: number // code id
      owner: number // id
      timestamp: string
      username: string
      wager: number
    }
    cryptoRes: Array<{
      timestamp: string
      value: number
    }> | false
    giftcardAndDeposit: Array<{
      id: number
      timestamp: string
      total: number
      type: depositType
      userid: number
      value: number
    }> | false
    users: Array<{
      affiliate_id: number
      earning: number
      id: number
      timestamp: string
      userid: number
      wager: number
    }>
  }
  msg?: string
}

const Affiliates = () => {
  const [user] = useUserContext()

  const foundUser = (obj: Record<string, string>) => {
    console.log('foundUser', obj)
    const keys = Object.keys(obj)
    if (user.isSystemConnect) {
      user.socket?.emit('admin:affiliate:get', { type: keys[0], value: obj[keys[0]] }, (data: affiliateDataObj) => {
        if (!data?.error) {
          console.log(data?.data)
        } else {
          console.log(data.msg)
        }
      })
    }
  }

  const data = [
    {
      codeName: 'SebManChild1',
      codeClaims: 13430,
      depositors: 31462,
      wagered: 4_631_203_301,
      gameDeposits: 765_837_203,
      shopDeposits: 493_393_734,
      totalDeposits: 1_259_230_937
    }
  ]

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1">
          <AffiliateStatistics affiliatesData={data} />
        </div>
      </div>
    </>
  )
}

export default Affiliates
