import dayjs from 'dayjs'
import React, { FC, useMemo, useState } from 'react'
import { TimeOption } from '../../types/TimeOption'
import Graph from '../base/Graph'

interface IData {
  name: string
  value: number[]
  colors: Array<{ postitveColor: string }>
}

interface IGraphProps {
  names: Array<{ name: string, value: number | string, color: string, withIcon?: boolean }>
  graphColors: string[]

}
const timePeriodOptions: TimeOption[] = [
  { id: 1, name: 'Day', unavailable: false },
  { id: 2, name: 'This Week', unavailable: false },
  { id: 3, name: 'This Month', unavailable: false }
]

const GraphAffilateStatistic: FC<IGraphProps> = ({ names, graphColors }) => {
  const [codeDepositorsStatisticPeriod, setCodeDepositorsStatisticPeriod] = useState(timePeriodOptions[0])

  const generateDataChart = () => {
    const monthData: IData[] = []
    let daysStartIndex
    switch (codeDepositorsStatisticPeriod.name) {
      case 'This Month':
        daysStartIndex = -30
        break
      case 'This Week':
        daysStartIndex = -6
        break
      default:
        daysStartIndex = -23
        break
    }

    for (let i = daysStartIndex; i <= 0; i++) {
      const mockValue = Math.floor(Math.random() * 10)
      monthData.push(
        {
          name: codeDepositorsStatisticPeriod.name !== 'Today' ? dayjs().add(i, 'day').format('DD/MM/YYYY') : dayjs().add(i, 'hour').format('DD/MM/YYYY HH'),
          value: [mockValue + 1, mockValue + 7],
          colors: [{
            postitveColor: graphColors[0]
          },
          { postitveColor: graphColors[1] }
          ]
        }
      )
    }
    return monthData
  }

  const dataCodeDepositors = useMemo(() => generateDataChart(), [codeDepositorsStatisticPeriod])
  return (
       <Graph
        timePeriodOptions={timePeriodOptions}
        currentTimePeriod={codeDepositorsStatisticPeriod}
        changeTimePeriod={setCodeDepositorsStatisticPeriod}
        data={dataCodeDepositors}
        labels={[]}
        names={names}
        />
  )
}

export default GraphAffilateStatistic
