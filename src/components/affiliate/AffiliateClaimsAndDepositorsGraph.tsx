import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { TIME_OPTIONS_AFFILIEATES } from '../../constants'
import { IGrapgNames, IGraphData } from '../../routes/Affiliate/Affiliateitem'
import { affiliateDataObj } from '../../types/Afiliates'
import { TimeOption } from '../../types/TimeOption'
import Graph from '../base/Graph'

const AffiliateClaimsAndDepositorsGraph = ({ userData }: { userData?: affiliateDataObj }) => {
  const [selectedlStatisticPeriod, setSelectedStatisticPeriod] = useState(TIME_OPTIONS_AFFILIEATES[0])

  const dataCodeDepositors: { names: IGrapgNames[], values: IGraphData[] } = useMemo(() => {
    const monthData: IGraphData[] = []
    switch (selectedlStatisticPeriod.name) {
      case 'Day':
        for (let i = 0; i <= 24; i++) {
          monthData.push({
            name: dayjs().add(-24, 'hour').add(i, 'hour').format('MM/DD/YYYY HH'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#FCA213'
              },
              {
                postitveColor: '#3790D4'
              }
            ]
          })
        }
        break
      case 'Week':
        for (let i = 0; i <= 7; i++) {
          monthData.push({
            name: dayjs().add(-7, 'day').add(i, 'day').format('MM/DD/YYYY'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#FCA213'
              },
              {
                postitveColor: '#3790D4'
              }
            ]
          })
        }
        break
      default:
        for (let i = 0; i <= 30; i++) {
          monthData.push({
            name: dayjs().add(-30, 'day').add(i, 'day').format('MM/DD/YYYY'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#FCA213'
              },
              {
                postitveColor: '#3790D4'
              }
            ]
          })
        }
        break
    }
    let claimedTotal = 0
    let depositorsTotal = 0

    Array.isArray(userData?.data?.claimed) && userData?.data?.claimed?.forEach((cur) => {
      const dateVal = selectedlStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        claimedTotal += 1
        monthData[foundIndex].value[0] = (monthData[foundIndex].value[0] + 1)
      }
    })

    Array.isArray(userData?.data?.users) && userData?.data?.users?.forEach((cur) => {
      const dateVal = selectedlStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        depositorsTotal += 1
        monthData[foundIndex].value[1] = (monthData[foundIndex].value[1] + 1)
      }
    })

    return {
      names: [{ name: 'Code Claims -', value: claimedTotal, color: '#FCA213' }, { name: 'Depositors -', value: depositorsTotal, color: '#3790D4' }],
      values: monthData
    }
  }, [userData, selectedlStatisticPeriod])

  return (
    <Graph
      currentTimePeriod={selectedlStatisticPeriod}
      changeTimePeriod={(option: TimeOption) => setSelectedStatisticPeriod(option)}
      timePeriodOptions={TIME_OPTIONS_AFFILIEATES}
      data={dataCodeDepositors.values}
      labels={[]}
      names={dataCodeDepositors.names}
    />
  )
}

export default AffiliateClaimsAndDepositorsGraph
