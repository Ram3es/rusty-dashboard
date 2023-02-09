import dayjs from 'dayjs'
import { useState, useContext, useEffect } from 'react'
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
    labels: [
    <span key="dataWagers">Wagers</span>
    ],
    data: []
  })

  useEffect(() => {
    if (state?.data?.data) {
      const { gameHistory, userBots } = state.data.data
      const monthData: any[] = []
      let totalSum = 0
      let sortedData = []
      if (currentGame !== 'all') {
        sortedData = gameHistory.filter((game: any) => game.mode === currentGame && userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
      } else {
        sortedData = [...gameHistory].filter((game: any) => userBots?.findIndex((bot: any) => game.userid === bot.id) < 0)
      }
      const wagersSortedByDate = sortDataByDate(selectedWagersPeriod.name, sortedData)
      console.log('wagersSortedByDate', wagersSortedByDate.currentPeriod)
      switch (selectedWagersPeriod.name) {
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
        const dateVal = selectedWagersPeriod.name !== 'Today' && selectedWagersPeriod.name !== 'Yesterday' ? dayjs(cur.timestamp).format('DD/MM/YYYY') : dayjs(cur.timestamp).format('DD/MM/YYYY HH')
        const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
        if (foundIndex >= 0) {
          totalSum += Number(cur.bet_value) / 1000
          monthData[foundIndex].value[0] = Number(monthData[foundIndex].value[0]) + (Number(cur.bet_value) / 1000)
        }
      })
      setDataWagers((prev: any) => {
        return {
          ...prev,
          data: monthData
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
