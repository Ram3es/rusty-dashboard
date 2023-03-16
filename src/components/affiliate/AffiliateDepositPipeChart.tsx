import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { TIME_OPTIONS_AFFILIEATES } from '../../constants'
import { affiliateDataObj, depositType } from '../../types/Afiliates'
import { DepositBase } from '../../types/Deposit'
import { TimeOption } from '../../types/TimeOption'
import PipeChartWithTable from '../PipeChartWithTable'

const AffiliateDepositPipeChart = ({ userData }: { userData?: affiliateDataObj }) => {
  const [selectedlStatisticPeriod, setSelectedStatisticPeriod] = useState(TIME_OPTIONS_AFFILIEATES[0])

  const depositData: DepositBase[] = useMemo(() => {
    const [gifts, steam] = Array.isArray(userData?.data?.giftcardAndDeposit) && userData?.data?.giftcardAndDeposit
      ? userData?.data?.giftcardAndDeposit.reduce((prev, t) => {
        const compareDate = dayjs(t.timestamp)
        if (selectedlStatisticPeriod.days && compareDate.isAfter(dayjs().add(-(selectedlStatisticPeriod.days), 'day')) && compareDate.isBefore(dayjs())) {
          if (t.type === depositType.GIFTCARD) {
            prev[0] += t.value
          } else {
            prev[1] += t.value
          }
        }
        return prev
      }, [0, 0])
      : [0, 0]
    return [{
      name: 'skins',
      value: steam / 1000
    },
    {
      name: 'gift cards',
      value: gifts / 1000
    },
    {
      name: 'crypto',
      value: (Array.isArray(userData?.data?.cryptoRes) && userData?.data?.cryptoRes ? userData?.data?.cryptoRes.reduce((prev, item) => (prev += item.value), 0) : 0) / 1000
    }]
  }, [userData, selectedlStatisticPeriod])

  return (
    <>
      { depositData.length > 0
        ? <PipeChartWithTable
        periodOptions={TIME_OPTIONS_AFFILIEATES}
        selectedPeriod={selectedlStatisticPeriod}
        setSelectedDepositPeriod={(option: TimeOption) => setSelectedStatisticPeriod(option)}
        depositData={depositData}
        currentDepositSelect={'deposit'}
      />
        : ''}
    </>
  )
}

export default AffiliateDepositPipeChart
