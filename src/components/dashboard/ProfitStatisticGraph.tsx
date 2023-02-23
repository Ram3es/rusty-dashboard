import dayjs from 'dayjs'
import { useState, useContext, useEffect } from 'react'
import { getColorsArray, getGameIndex, getLabelsArray } from '../../helpers/gamesGetters'
import sortDataByDate from '../../helpers/sotingByDate'
import { Context } from '../../store/GlobalStatisticStore'
import Graph from '../base/Graph'

const ProfitStatisticGraph = ({ periodOptions, currentGame }: { periodOptions: any[], currentGame: string }) => {
  /** @ts-expect-error */
  const [state] = useContext(Context)
  const [selectedProfitPeriod, setSelectedProfitPeriod] = useState(periodOptions[0])
  const [profitTitleData, setProfitTitleData] = useState([{ name: 'PROFIT', value: 0, color: '#39C89D' }])
  const [dataProfit, setDataProfit] = useState({
    name: 'PROFIT',
    labels: [],
    data: []
  })
  const [graphMode, setGraphMode] = useState<string>('line graph')

  useEffect(() => {
    if (state?.data?.data) {
      console.log('state?.data?.data', state?.data?.data)
      const { gameHistory, userBots, jackpots, coinflips, pvpMines } = state.data.data
      const monthData: any[] = []
      let historyData = gameHistory.filter((game: any) => game.mode !== 'jackpot' && game.mode !== 'coinflip' && game.mode !== 'pvp-mines')
      const jackpotData = jackpots.map((game: any) => {
        return {
          bet_value: game.pot_value,
          id: game.id,
          mode: 'jackpot',
          timestamp: game.timestamp,
          userid: game.winner,
          winnings: game.pot_value,
          house_edge: game.house_edge
        }
      })
      const coinflipData = coinflips.map((game: any) => {
        return {
          bet_value: Number(game.creator_value),
          oponent_bet: Number(game.opponent_value),
          id: game.id,
          mode: 'coinflip',
          timestamp: game.timestamp,
          house_edge: game.house_edge ?? 0,
          isOponentBot: game.opponent_steamid === 'bot',
          isBotWon: game.opponent_steamid === 'bot' && game.creator_side !== Number(game.winner_side)
        }
      })
      const pvpMinesData = pvpMines.map((game: any) => {
        return {
          bet_value: game.value * (game.players - game.botqty),
          oponent_bet: game.value * game.botqty,
          id: game.id,
          mode: 'pvp-mines',
          timestamp: game.timestamp,
          house_edge: 0.1 * game.value * (game.players - game.botqty),
          isBotWon: game.winner === 0
        }
      })
      historyData = [...historyData, ...jackpotData, ...coinflipData, ...pvpMinesData]
      let totalSum = 0
      let sortedData = []
      if (currentGame !== 'all') {
        sortedData = historyData.filter((game: any) => game.mode === currentGame && userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
      } else {
        sortedData = [...historyData].filter((game: any) => userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
      }
      const wagersSortedByDate = sortDataByDate(selectedProfitPeriod.name, sortedData)
      switch (selectedProfitPeriod.name) {
        case 'Day':
          for (let i = 0; i <= 24; i++) {
            monthData.push({
              name: dayjs().add(-24, 'hour').add(i, 'hour').format('DD/MM/YYYY HH'),
              value: currentGame !== 'all' || (currentGame === 'all' && graphMode !== 'line graph') ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        case 'This week':
          for (let i = 0; i <= 7; i++) {
            monthData.push({
              name: dayjs().add(-7, 'day').add(i, 'day').format('DD/MM/YYYY'),
              value: currentGame !== 'all' || (currentGame === 'all' && graphMode !== 'line graph') ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        default:
          for (let i = 0; i <= 30; i++) {
            monthData.push({
              name: dayjs().add(-30, 'day').add(i, 'day').format('DD/MM/YYYY'),
              value: currentGame !== 'all' || (currentGame === 'all' && graphMode !== 'line graph') ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
      }
      [...wagersSortedByDate.currentPeriod].forEach((cur: any) => {
        const dateVal = selectedProfitPeriod.name !== 'Today' && selectedProfitPeriod.name !== 'Yesterday' ? dayjs(cur.timestamp).format('DD/MM/YYYY') : dayjs(cur.timestamp).format('DD/MM/YYYY HH')
        const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)

        if (cur.mode === 'jackpot') {
          if (foundIndex >= 0) {
            totalSum += Number(cur.house_edge) / 1000
            monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)]) + (Number(cur.house_edge) / 1000)
          }
        } else if (cur.mode === 'pvp-mines') {
          if (foundIndex >= 0) {
            let profit = 0
            if (cur.isBotWon) {
              profit = cur.bet_value
            } else {
              profit = cur.house_edge - cur.oponent_bet
            }
            totalSum += profit / 1000
            monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)]) + (profit / 1000)
          }
        } else if (cur.mode === 'coinflip') {
          if (foundIndex >= 0) {
            let profit = 0
            if (cur.isBotWon) {
              profit = cur.oponent_bet
            } else if (!cur.isOponentBot) {
              profit = cur.house_edge
            } else {
              profit = cur.house_edge - cur.oponent_bet
            }
            totalSum += profit / 1000
            monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[currentGame === 'all' && graphMode !== 'line graph' ? 0 : getGameIndex(currentGame, cur.mode)]) + (profit / 1000)
          }
        } else {
          if (foundIndex >= 0) {
            totalSum += (Number(cur.bet_value) - Number(cur.winnings)) / 1000
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
  }, [state, selectedProfitPeriod, currentGame, graphMode])
  return (
    <>
      <Graph timePeriodOptions={periodOptions} currentTimePeriod={selectedProfitPeriod} changeTimePeriod={setSelectedProfitPeriod} data={dataProfit.data} names={profitTitleData} labels={dataProfit.labels} setGraphMode={setGraphMode} />
    </>
  )
}

export default ProfitStatisticGraph
