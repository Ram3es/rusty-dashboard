import { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';

import { Context } from '../store/GlobalStatisticStore'
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
import CoinFlipIcon from '../components/icons/CoinFlipIcon'
import JackpotIcon from '../components/icons/JackpotIcon'
import MinesIcon from '../components/icons/MinesIcon'
import PlinkoIcon from '../components/icons/PlinkoIcon'
import PvpMinesIcon from '../components/icons/PvpMinesIcon'
import UpgraderIcon from '../components/icons/UpgraderIcon'
import WheelIcon from '../components/icons/WheelIcon'
import SessionIcon from '../components/icons/SessionIcon'
import UsersIcon from '../components/icons/UsersIcon'
import DepositIcon from '../components/icons/DepositIcon'
import DiceIcon from '../components/icons/DiceIcon'
import StatisticIcon from '../components/icons/StatisticIcon'
import { StatisticCartItem } from '../types/StatisticCartItem'
import { TimeOption } from '../types/TimeOption'
// import { GamesData } from '../types/GamesData'

const timePeriodOptions: TimeOption[] = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const Dashboard = ({ data }: { data: any }) => {
  const [depositData, setDepositData] = useState<DepositBase[]>([])
  const [game, setGame] = useState<string>('jackpot')
  const [depositDataStatisticPeriod, setDepositDataStatisticPeriod] = useState(timePeriodOptions[0])
  /** @ts-expect-error */
  const [state] = useContext(Context)
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(timePeriodOptions[0])
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
        value: [60, 1000, 500],
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
        value: [50, 800, 50],
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

  const getGameIcon = (mode: string | undefined) => {
    switch (mode) {
      case 'coinflip':
        return <CoinFlipIcon iconCalsses='w-6' />
      case 'jackpot':
        return <JackpotIcon iconCalsses='w-6' />
      case 'mines':
        return <MinesIcon iconCalsses='w-6' />
      case 'plinko':
        return <PlinkoIcon iconCalsses='w-6' />
      case 'pvp-mines':
        return <PvpMinesIcon iconCalsses='w-6' />
      case 'upgrader':
        return <UpgraderIcon iconCalsses='w-6' />
      case 'wheel':
        return <WheelIcon iconCalsses='w-6' />
      default:
        return undefined
    }
  }

  const sortDataByDate = (timePeriod: string, data: any[]): { currentPeriod: any[], previousPeriod: any[] } => {
    switch (timePeriod) {
      case 'Today':
        return {
          currentPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().startOf('day')) && compareDate.isBefore(dayjs().endOf('day'))
          }),
          previousPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(-1, 'day').startOf('day')) && compareDate.isBefore(dayjs().add(-1, 'day').endOf('day'))
          })
        }
      case 'Yesterday':
        return {
          currentPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(-1, 'day').startOf('day')) && compareDate.isBefore(dayjs().add(-1, 'day').endOf('day'))
          }),
          previousPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(-2, 'day').startOf('day')) && compareDate.isBefore(dayjs().add(-2, 'day').endOf('day'))
          })
        }
      case 'This week':
        return {
          currentPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().startOf('week')) && compareDate.isBefore(dayjs().endOf('week'))
          }),
          previousPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(-1, 'week').startOf('week')) && compareDate.isBefore(dayjs().add(-1, 'week').endOf('week'))
          })
        }
      case 'This month': {
        return {
          currentPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().startOf('month')) && compareDate.isBefore(dayjs().endOf('month'))
          }),
          previousPeriod: data.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(-1, 'month').startOf('month')) && compareDate.isBefore(dayjs().add(-1, 'month').endOf('month'))
          })
        }
      }
      default:
        return { currentPeriod: data, previousPeriod: [] }
    }
  }

  const getPercentages = (prev: number, cur: number) => {
    if (prev > 0 && cur > 0) {
      return prev > cur ? cur / prev : -(prev / cur)
    } else if (prev > 0 && cur <= 0) {
      return -100
    } else if (prev <= 0 && cur > 0) {
      return 100
    } else {
      return 0
    }
  }

  const getConversionedUsers = (users: any[], deposits: any[]) => {
    if (users.length === 0 || deposits.length === 0) return []

    return [...users].filter(u => deposits.findIndex(i => i.user_id === u.id) >= 0)
  }

  useEffect(() => {
    if (state?.data?.data) {
      console.log('dashboard data', state.data.data)
      const { user, gameHistory, trades } = state.data.data
      const deposit = trades.filter((t: any) => t.type === 'deposit')
      const depositSortedByDate = sortDataByDate(selectedGeneralStatisticPeriod.name, deposit)
      const sortedHistoryByDate = sortDataByDate(selectedGeneralStatisticPeriod.name, gameHistory)
      const sortedUsersByDate = sortDataByDate(selectedGeneralStatisticPeriod.name, user)
      const conversionedUsersCurrentPeriod = getConversionedUsers(sortedUsersByDate.currentPeriod, depositSortedByDate.currentPeriod)
      const conversionedUsersPrevPeriod = getConversionedUsers(sortedUsersByDate.previousPeriod, depositSortedByDate.previousPeriod)
      let avarage = 0
      let averagePrev = 0
      let gamesCount: Record<string, number>
      let topGame
      let depositCurrentPeriod = 0
      let depositPrevPeriod = 0

      if (sortedHistoryByDate.currentPeriod.length > 0) {
        avarage = sortedHistoryByDate.currentPeriod.reduce((prev, cur) => {
          const total = parseInt(cur.bet_value) + parseInt(prev)
          return total
        }, 0) / sortedHistoryByDate.currentPeriod.length
        gamesCount = sortedHistoryByDate.currentPeriod.reduce((prev, cur) => {
          const count = prev[cur.mode] !== undefined ? parseInt(prev[cur.mode]) + 1 : 1
          prev[cur.mode] = count
          return prev
        }, {})
        topGame = Object.keys(gamesCount).reduce((a, b) => gamesCount[a] > gamesCount[b] ? a : b)
      }
      if (sortedHistoryByDate.previousPeriod.length > 0) {
        averagePrev = sortedHistoryByDate.previousPeriod.reduce((prev, cur) => {
          const total = parseInt(cur.bet_value) + parseInt(prev)
          return total
        }, 0) / sortedHistoryByDate.previousPeriod.length
      }
      if (depositSortedByDate.currentPeriod.length > 0) {
        depositCurrentPeriod = depositSortedByDate.currentPeriod.reduce((prev, cur) => {
          const total = parseInt(cur.value) + parseInt(prev)
          return total
        }, 0)
      }
      if (depositSortedByDate.previousPeriod.length > 0) {
        depositPrevPeriod = depositSortedByDate.previousPeriod.reduce((prev, cur) => {
          const total = parseInt(cur.value) + parseInt(prev)
          return total
        }, 0)
      }

      const currentSessions = sortedHistoryByDate.currentPeriod.length
      const previousSessions = sortedHistoryByDate.previousPeriod.length

      setGeneralStatistic([
        {
          icon: <SessionIcon iconCalsses='w-3' />,
          text: currentSessions.toString(),
          subtext: 'Sessions',
          percent: getPercentages(previousSessions, currentSessions)
        },
        {
          icon: <UsersIcon iconCalsses='w-4' />,
          text: sortedUsersByDate.currentPeriod.length.toString(),
          subtext: 'New Sign Ups',
          percent: getPercentages(sortedUsersByDate.previousPeriod.length, sortedUsersByDate.currentPeriod.length)
        },
        {
          icon: <DepositIcon iconCalsses='w-5' />,
          text: `$${(depositCurrentPeriod / 1000).toFixed(2)}`,
          subtext: 'Avg. Deposit',
          percent: getPercentages(depositPrevPeriod, depositCurrentPeriod)
        },
        {
          icon: <DiceIcon iconCalsses='w-4' />,
          text: avarage.toFixed(0).toString(),
          subtext: 'Avg. Bet Amount',
          percent: getPercentages(averagePrev, avarage),
          isCoinceValue: true
        },
        {
          icon: <StatisticIcon iconCalsses='w-4' />,
          text: `${getPercentages(sortedUsersByDate.currentPeriod.length, conversionedUsersCurrentPeriod.length).toFixed(2)}%`,
          subtext: 'Conversion',
          percent: getPercentages(conversionedUsersPrevPeriod.length, conversionedUsersCurrentPeriod.length)
        },
        {
          icon: getGameIcon(topGame),
          text: topGame !== undefined ? topGame.replace(/([A-Z]+)/g, '-$1').replace(/([A-Z][a-z])/g, '-$1') : '',
          subtext: 'Top Game'
        }
      ])
    }
  }, [state, selectedGeneralStatisticPeriod])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <CardsStatistic
            title="GENERAL STATISTICS"
            periodOptions={timePeriodOptions}
            selectedPeriod={selectedGeneralStatisticPeriod}
            changePeriod={(option: TimeOption) => setSelectedGeneralStatisticPeriod(option)}
            items={generalStatistic}
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
          <Graph timePeriodOptions={timePeriodOptions} currentTimePeriod={depositDataStatisticPeriod} changeTimePeriod={setDepositDataStatisticPeriod} data={dataDeposit.data} names={[{ name: dataDeposit.name, value: 1000, color: 'green' }]} labels={dataDeposit.labels} />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <Graph timePeriodOptions={timePeriodOptions} currentTimePeriod={depositDataStatisticPeriod} changeTimePeriod={setDepositDataStatisticPeriod} data={dataDeposit.data} names={[{ name: 'Deposit', value: 1000, color: 'green' }]} labels={dataDeposit.labels} />
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
