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
      const { gameHistory, userBots } = state.data.data
      const monthData: any[] = []
      let totalSum = 0
      let sortedData = []
      if (Array.isArray(userBots)) {
        if (currentGame !== 'all') {
          sortedData = gameHistory.filter((game: any) => game.mode === currentGame && userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
        } else {
          sortedData = [...gameHistory].filter((game: any) => userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
        }
      } else {
        console.log('STATISTIC GRAPH userBots!!!!!!', userBots)
      }
      const wagersSortedByDate = sortDataByDate(selectedWagersPeriod.name, sortedData)
      console.log('wagersSortedByDate', wagersSortedByDate.currentPeriod)
      switch (selectedWagersPeriod.name) {
        case 'Day':
          for (let i = 0; i <= 24; i++) {
            monthData.push({
              name: dayjs().add(-24, 'hour').add(i, 'hour').format('DD/MM/YYYY HH'),
              value: currentGame !== 'all' ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        case 'Week':
          for (let i = 0; i <= 7; i++) {
            monthData.push({
              name: dayjs().add(-7, 'day').add(i, 'day').format('DD/MM/YYYY'),
              value: currentGame !== 'all' ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
        default:
          for (let i = 0; i <= 30; i++) {
            monthData.push({
              name: dayjs().add(-30, 'day').add(i, 'day').format('DD/MM/YYYY'),
              value: currentGame !== 'all' ? [0] : [0, 0, 0, 0, 0, 0, 0],
              colors: getColorsArray(currentGame)
            })
          }
          break
      }
      [...wagersSortedByDate.currentPeriod].forEach((cur: any) => {
        const dateVal = selectedWagersPeriod.name !== 'Today' && selectedWagersPeriod.name !== 'Yesterday' ? dayjs(cur.timestamp).format('DD/MM/YYYY') : dayjs(cur.timestamp).format('DD/MM/YYYY HH')
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
