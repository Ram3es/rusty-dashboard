import { Listbox } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'
import * as dayjs from 'dayjs'

import { Context } from '../store/globalStatisticStore'
import { StatisticCartItem } from '../types/StatisticCartItem'
import StatisticCart from './base/StatisticCart'
import ArrowIcon from './icons/ArrowIcon'
import CoinFlipIcon from './icons/CoinFlipIcon'
import JackpotIcon from './icons/JackpotIcon'
import MinesIson from './icons/MinesIson'
import PlinkoIcon from './icons/PlinkoIcon'
import PvpMinesIcon from './icons/PvpMinesIcon'
import UpgraderIcon from './icons/UpgraderIcon'
import WheelIcon from './icons/WheelIcon'
import SessionIcon from './icons/SessionIcon'
import UsersIcon from './icons/UsersIcon'
import DepositIcon from './icons/DepositIcon'
import DiceIcon from './icons/DiceIcon'
import StatisticIcon from './icons/StatisticIcon'

const CardsStatistic = ({ title, statisticOptions }: { title: string, statisticOptions: any[] }) => {
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(statisticOptions[0])
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [state, dispatch] = useContext(Context)

  const getGameIcon = (mode: string | undefined) => {
    switch (mode) {
      case 'coinflip':
        return <CoinFlipIcon iconCalsses='w-6' />
      case 'jackpot':
        return <JackpotIcon iconCalsses='w-6' />
      case 'mines':
        return <MinesIson iconCalsses='w-6' />
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
      <div className="flex justify-between w-full mb-6">
        <h3 className="uppercase text-2xl text-white">{title}</h3>
        <div className="relative">
          <Listbox value={selectedGeneralStatisticPeriod} onChange={setSelectedGeneralStatisticPeriod}>
            {({ open }) => (
              <>
                <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                  <span>{selectedGeneralStatisticPeriod.name}</span>
                  <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                </Listbox.Button>
                <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded">
                  {statisticOptions.map((option) => (
                    <Listbox.Option
                      className="cursor-pointer text-gray-6 hover:text-white"
                      key={option.id}
                      value={option}
                      disabled={option.unavailable}
                    >
                      {option.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </>
            )}
          </Listbox>
        </div>
      </div>
      <div className='flex gap-10 flex-wrap justify-between'>
          {generalStatistic.map((item, index) => <StatisticCart key={index} item={item} />)}
      </div>
    </>
  )
}

export default CardsStatistic
