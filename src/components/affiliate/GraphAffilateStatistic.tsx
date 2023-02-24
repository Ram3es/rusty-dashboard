import dayjs from 'dayjs'
import { FC, useMemo, useState } from 'react'
import { TIME_OPTIONS } from '../../constants'
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

const GraphAffilateStatistic: FC<IGraphProps> = ({ names, graphColors }) => {
  const [codeDepositorsStatisticPeriod, setCodeDepositorsStatisticPeriod] = useState(TIME_OPTIONS[0])

  const generateDataChart = () => {
    const monthData: IData[] = []
    let daysStartIndex
    switch (codeDepositorsStatisticPeriod.name) {
      case 'Month':
        daysStartIndex = -30
        break
      case 'Week':
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
        timePeriodOptions={TIME_OPTIONS}
        currentTimePeriod={codeDepositorsStatisticPeriod}
        changeTimePeriod={setCodeDepositorsStatisticPeriod}
        data={dataCodeDepositors}
        labels={[]}
        names={names}
        />
  )
}

export default GraphAffilateStatistic
