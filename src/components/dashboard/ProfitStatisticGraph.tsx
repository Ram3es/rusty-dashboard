import dayjs from 'dayjs'
import { useState, useContext, useEffect } from 'react'
import { getColorsArray, getGameIndex, getLabelsArray } from '../../helpers/gamesGetters'
import { Context } from '../../store/GlobalStatisticStore'
import Graph from '../base/Graph'

const ProfitStatisticGraph = ({ periodOptions, currentGame }: { periodOptions: any[], currentGame: string }) => {
  /** @ts-expect-error */
  const [state, period] = useContext(Context)
  // const [selectedProfitPeriod, setSelectedProfitPeriod] = useState(periodOptions[0])
  const [profitTitleData, setProfitTitleData] = useState([{ name: 'PROFIT', value: 0, color: '#39C89D' }])
  const [dataProfit, setDataProfit] = useState({
    name: 'PROFIT',
    labels: [],
    data: []
  })
  const [graphMode, setGraphMode] = useState<string>('line graph')

  useEffect(() => {
    console.log(state?.dataCurrentPeriod, period, '!!!!!!!!!!!')
    if (state?.dataCurrentPeriod) {
      const { gameHistory, userBots, jackpots, coinflips, pvpMines } = state.dataCurrentPeriod
      const monthData: any[] = []
      let historyData = [...gameHistory]
      const jackpotData = jackpots
        ? jackpots?.map((game: any) => {
          return {
            bet_value: game.pot_value,
            id: game.id,
            mode: 'jackpot',
            timestamp: game.timestamp,
            userid: game.winner,
            winnings: game.pot_value,
            fee_items_value: game.fee_items_value ?? 0
          }
        })
        : []
      const coinflipData = coinflips
        ? coinflips.map((game: any) => {
          return {
            bet_value: Number(game.creator_value),
            oponent_bet: Number(game.opponent_value),
            id: game.id,
            mode: 'coinflip',
            timestamp: game.timestamp,
            sellWinnings: game.sellWinnings,
            fee_items_value: game.fee_items_value ?? 0,
            isOponentBot: game.opponent_steamid === 'bot',
            isBotWon: game.opponent_steamid === 'bot' && game.creator_side !== Number(game.winner_side)
          }
        })
        : []
      const pvpMinesData = pvpMines.map((game: any) => {
        return {
          bet_value: game.value * (game.players - game.botqty),
          oponent_bet: game.value * game.botqty,
          id: game.id,
          mode: 'pvp-mines',
          timestamp: game.timestamp,
          fee_items_value: 0.1 * game.value * (game.players - game.botqty),
          isBotWon: game.winner === 0
        }
      })
      historyData = [...historyData, ...jackpotData, ...coinflipData, ...pvpMinesData]
      let totalSum = 0
      let sortedData = []
      if (currentGame !== 'all') {
        sortedData = historyData.filter((game: any) => game.mode === currentGame)
      } else {
        sortedData = [...historyData]
      }
      if (Array.isArray(userBots)) {
        sortedData = [...sortedData].filter((game: any) => userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
      }
      switch (period) {
        case 'Day':
          for (let i = 0; i <= 24; i++) {
            monthData.push({
              name: dayjs().add(-24, 'hour').add(i, 'hour').format('MM/DD/YYYY HH'),
              value: currentGame !== 'all' || (currentGame === 'all' && graphMode !== 'line graph') ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        case 'Week':
          for (let i = 0; i <= 7; i++) {
            monthData.push({
              name: dayjs().add(-7, 'day').add(i, 'day').format('MM/DD/YYYY'),
              value: currentGame !== 'all' || (currentGame === 'all' && graphMode !== 'line graph') ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        default:
          for (let i = 0; i <= 30; i++) {
            monthData.push({
              name: dayjs().add(-30, 'day').add(i, 'day').format('MM/DD/YYYY'),
              value: currentGame !== 'all' || (currentGame === 'all' && graphMode !== 'line graph') ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
      }

      [...sortedData].forEach((cur: any) => {
        const dateVal = period !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
        const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)

        if (foundIndex >= 0) {
          if (cur.mode === 'jackpot') {
            totalSum += Number(cur.fee_items_value ?? 0) / 1000
            monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)]) + (Number(cur.fee_items_value ?? 0) / 1000)
          } else if (cur.mode === 'pvp-mines') {
            let profit = 0
            if (cur.isBotWon) {
              profit = cur.bet_value
            } else {
              profit = (cur.fee_items_value ?? 0) - cur.oponent_bet
            }
            totalSum += profit / 1000
            monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)]) + (profit / 1000)
          } else if (cur.mode === 'coinflip') {
            let profit = 0
            if (cur.isBotWon) {
              profit = cur.bet_value
            } else if (!cur.isOponentBot) {
              profit = cur.fee_items_value ?? 0
            } else if (cur.sellWinnings) {
              profit = -cur.oponent_bet - cur.fee_items_value
            } else {
              profit = (cur.fee_items_value ?? 0) - cur.oponent_bet
            }
            totalSum += profit / 1000
            monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)]) + (profit / 1000)
          } else {
            totalSum += parseFloat(((Number(cur.bet_value) - Number(cur.winnings)) / 1000).toFixed(2))
            monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)]) + ((Number(cur.bet_value) - Number(cur.winnings)) / 1000)
          }
        }
      })
      setDataProfit((prev: any) => {
        return {
          ...prev,
          data: monthData,
          labels: currentGame === 'all' && graphMode !== 'line graph'
            ? [
            <span key="dataAll">All</span>
              ]
            : getLabelsArray(currentGame)
        }
      })
      setProfitTitleData(prev => [{ ...prev[0], value: totalSum }])
    }
  }, [state, currentGame, graphMode])
  return (
    <>
      <Graph data={dataProfit.data} names={profitTitleData} labels={dataProfit.labels} setGraphMode={setGraphMode} />
    </>
  )
}

export default ProfitStatisticGraph
