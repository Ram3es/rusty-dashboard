import dayjs from 'dayjs'
import { useState, useContext, useEffect } from 'react'
import sortDataByDate from '../../helpers/sotingByDate'
import { Context } from '../../store/GlobalStatisticStore'
import Graph from '../base/Graph'
// import JackpotIcon from '../icons/JackpotIcon'

const ProfitStatisticGraph = ({ periodOptions, currentGame }: { periodOptions: any[], currentGame: string }) => {
  /** @ts-expect-error */
  const [state] = useContext(Context)
  const [selectedProfitPeriod, setSelectedProfitPeriod] = useState(periodOptions[0])
  const [profitTitleData, setProfitTitleData] = useState([{ name: 'PROFIT', value: 0, color: '#39C89D' }])
  const [dataProfit, setDataProfit] = useState({
    name: 'PROFIT',
    labels: [
      <span key="dataProfit">Profit</span>
    ],
    data: []
  })

  // const getLabels = () => {
  //   switch (currentGame) {
  //     case 'jackpot':
  //       return [
  //         <span className='flex items-center' key="val0">
  //           <JackpotIcon iconCalsses="h-3" />
  //           Jackpot
  //         </span>
  //       ]
  //   }
  // }

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
        case 'Today':
          for (let i = 0; i < 24; i++) {
            monthData.push({
              name: dayjs().startOf('day').add(i, 'hour').format('DD/MM/YYYY HH'),
              value: [0],
              colors: [
                {
                  postitveColor: '#2E72C9',
                  negativeColor: '#AF0A3B'
                }
              ]
            })
          }
          break
        case 'Yesterday':
          for (let i = 0; i < 24; i++) {
            monthData.push({
              name: dayjs().add(-24, 'hour').startOf('day').add(i, 'hour').format('DD/MM/YYYY HH'),
              value: [0],
              colors: [
                {
                  postitveColor: '#2E72C9',
                  negativeColor: '#AF0A3B'
                }
              ]
            })
          }
          break
        case 'This week':
          for (let i = 0; i < 7; i++) {
            monthData.push({
              name: dayjs().startOf('week').add(i, 'day').format('DD/MM/YYYY'),
              value: [0],
              colors: [
                {
                  postitveColor: '#2E72C9',
                  negativeColor: '#AF0A3B'
                }
              ]
            })
          }
          break
        default:
          for (let i = 0; i < dayjs().daysInMonth(); i++) {
            monthData.push({
              name: dayjs().startOf('month').add(i, 'day').format('DD/MM/YYYY'),
              value: [0],
              colors: [
                {
                  postitveColor: '#2E72C9',
                  negativeColor: '#AF0A3B'
                }
              ]
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
            monthData[foundIndex].value[0] = Number(monthData[foundIndex].value[0]) + (Number(cur.house_edge) / 1000)
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
            monthData[foundIndex].value[0] = Number(monthData[foundIndex].value[0]) + (profit / 1000)
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
            monthData[foundIndex].value[0] = Number(monthData[foundIndex].value[0]) + (profit / 1000)
          }
        } else {
          if (foundIndex >= 0) {
            totalSum += (Number(cur.bet_value) - Number(cur.winnings)) / 1000
            monthData[foundIndex].value[0] = Number(monthData[foundIndex].value[0]) + ((Number(cur.bet_value) - Number(cur.winnings)) / 1000)
          }
        }
      })
      setDataProfit((prev: any) => {
        return {
          ...prev,
          data: monthData
          // labels: getLabels()
        }
      })
      setProfitTitleData(prev => [{ ...prev[0], value: totalSum }])
    }
  }, [state, selectedProfitPeriod, currentGame])
  return (
    <>
      <Graph timePeriodOptions={periodOptions} currentTimePeriod={selectedProfitPeriod} changeTimePeriod={setSelectedProfitPeriod} data={dataProfit.data} names={profitTitleData} labels={dataProfit.labels} />
    </>
  )
}

export default ProfitStatisticGraph
