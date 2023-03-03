import { useContext, useEffect, useState } from 'react'

import CardsStatistic from '../CardsStatistic'
import { Context } from '../../store/GlobalStatisticStore'
import { StatisticCartItem } from '../../types/StatisticCartItem'
import SessionIcon from '../icons/SessionIcon'
import UsersIcon from '../icons/UsersIcon'
import DepositIcon from '../icons/DepositIcon'
import DiceIcon from '../icons/DiceIcon'
import StatisticIcon from '../icons/StatisticIcon'
import { TimeOption } from '../../types/TimeOption'
import sortDataByDate from '../../helpers/sotingByDate'
import { getGameIcon } from '../../helpers/gamesGetters'
import { TIME_OPTIONS } from '../../constants'

const GeneralStatistic = () => {
  /** @ts-expect-error */
  const [state] = useContext(Context)
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(TIME_OPTIONS[0])

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
      let avarageBet = 0
      let avarageBetPrev = 0
      let gamesCount: Record<string, number>
      let topGame
      let avarageDepositCurrentPeriod = 0
      let avarageDepositPrevPeriod = 0

      if (sortedHistoryByDate.currentPeriod.length > 0) {
        avarageBet = sortedHistoryByDate.currentPeriod.reduce((prev, cur) => {
          const total = Number(cur.bet_value) + Number(prev)
          return total
        }, 0) / sortedHistoryByDate.currentPeriod.length
        gamesCount = sortedHistoryByDate.currentPeriod.reduce((prev, cur) => {
          const count = prev[cur.mode] !== undefined ? Number(prev[cur.mode]) + 1 : 1
          prev[cur.mode] = count
          return prev
        }, {})
        topGame = Object.keys(gamesCount).reduce((a, b) => gamesCount[a] > gamesCount[b] ? a : b)
      }
      if (sortedHistoryByDate.previousPeriod.length > 0) {
        avarageBetPrev = sortedHistoryByDate.previousPeriod.reduce((prev, cur) => {
          const total = Number(cur.bet_value) + Number(prev)
          return total
        }, 0) / sortedHistoryByDate.previousPeriod.length
      }
      if (depositSortedByDate.currentPeriod.length > 0) {
        avarageDepositCurrentPeriod = depositSortedByDate.currentPeriod.reduce((prev, cur) => {
          const total = Number(cur.value) + Number(prev)
          return total
        }, 0) / depositSortedByDate.currentPeriod.length
      }
      if (depositSortedByDate.previousPeriod.length > 0) {
        avarageDepositPrevPeriod = depositSortedByDate.previousPeriod.reduce((prev, cur) => {
          const total = Number(cur.value) + Number(prev)
          return total
        }, 0) / depositSortedByDate.previousPeriod.length
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
          text: `$${(avarageDepositCurrentPeriod / 1000).toFixed(2)}`,
          subtext: 'Avg. Deposit',
          percent: getPercentages(avarageDepositCurrentPeriod, avarageDepositPrevPeriod)
        },
        {
          icon: <DiceIcon iconCalsses='w-4' />,
          text: avarageBet.toFixed(0).toString(),
          subtext: 'Avg. Bet Amount',
          percent: getPercentages(avarageBetPrev, avarageBet),
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
        periodOptions={TIME_OPTIONS}
        selectedPeriod={selectedGeneralStatisticPeriod}
        changePeriod={(option: TimeOption) => setSelectedGeneralStatisticPeriod(option)}
        items={generalStatistic}
      />
    </>
  )
}

export default GeneralStatistic
