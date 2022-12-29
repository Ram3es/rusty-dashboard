import CardsStatistic from '../components/CardsStatistic'
import PipeChartWithTable from '../components/PipeChartWithTable'
import SessionIcon from '../components/icons/SessionIcon'
import UsersIcon from '../components/icons/UsersIcon'
import DepositIcon from '../components/icons/DepositIcon'
import DiceIcon from '../components/icons/DiceIcon'
import StatisticIcon from '../components/icons/StatisticIcon'
import MinesIson from '../components/icons/MinesIson'
import { DepositBase } from '../types/Deposit'
import { StatisticCartItem } from '../types/StatisticCartItem'
import { useEffect, useState } from 'react'
import GamesStatistic from '../components/dashboard/GamesStatistic'

const timePeriodOptions = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const Dashboard = () => {
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [depositData, setDepositData] = useState<DepositBase[]>([])
  const [game, setGame] = useState<string>('jackpot')
  // const [gamesStatistic, setGamesStatistic] = useState([])

  useEffect(() => {
    setGeneralStatistic([
      {
        icon: <SessionIcon iconCalsses='w-3' />,
        text: '62,833',
        subtext: 'Sessions',
        percent: 10.3
      },
      {
        icon: <UsersIcon iconCalsses='w-4' />,
        text: '469',
        subtext: 'New Sign Ups',
        percent: -4.2
      },
      {
        icon: <DepositIcon iconCalsses='w-5' />,
        text: '$42.23',
        subtext: 'Avg. Deposit',
        percent: 34.9
      },
      {
        icon: <DiceIcon iconCalsses='w-4' />,
        text: '3,233',
        subtext: 'Avg. Bet Amount',
        percent: 43.2,
        isCoinceValue: true
      },
      {
        icon: <StatisticIcon iconCalsses='w-4' />,
        text: '12.98%',
        subtext: 'Conversion',
        percent: 6.7
      },
      {
        icon: <MinesIson iconCalsses='w-6' />,
        text: 'Mines',
        subtext: 'Top Game'
      }
    ])

    setDepositData([
      {
        name: 'skins',
        value: 549.55
      },
      {
        name: 'gift cards',
        value: 3199.99
      },
      {
        name: 'crypto',
        value: 5233.31
      }
    ])
  }, [])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-7 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <CardsStatistic
            title="GENERAL STATISTICS"
            statisticOptions={timePeriodOptions}
            generalStatistic={generalStatistic}
          />
        </div>
        <div className="col-span-3 rounded-lg bg-dark-1 px-8 py-10">
          <PipeChartWithTable
            periodOptions={timePeriodOptions}
            depositData={depositData}
          />
        </div>
        <div className="col-span-4 row-span-5 2xl:row-span-3 rounded-lg bg-dark-1">
          <GamesStatistic currentGame={game} setCurrentGame={setGame} />
        </div>
        <div className="col-span-3 2xl:col-span-2 row-span-2 rounded-lg bg-dark-1 px-8 py-10">
          CREATE FLASH CODE
        </div>
        <div className="col-span-3 2xl:col-span-1 row-span-2 rounded-lg bg-dark-1 px-8 py-10">
          EXCLUDED ACCOUNTS
        </div>
      </div>
    </>
  )
}

export default Dashboard
