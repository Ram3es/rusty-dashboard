import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { TIME_OPTIONS_AFFILIEATES } from '../../constants'
import { IGrapgNames, IGraphData } from '../../routes/Affiliate/Affiliateitem'
import { affiliateDataObj } from '../../types/Afiliates'
import { TimeOption } from '../../types/TimeOption'
import Graph from '../base/Graph'

const AffiliateWagersAndDepositsGraph = ({ userData }: { userData?: affiliateDataObj }) => {
  const [selectedlStatisticPeriod, setSelectedStatisticPeriod] = useState(TIME_OPTIONS_AFFILIEATES[0])

  const dataWagersAndDeposits: { names: IGrapgNames[], values: IGraphData[] } = useMemo(() => {
    const monthData: IGraphData[] = []
    switch (selectedlStatisticPeriod.name) {
      case 'Day':
        for (let i = 0; i <= 24; i++) {
          monthData.push({
            name: dayjs().add(-24, 'hour').add(i, 'hour').format('MM/DD/YYYY HH'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#E4164A'
              },
              {
                postitveColor: '#374CD4'
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
                postitveColor: '#E4164A'
              },
              {
                postitveColor: '#374CD4'
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
                postitveColor: '#E4164A'
              },
              {
                postitveColor: '#374CD4'
              }
            ]
          })
        }
        break
    }
    let wagerTotal = 0
    let depositTotal = 0
    Array.isArray(userData?.data?.giftcardAndDeposit) && userData?.data?.giftcardAndDeposit?.forEach((cur) => {
      const dateVal = selectedlStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        depositTotal += cur.value / 1000
        monthData[foundIndex].value[1] = (monthData[foundIndex].value[1] + (cur.value / 1000))
      }
    })
    Array.isArray(userData?.data?.cryptoRes) && userData?.data?.cryptoRes?.forEach((cur) => {
      const dateVal = selectedlStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        depositTotal += cur.value / 1000
        monthData[foundIndex].value[1] = (monthData[foundIndex].value[1] + (cur.value / 1000))
      }
    })
    Array.isArray(userData?.data?.coinflipAndJackpots) && userData?.data?.coinflipAndJackpots?.forEach((cur) => {
      const dateVal = selectedlStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        wagerTotal += cur.bet_value / 1000
        monthData[foundIndex].value[0] = (monthData[foundIndex].value[0] + (cur.bet_value / 1000))
      }
    })
    return {
      names: [{ name: 'Wagers -', value: wagerTotal, color: '#E4164A', withIcon: false }, { name: 'Deposited -', value: depositTotal, color: '#374CD4', withIcon: false }],
      values: monthData
    }
  }, [userData, selectedlStatisticPeriod])

  return (
    <Graph
      currentTimePeriod={selectedlStatisticPeriod}
      changeTimePeriod={(option: TimeOption) => setSelectedStatisticPeriod(option)}
      timePeriodOptions={TIME_OPTIONS_AFFILIEATES}
      data={dataWagersAndDeposits.values}
      labels={[]}
      names={dataWagersAndDeposits.names}
    />
  )
}

export default AffiliateWagersAndDepositsGraph
