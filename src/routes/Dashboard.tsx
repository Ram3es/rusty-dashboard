import GamesStatistic from '../components/dashboard/GamesStatistic'
import FlashCodes from '../components/dashboard/FlashCodes'
import ExcludedAccounts from '../components/dashboard/ExcludedAccounts'
import Trivia from '../components/dashboard/Trivia'
import Trades from '../components/dashboard/Trades'
import DepositAndWithdrawPipeChart from '../components/dashboard/DepositAndWithdrawPipeChart'
import GeneralStatistic from '../components/dashboard/GeneralStatistic'
import DepositGraph from '../components/dashboard/DepositGraph'
import WithdrawGraph from '../components/dashboard/WithdrawGraph'
import Store from '../store/GlobalStatisticStore'
import { TIME_OPTIONS } from '../constants'

const Dashboard = () => {
  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <Store>
          <>
            <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
              <GeneralStatistic />
            </div>
            <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 px-8 py-10">
              <DepositAndWithdrawPipeChart />
            </div>
            <div className="col-span-6 2xl:col-span-3 row-span-5 2xl:row-span-2 rounded-lg bg-dark-1">
              <GamesStatistic periodOptions={TIME_OPTIONS} />
            </div>
            <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
              <DepositGraph />
            </div>
            <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
              <WithdrawGraph />
            </div>
          </>
        </Store>
          <div className='col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 px-8 py-10'>
            <FlashCodes />
          </div>
          <div className='col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 px-8 py-10'>
            <ExcludedAccounts name="EXCLUDED ACCOUNTS" />
          </div>
        {/* <div className="col-span-6 2xl:col-span-3">
          <LivePlayers />
        </div> */}
        <div className="col-span-6 2xl:col-span-3">
          <Trivia name='Trivia GAMES' />
        </div>
        <div className="col-span-6">
          <Trades name="Trades" />
        </div>
      </div>
    </>
  )
}

export default Dashboard
