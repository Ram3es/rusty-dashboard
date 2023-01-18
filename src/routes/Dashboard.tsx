import { useEffect, useState } from 'react'

import CardsStatistic from '../components/CardsStatistic'
import PipeChartWithTable from '../components/PipeChartWithTable'
import { DepositBase } from '../types/Deposit'
import GamesStatistic from '../components/dashboard/GamesStatistic'
import Graph from '../components/base/Graph'
import SkinsIcon from '../components/icons/SkinsIcon'
import GiftCardsIcon from '../components/icons/GiftCardsIcon'
import CryptoIcon from '../components/icons/CryptoIcon'
import FlashCodes from '../components/dashboard/FlashCodes'
import ExcludedAccounts from '../components/dashboard/ExcludedAccounts'
import LivePlayers from '../components/dashboard/LivePlayers'
import Trivia from '../components/dashboard/Trivia'
import Trades from '../components/dashboard/Trades'

const timePeriodOptions = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const Dashboard = ({ data }: { data: any }) => {
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
  }, [data])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <CardsStatistic
            title="GENERAL STATISTICS"
            statisticOptions={timePeriodOptions}
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
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <Graph timePeriodOptions={timePeriodOptions} currentTimePeriod={depositDataStatisticPeriod} changeTimePeriod={setDepositDataStatisticPeriod} data={dataDeposit.data} name={dataDeposit.name} labels={dataDeposit.labels} />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <Graph timePeriodOptions={timePeriodOptions} currentTimePeriod={depositDataStatisticPeriod} changeTimePeriod={setDepositDataStatisticPeriod} data={dataDeposit.data} name={'Deposit'} labels={dataDeposit.labels} />
        </div>
        <div className="col-span-6 2xl:col-span-3 grid grid-cols-3 gap-6">
          <div className='col-span-2 rounded-lg bg-dark-1 px-8 py-10'>
            <FlashCodes name="CREATE FLASH CODE" />
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
