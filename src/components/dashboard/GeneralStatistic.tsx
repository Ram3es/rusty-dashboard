import { useContext, useEffect, useState } from 'react'

import CardsStatistic from '../CardsStatistic'
import { Context } from '../../store/GlobalStatisticStore'
import { StatisticCartItem } from '../../types/StatisticCartItem'
import UsersIcon from '../icons/UsersIcon'
import DepositIcon from '../icons/DepositIcon'
import DiceIcon from '../icons/DiceIcon'
import StatisticIcon from '../icons/StatisticIcon'
import { TimeOption } from '../../types/TimeOption'
import { TIME_OPTIONS } from '../../constants'

const GeneralStatistic = () => {
  /** @ts-expect-error */
  const [state, , setPeriod] = useContext(Context)
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(TIME_OPTIONS[0])

  const updateStatisticPeriod = (period: TimeOption) => {
    setPeriod(period.name)
    setSelectedGeneralStatisticPeriod(period)
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

  const getJackpotObj = (game: any) => {
    return {
      bet_value: game.pot_value,
      id: game.id,
      mode: 'jackpot',
      timestamp: game.timestamp,
      userid: game.winner,
      winnings: game.pot_value,
      fee_items_value: game.fee_items_value
    }
  }

  const getCoinflipObj = (game: any) => {
    return {
      bet_value: Number(game.creator_value),
      oponent_bet: Number(game.opponent_value),
      id: game.id,
      mode: 'coinflip',
      timestamp: game.timestamp,
      fee_items_value: game.fee_items_value ?? 0,
      isOponentBot: game.opponent_steamid === 'bot',
      isBotWon: game.opponent_steamid === 'bot' && game.creator_side !== Number(game.winner_side)
    }
  }

  const getPvpMinesOnj = (game: any) => {
    return {
      bet_value: game.value * (game.players - game.botqty),
      oponent_bet: game.value * game.botqty,
      id: game.id,
      mode: 'pvp-mines',
      timestamp: game.timestamp,
      fee_items_value: 0.1 * game.value * (game.players - game.botqty),
      isBotWon: game.winner === 0
    }
  }

  useEffect(() => {
    if (state?.dataCurrentPeriod) {
      const { user, gameHistory, trades, jackpots, coinflips, pvpMines } = state.dataCurrentPeriod
      const deposit = trades.filter((t: any) => t.type === 'deposit')
      const depositPrev = state.dataPrevPeriod.trades.filter((t: any) => t.type === 'deposit')
      let historyData = [...gameHistory]
      const jackpotData = jackpots
        ? jackpots?.map((game: any) => getJackpotObj(game))
        : []
      const coinflipData = coinflips
        ? coinflips.map((game: any) => getCoinflipObj(game))
        : []
      const pvpMinesData = pvpMines.map((game: any) => getPvpMinesOnj(game))
      historyData = [...historyData, ...jackpotData, ...coinflipData, ...pvpMinesData]
      let historyDataPrev = [...state.dataPrevPeriod.gameHistory]
      const jackpotDataPrev = state.dataPrevPeriod.jackpots
        ? jackpots?.map((game: any) => getJackpotObj(game))
        : []
      const coinflipDataPrev = state.dataPrevPeriod.coinflips
        ? coinflips.map((game: any) => getCoinflipObj(game))
        : []
      const pvpMinesDataPrev = state.dataPrevPeriod.pvpMines.map((game: any) => getPvpMinesOnj(game))
      historyDataPrev = [...historyDataPrev, ...jackpotDataPrev, ...coinflipDataPrev, ...pvpMinesDataPrev]
      const conversionedUsersCurrentPeriod = getConversionedUsers(user, deposit)
      const conversionedUsersPrevPeriod = getConversionedUsers(state.dataPrevPeriod.user, state.dataPrevPeriod.deposit)
      let avarageBet = 0
      let avarageBetPrev = 0
      let avarageDepositCurrentPeriod = 0
      let avarageDepositPrevPeriod = 0

      if (historyData.length > 0) {
        avarageBet = historyData.reduce((prev, cur) => {
          const total = Number(cur.bet_value) + Number(prev)
          return total
        }, 0) / historyData.length
      }
      if (historyDataPrev.length > 0) {
        avarageBetPrev = historyDataPrev.reduce((prev, cur) => {
          const total = Number(cur.bet_value) + Number(prev)
          return total
        }, 0) / historyDataPrev.length
      }
      if (deposit.length > 0) {
        avarageDepositCurrentPeriod = deposit.reduce((prev: any, cur: { value: any }) => {
          const total = Number(cur.value) + Number(prev)
          return total
        }, 0) / deposit.length
      }
      if (depositPrev.length > 0) {
        avarageDepositPrevPeriod = depositPrev.reduce((prev: any, cur: { value: any }) => {
          const total = Number(cur.value) + Number(prev)
          return total
        }, 0) / depositPrev.length
      }

      setGeneralStatistic([
        {
          icon: <UsersIcon iconCalsses='w-4' />,
          text: user.length.toString(),
          subtext: 'New Sign Ups',
          percent: getPercentages(state.dataPrevPeriod.user.length, user.length)
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
          text: `${conversionedUsersCurrentPeriod.length !== 0 ? (conversionedUsersCurrentPeriod.length / user.length * 100).toFixed(2) : 0}%`,
          subtext: 'Conversion',
          percent: getPercentages(conversionedUsersPrevPeriod.length, conversionedUsersCurrentPeriod.length)
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
        changePeriod={(option: TimeOption) => updateStatisticPeriod(option)}
        items={generalStatistic}
      />
    </>
  )
}

export default GeneralStatistic
