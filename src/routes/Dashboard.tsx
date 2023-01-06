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
import Graph from '../components/base/Graph'
import SkinsIcon from '../components/icons/SkinsIcon'
import GiftCardsIcon from '../components/icons/GiftCardsIcon'
import CryptoIcon from '../components/icons/CryptoIcon'

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
  const [depositDataStatisticPeriod, setDepositDataStatisticPeriod] = useState(timePeriodOptions[0])
  // const [gamesStatistic, setGamesStatistic] = useState([])

  const dataDeposit = {
    name: 'deposit',
    labels: [
      <span className='flex items-center' key="val0">
        <div
          className='w-5 h-5 rounded-full flex justify-center items-center mr-2'
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #EB184C 55.21%, #AE0A3A 100%)' }}
        >
          <SkinsIcon iconCalsses='w-3' />
        </div>
        Skin
      </span>,
      <span className='flex items-center' key="val2">
         <div
          className='w-5 h-5 rounded-full flex justify-center items-center mr-2'
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FCA313 64.06%, #FA9215 100%)' }}
        >
          <CryptoIcon iconCalsses='w-3' />
        </div>
        Crypto
      </span>,
      <span className='flex items-center' key="val1">
         <div
          className='w-5 h-5 rounded-full flex justify-center items-center mr-2'
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #3790D4 64.06%, #2E72C9 100%)' }}
        >
          <GiftCardsIcon iconCalsses='w-3' />
        </div>
        Gift Cards
      </span>
    ],
    data: [
      {
        name: '14.11',
        value: [1100, 800, 100],
        colors: [
          {
            postitveColor: '#E4164A'
          },
          {
            postitveColor: '#FCA213'
          },
          {
            postitveColor: '#3790D4'
          }
        ]
      },
      {
        name: '15.11',
        value: [100, 500, 300],
        colors: [
          {
            postitveColor: '#E4164A'
          },
          {
            postitveColor: '#FCA213'
          },
          {
            postitveColor: '#3790D4'
          }
        ]
      },
      {
        name: '16.11',
        value: [10, 1000, 500],
        colors: [
          {
            postitveColor: '#E4164A'
          },
          {
            postitveColor: '#FCA213'
          },
          {
            postitveColor: '#3790D4'
          }
        ]
      },
      {
        name: '17.11',
        value: [0, 800, 0],
        colors: [
          {
            postitveColor: '#E4164A'
          },
          {
            postitveColor: '#FCA213'
          },
          {
            postitveColor: '#3790D4'
          }
        ]
      },
      {
        name: '18.11',
        value: [1000, 100, 100],
        colors: [
          {
            postitveColor: '#E4164A'
          },
          {
            postitveColor: '#FCA213'
          },
          {
            postitveColor: '#3790D4'
          }
        ]
      },
      {
        name: '19.11',
        value: [600, 800, 1100],
        colors: [
          {
            postitveColor: '#E4164A'
          },
          {
            postitveColor: '#FCA213'
          },
          {
            postitveColor: '#3790D4'
          }
        ]
      }
    ]
  }

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
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <CardsStatistic
            title="GENERAL STATISTICS"
            statisticOptions={timePeriodOptions}
            generalStatistic={generalStatistic}
          />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 px-8 py-10">
          <PipeChartWithTable
            periodOptions={timePeriodOptions}
            depositData={depositData}
          />
        </div>
        <div className="col-span-6 2xl:col-span-3 row-span-5 2xl:row-span-2 rounded-lg bg-dark-1">
          <GamesStatistic periodOptions={timePeriodOptions} currentGame={game} setCurrentGame={setGame} />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 px-8 py-10">
          <Graph timePeriodOptions={timePeriodOptions} currentTimePeriod={depositDataStatisticPeriod} changeTimePeriod={setDepositDataStatisticPeriod} data={dataDeposit.data} name={dataDeposit.name} labels={dataDeposit.labels} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
