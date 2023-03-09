import { createContext, ReactElement, useEffect, useMemo, useReducer, useState } from 'react'
import sortDataByDate from '../helpers/sotingByDate'
import Reducer from './GlobalStatisticReducer'
import { useUserContext } from './UserStore'

const initialState = {}

export const Context = createContext(initialState)

const Store = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const [period, setPeriod] = useState('Day')
  const [user] = useUserContext()

  const getNewData = () => {
    if (user.isSystemConnect) {
      user.socket?.emit('admin:connect', { qty: period === 'Day' ? 1 : period === 'Week' ? 7 : 30 }, (data: any) => {
        console.log(data, 'ADMIN CONNEC ')
        dispatch({ type: 'UPDATE', payload: data })
      })
    }
  }

  useEffect(() => {
    getNewData()
  }, [user.isSystemConnect, period])

  const value = useMemo(() => {
    if (state.data?.data) {
      console.log(state, 'state!!!!!!!!!!')
      const { crypto, depositsItems, giftcards, trades, gameHistory, jackpots, coinflips, pvpMines } = state.data.data
      const cryptoSortedByDate = sortDataByDate(period, crypto ?? [])
      const depositsSortedByDate = sortDataByDate(period, depositsItems ?? [])
      const giftcardsSortedByDate = sortDataByDate(period, giftcards ?? [])
      const tragesSortedByDate = sortDataByDate(period, trades ?? [])
      const sortedHistoryByDate = sortDataByDate(period, [...gameHistory].filter(game => game.mode !== 'coinflip' && game.mode !== 'jackpot' && game.mode !== 'pvp-mines') ?? [])
      const sortedUsersByDate = sortDataByDate(period, user ?? [])
      const sortedJackpotsByDate = sortDataByDate(period, jackpots ?? [])
      const sortedCoinflipsByDate = sortDataByDate(period, coinflips ?? [])
      const sortedPvpMinesByDate = sortDataByDate(period, pvpMines ?? [])
      return {
        dataCurrentPeriod: {
          excluded: state.excluded ?? [],
          liveTrades: state.liveTrades ?? [],
          online: state.online ?? [],
          coinflips: sortedCoinflipsByDate.currentPeriod ?? [],
          crypto: cryptoSortedByDate.currentPeriod ?? [],
          depositsItems: depositsSortedByDate.currentPeriod ?? [],
          gameHistory: sortedHistoryByDate.currentPeriod ?? [],
          giftcards: giftcardsSortedByDate.currentPeriod ?? [],
          jackpots: sortedJackpotsByDate.currentPeriod ?? [],
          pvpMines: sortedPvpMinesByDate.currentPeriod ?? [],
          trades: tragesSortedByDate.currentPeriod ?? [],
          user: sortedUsersByDate.currentPeriod ?? []
        },
        dataPrevPeriod: {
          coinflips: sortedCoinflipsByDate.previousPeriod ?? [],
          crypto: cryptoSortedByDate.previousPeriod ?? [],
          depositsItems: depositsSortedByDate.previousPeriod ?? [],
          gameHistory: sortedHistoryByDate.previousPeriod ?? [],
          giftcards: giftcardsSortedByDate.previousPeriod ?? [],
          jackpots: sortedJackpotsByDate.previousPeriod ?? [],
          pvpMines: sortedPvpMinesByDate.previousPeriod ?? [],
          trades: tragesSortedByDate.previousPeriod ?? [],
          user: sortedUsersByDate.previousPeriod ?? []
        }
      }
    } else {
      return {}
    }
  }, [state])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Context.Provider value={[value, period, setPeriod]}>
        {children}
    </Context.Provider>
  )
}

export default Store
