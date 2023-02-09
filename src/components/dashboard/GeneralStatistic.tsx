import { useContext, useEffect, useState } from 'react'

import CardsStatistic from '../CardsStatistic'
import { Context } from '../../store/GlobalStatisticStore'
import { StatisticCartItem } from '../../types/StatisticCartItem'
import CoinFlipIcon from '../icons/CoinFlipIcon'
import JackpotIcon from '../icons/JackpotIcon'
import MinesIcon from '../icons/MinesIcon'
import PlinkoIcon from '../icons/PlinkoIcon'
import PvpMinesIcon from '../icons/PvpMinesIcon'
import UpgraderIcon from '../icons/UpgraderIcon'
import WheelIcon from '../icons/WheelIcon'
import SessionIcon from '../icons/SessionIcon'
import UsersIcon from '../icons/UsersIcon'
import DepositIcon from '../icons/DepositIcon'
import DiceIcon from '../icons/DiceIcon'
import StatisticIcon from '../icons/StatisticIcon'
import { TimeOption } from '../../types/TimeOption'
import sortDataByDate from '../../helpers/sotingByDate'

const timePeriodOptions: TimeOption[] = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const GeneralStatistic = () => {
  /** @ts-expect-error */
  const [state] = useContext(Context)
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(timePeriodOptions[0])

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

    return [...users].filter(u => deposits?.findIndex(i => i.user_id === u.id) >= 0)
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
          text: `${conversionedUsersCurrentPeriod.length !== 0 ? (conversionedUsersCurrentPeriod.length / sortedUsersByDate.currentPeriod.length * 100).toFixed(2) : 0}%`,
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
      <CardsStatistic
        title="GENERAL STATISTICS"
        periodOptions={timePeriodOptions}
        selectedPeriod={selectedGeneralStatisticPeriod}
        changePeriod={(option: TimeOption) => setSelectedGeneralStatisticPeriod(option)}
        items={generalStatistic}
      />
    </>
  )
}

export default GeneralStatistic
