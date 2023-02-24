import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { TIME_OPTIONS } from '../../constants'
import { Context } from '../../store/GlobalStatisticStore'
import Graph from '../base/Graph'
import CryptoIcon from '../icons/CryptoIcon'
import GiftCardsIcon from '../icons/GiftCardsIcon'
import SkinsIcon from '../icons/SkinsIcon'

const WithdrawGraph = () => {
  /** @ts-expect-error */
  const [state] = useContext(Context)
  const [depositDataStatisticPeriod, setDepositDataStatisticPeriod] = useState(TIME_OPTIONS[0])
  const [titleData, setTitleData] = useState([{ name: 'withdraw', value: 0, color: '#39C89D' }])
  const [dataDeposit, setDataDeposit] = useState<{ name: string, labels: any[], data: Array<{ name: string, value: number[], colors: Array<{ postitveColor: string }> }> }>({
    name: 'deposit',
    labels: [
      <span className='flex items-center' key="val0">
        <div
          className='w-5 h-5 rounded-full flex justify-center items-center mr-2'
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #EB184C 55.21%, #AE0A3A 100%)' }}
        >
          <SkinsIcon iconCalsses='w-3' />
        </div>
        Skin
      </span>,
      <span className='flex items-center' key="val2">
         <div
          className='w-5 h-5 rounded-full flex justify-center items-center mr-2'
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FCA313 64.06%, #FA9215 100%)' }}
        >
          <CryptoIcon iconCalsses='w-3' />
        </div>
        Crypto
      </span>,
      <span className='flex items-center' key="val1">
         <div
          className='w-5 h-5 rounded-full flex justify-center items-center mr-2'
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #3790D4 64.06%, #2E72C9 100%)' }}
        >
          <GiftCardsIcon iconCalsses='w-3' />
        </div>
        Gift Cards
      </span>
    ],
    data: []
  })

  useEffect(() => {
    if (state?.data?.data) {
      const { trades } = state.data.data
      let totalSum = 0
      console.log('trades', trades)
      const monthData: any[] = []
      let daysStartIndex
      switch (depositDataStatisticPeriod.name) {
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
        monthData.push({
          name: depositDataStatisticPeriod.name !== 'Day' ? dayjs().add(i, 'day').format('DD/MM/YYYY') : dayjs().add(i, 'hour').format('DD/MM/YYYY HH'),
          value: [0],
          colors: [
            {
              postitveColor: '#E4164A'
            },
            {
              postitveColor: '#FCA213'
            },
            {
              postitveColor: '#3790D4'
            }
          ]
        })
      }
      [...trades].forEach((cur: any) => {
        const dateVal = depositDataStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('DD/MM/YYYY') : dayjs(cur.timestamp).format('DD/MM/YYYY HH')
        const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
        if (foundIndex >= 0 && cur.type === 'withdraw') {
          totalSum += Number(cur.value) / 1000
          monthData[foundIndex].value[0] = Number(monthData[foundIndex].value[0]) + (Number(cur.value) / 1000)
        }
      })
      console.log('monthData', monthData)
      setDataDeposit((prev) => {
        return {
          ...prev,
          data: monthData
        }
      })
      setTitleData(prev => [{ ...prev[0], value: totalSum }])
    }
  }, [state, depositDataStatisticPeriod])

  return (
    <>
      <Graph timePeriodOptions={TIME_OPTIONS} currentTimePeriod={depositDataStatisticPeriod} changeTimePeriod={setDepositDataStatisticPeriod} data={dataDeposit.data} names={titleData} labels={dataDeposit.labels} />
    </>
  )
}

export default WithdrawGraph
