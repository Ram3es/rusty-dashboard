import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AffilateUserStatistics from '../../components/affiliate/AffiliateUserStatistics'
import AffiliateMainItemStatistics from '../../components/affiliate/AffiliateMainItemStatistics'
import DepositBreakdown from '../../components/affiliate/DepositBreakdown'
import GraphAffilateStatistic from '../../components/affiliate/GraphAffilateStatistic'
// import DepositAndWithdrawPipeChart from '../../components/dashboard/DepositAndWithdrawPipeChart'
// import Graph from '../../components/base/Graph'
import UserSearch from '../../components/users/UserSearch'
import { useUserContext } from '../../store/UserStore'
import { affiliateDataObj, generalInfoObj } from '../../types/Afiliates'

const Affiliateitem = () => {
  const [user] = useUserContext()
  const params = useParams()
  const [generalInfo, setGeneralInfo] = useState<generalInfoObj>()

  const foundUser = (obj: Record<string, string>) => {
    console.log('foundUser', obj)
  }

  useEffect(() => {
    if (user.isSystemConnect && params.name) {
      user.socket?.emit('admin:affiliate:get', { type: 'id', value: params.name }, (data: affiliateDataObj) => {
        if (!data?.error && data.data) {
          console.log(data?.data)
          setGeneralInfo({
            user: {
              avatar: data.data.codeData?.avatar ?? '',
              name: data.data.codeData?.username ?? ''
            },
            statistic: {
              code: data.data.codeData?.code ?? '',
              claims: Array.isArray(data.data?.users) ? data.data.users?.length.toString() || '0' : '0',
              depositors: Array.isArray(data.data?.giftcardAndDeposit) && Array.isArray(data.data?.users) ? [...data.data.users].filter(user => Array.isArray(data.data?.giftcardAndDeposit) ? data.data?.giftcardAndDeposit.findIndex(searchUser => searchUser.id === user.id) : -1).length.toString() : '0',
              totalDeposited: data.data?.codeData?.wager.toString() ?? '0',
              earnings: data.data?.codeData?.earnings.toString() ?? '0',
              currentBalance: data.data?.codeData?.balance.toString() ?? '0'
            }
          })
        } else {
          console.log(data.msg)
        }
      })
    }
  }, [params])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          {generalInfo ? <AffiliateMainItemStatistics generalInfoObj={generalInfo} /> : ''}
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <GraphAffilateStatistic
          names={[{ name: 'Code Claims -', value: 98, color: '#FCA213' }, { name: 'Depositors -', value: 46, color: '#3790D4' }]}
          graphColors={['#3790D4', '#FCA213']}
          />
        </div>
        <div className='col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 p-8'>
          {/* <DepositAndWithdrawPipeChart /> */}
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <GraphAffilateStatistic
            graphColors={['#374CD4', '#E4164A']}
            names={[{ name: 'Wagers -', value: '3,942,234', color: '#E4164A', withIcon: true }, { name: 'Deposited -', value: '849,234', color: '#374CD4', withIcon: true }]} />
        </div>
        <div className='col-span-6 2xl:col-span-3  rounded-lg bg-dark-1 p-8'>
          <DepositBreakdown />
        </div>
        <div className='col-span-6 rounded-lg bg-dark-1 p-8'>
          <AffilateUserStatistics />
        </div>
      </div>
    </>
  )
}

export default Affiliateitem
