import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AffiliateMainItemStatistics from '../../components/affiliate/AffiliateMainItemStatistics'
import GraphCodeDepositors from '../../components/affiliate/GraphCodeDepositors'
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
          <GraphCodeDepositors />
          {/* <Graph timePeriodOptions={timePeriodOptions} currentTimePeriod={depositDataStatisticPeriod} changeTimePeriod={setDepositDataStatisticPeriod} data={dataDeposit.data} names={[{ name: 'Deposit', value: 1000, color: 'green' }]} labels={dataDeposit.labels} /> */}
        </div>
      </div>
    </>
  )
}

export default Affiliateitem
