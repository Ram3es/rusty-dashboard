import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AffilateUserStatistics from '../../components/affiliate/AffiliateUserStatistics'
import AffiliateMainItemStatistics from '../../components/affiliate/AffiliateMainItemStatistics'
import DepositBreakdown from '../../components/affiliate/DepositBreakdown'
// import DepositAndWithdrawPipeChart from '../../components/dashboard/DepositAndWithdrawPipeChart'
// import Graph from '../../components/base/Graph'
import UserSearch from '../../components/users/UserSearch'
import { useUserContext } from '../../store/UserStore'
import { affiliateDataObj } from '../../types/Afiliates'
import AffiliateClaimsAndDepositorsGraph from '../../components/affiliate/AffiliateClaimsAndDepositorsGraph'
import AffiliateWagersAndDepositsGraph from '../../components/affiliate/AffiliateWagersAndDepositsGraph'
import AffiliateDepositPipeChart from '../../components/affiliate/AffiliateDepositPipeChart'

export interface IGraphData {
  name: string
  value: number[]
  colors: Array<{ postitveColor: string }>
}

export interface IGrapgNames {
  name: string
  value: string | number
  color: string
  withIcon?: boolean | undefined
}

const Affiliateitem = () => {
  const [user] = useUserContext()
  const params = useParams()
  const [userData, setUserData] = useState<affiliateDataObj>()

  const foundUser = (obj: Record<string, string>) => {
    const keys = Object.keys(obj)
    if (user.isSystemConnect && keys[0] && obj[keys[0]]) {
      user.socket?.emit('admin:affiliate:get', { type: keys[0], value: obj[keys[0]], qty: 999 }, (data: affiliateDataObj) => {
        if (!data?.error && data.data) {
          setUserData(data)
        } else {
          console.log(data.msg)
          setUserData(undefined)
        }
      })
    }
  }

  const chandeAfiliateCode = (userId: string, newCode: string) => {
    if (user.isSystemConnect) {
      user.socket?.emit('admin:affiliate:edit', { userid: userId, code: newCode.toUpperCase() }, (data: any) => {
        if (!data?.error) {
          setUserData(prev => {
            if (prev?.data) {
              const newUser = { ...prev }
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              newUser.data!.codeData[0].code = newCode.toUpperCase()
              return newUser
            }
          })
        } else {
          console.log(data.msg)
        }
      })
    }
  }

  useEffect(() => {
    if (params.type && params.value) foundUser({ [params.type]: params.value })
  }, [params])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <AffiliateMainItemStatistics
            userInfo={userData}
            onCodeChange={chandeAfiliateCode}
          />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <AffiliateClaimsAndDepositorsGraph userData={userData} />
        </div>
        <div className='col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 p-8'>
          <AffiliateDepositPipeChart userData={userData} />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <AffiliateWagersAndDepositsGraph userData={userData} />
        </div>
        <div className='col-span-6 2xl:col-span-3  rounded-lg bg-dark-1 p-8'>
          <DepositBreakdown userData={userData} />
        </div>
        <div className='col-span-6 rounded-lg bg-dark-1 p-8'>
          <AffilateUserStatistics userData={userData} />
        </div>
      </div>
    </>
  )
}

export default Affiliateitem
