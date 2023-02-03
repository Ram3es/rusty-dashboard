import { useState } from 'react'
import GamesStatistic from '../components/dashboard/GamesStatistic'
import FlashCodes from '../components/dashboard/FlashCodes'
import ExcludedAccounts from '../components/dashboard/ExcludedAccounts'
import LivePlayers from '../components/dashboard/LivePlayers'
import Trivia from '../components/dashboard/Trivia'
import Trades from '../components/dashboard/Trades'
import { TimeOption } from '../types/TimeOption'
import DepositAndWithdrawPipeChart from '../components/dashboard/DepositAndWithdrawPipeChart'
import GeneralStatistic from '../components/dashboard/GeneralStatistic'
import DepositGraph from '../components/dashboard/DepositGraph'
import WithdrawGraph from '../components/dashboard/WithdrawGraph'
// import { GamesData } from '../types/GamesData'

const timePeriodOptions: TimeOption[] = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const Dashboard = ({ data }: { data: any }) => {
  const [game, setGame] = useState<string>('jackpot')

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <GeneralStatistic />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 px-8 py-10">
          <DepositAndWithdrawPipeChart />
        </div>
        <div className="col-span-6 2xl:col-span-3 row-span-5 2xl:row-span-2 rounded-lg bg-dark-1">
          <GamesStatistic periodOptions={timePeriodOptions} currentGame={game} setCurrentGame={setGame} />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <DepositGraph />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <WithdrawGraph />
        </div>
        <div className="col-span-6 2xl:col-span-3 grid grid-cols-3 gap-6">
          <div className='col-span-2 rounded-lg bg-dark-1 px-8 py-10'>
            <FlashCodes />
          </div>
          <div className='col-span-1 rounded-lg bg-dark-1 px-8 py-10'>
            <ExcludedAccounts name="EXCLUDED ACCOUNTS" />
          </div>
        </div>
        <div className="col-span-6 2xl:col-span-3">
          <LivePlayers />
        </div>
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
