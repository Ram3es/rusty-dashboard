import dayjs from 'dayjs'
import { useState, useContext, useEffect } from 'react'
import { getColorsArray, getGameIndex, getLabelsArray } from '../../helpers/gamesGetters'
import sortDataByDate from '../../helpers/sotingByDate'
import { Context } from '../../store/GlobalStatisticStore'
import Graph from '../base/Graph'

const WagersStatisticGraph = ({ periodOptions, currentGame }: { periodOptions: any[], currentGame: string }) => {
  /** @ts-expect-error */
  const [state] = useContext(Context)
  const [selectedWagersPeriod, setSelectedWagersPeriod] = useState(periodOptions[0])
  const [wagersTitleData, setWagersTitleData] = useState([{ name: 'Wagers', value: 0, color: '#39C89D' }])
  const [dataWagers, setDataWagers] = useState({
    name: 'Wagers',
    labels: [],
    data: []
  })

  useEffect(() => {
    if (state?.data?.data) {
      const { gameHistory, jackpots, coinflips, pvpMines, userBots } = state.data.data
      const monthData: any[] = []
      let totalSum = 0
      let sortedData = []
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
            fee_items_value: game.fee_items_value
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
      if (currentGame !== 'all') {
        sortedData = historyData.filter((game: any) => game.mode === currentGame)
      } else {
        sortedData = [...historyData]
      }
      if (Array.isArray(userBots)) {
        sortedData = [...sortedData].filter((game: any) => userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
      } else {
        console.log('STATISTIC GRAPH userBots!!!!!!', userBots)
      }
      const wagersSortedByDate = sortDataByDate(selectedWagersPeriod.name, sortedData ?? [])
      console.log('wagersSortedByDate', wagersSortedByDate.currentPeriod)
      switch (selectedWagersPeriod.name) {
        case 'Day':
          for (let i = 0; i <= 24; i++) {
            monthData.push({
              name: dayjs().add(-24, 'hour').add(i, 'hour').format('MM/DD/YYYY HH'),
              value: currentGame !== 'all' ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        case 'Week':
          for (let i = 0; i <= 7; i++) {
            monthData.push({
              name: dayjs().add(-7, 'day').add(i, 'day').format('MM/DD/YYYY'),
              value: currentGame !== 'all' ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        default:
          for (let i = 0; i <= 30; i++) {
            monthData.push({
              name: dayjs().add(-30, 'day').add(i, 'day').format('MM/DD/YYYY'),
              value: currentGame !== 'all' ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
      }
      [...wagersSortedByDate.currentPeriod].forEach((cur: any) => {
        const dateVal = selectedWagersPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
        const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
        if (foundIndex >= 0) {
          totalSum += Number(cur.bet_value) / 1000
          monthData[foundIndex].value[getGameIndex(currentGame, cur.mode)] = Number(monthData[foundIndex].value[getGameIndex(currentGame, cur.mode)]) + (Number(cur.bet_value) / 1000)
        }
      })
      setDataWagers((prev: any) => {
        return {
          ...prev,
          data: monthData,
          labels: getLabelsArray(currentGame)
        }
      })
      setWagersTitleData(prev => [{ ...prev[0], value: totalSum }])
    }
  }, [state, selectedWagersPeriod, currentGame])
  return (
    <>
      <Graph timePeriodOptions={periodOptions} currentTimePeriod={selectedWagersPeriod} changeTimePeriod={setSelectedWagersPeriod} data={dataWagers.data} names={wagersTitleData} labels={dataWagers.labels} />
    </>
  )
}

export default WagersStatisticGraph
