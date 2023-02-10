import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AffiliateMainItemStatistics from '../../components/affiliate/AffiliateMainItemStatistics'
import GraphAffilateStatistic from '../../components/affiliate/GraphAffilateStatistic'
import DepositAndWithdrawPipeChart from '../../components/dashboard/DepositAndWithdrawPipeChart'
// import Graph from '../../components/base/Graph'
import UserSearch from '../../components/users/UserSearch'

const Affiliateitem = () => {
  const params = useParams()

  const foundUser = (obj: Record<string, string>) => {
    console.log('foundUser', obj)
  }

  useEffect(() => {
    console.log(params.name)
  }, [params])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <AffiliateMainItemStatistics />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <GraphAffilateStatistic
          names={[{ name: 'Code Claims -', value: 98, color: '#FCA213' }, { name: 'Depositors -', value: 46, color: '#3790D4' }]}
          graphColors={['#3790D4', '#FCA213']}
          />
        </div>
        <div className='col-span-6 2xl:col-span-3 row-span-2 rounded-lg bg-dark-1 p-8'>
          <DepositAndWithdrawPipeChart />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <GraphAffilateStatistic
            graphColors={['#374CD4', '#E4164A']}
            names={[{ name: 'Wagers -', value: '3,942,234', color: '#E4164A', withIcon: true }, { name: 'Deposited -', value: '849,234', color: '#374CD4', withIcon: true }]} />
        </div>
      </div>
    </>
  )
}

export default Affiliateitem
