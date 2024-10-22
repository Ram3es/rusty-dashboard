import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
// import { TIME_OPTIONS } from '../../constants'
import { Context } from '../../store/GlobalStatisticStore'
import Graph from '../base/Graph'
import CryptoIcon from '../icons/CryptoIcon'
import GiftCardsIcon from '../icons/GiftCardsIcon'
import SkinsIcon from '../icons/SkinsIcon'

const DepositGraph = () => {
  /** @ts-expect-error */
  const [state, period] = useContext(Context)
  // const [depositDataStatisticPeriod, setDepositDataStatisticPeriod] = useState(TIME_OPTIONS[0])
  const [titleData, setTitleData] = useState([{ name: 'deposit', value: 0, color: '#39C89D' }])
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
      </span>,
      <span className='flex items-center' key="val3">
        <div
        className='w-5 h-5 rounded-full flex justify-center items-center mr-2'
        style={{ background: 'radial-gradient(70% 70% at 50% 80%,#27f278 0%,#86ffb6 100%)' }}
      ></div>
      Sell Winnings
    </span>
    ],
    data: []
  })

  useEffect(() => {
    if (state?.dataCurrentPeriod) {
      const { depositsItems, crypto, giftcards, sellWinningsDeposits } = state.dataCurrentPeriod
      let totalSum = 0
      const monthData: any[] = []
      let daysStartIndex
      switch (period) {
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
          name: period !== 'Day' ? dayjs().add(i, 'day').format('MM/DD/YYYY') : dayjs().add(i, 'hour').format('MM/DD/YYYY HH'),
          value: [0, 0, 0, 0],
          colors: [
            {
              postitveColor: '#E4164A'
            },
            {
              postitveColor: '#FCA213'
            },
            {
              postitveColor: '#3790D4'
            },
            {
              postitveColor: '#86ffb6'
            }
          ]
        })
      }
      const sortedData = depositsItems && [...depositsItems, ...crypto, ...giftcards, ...sellWinningsDeposits]
      sortedData?.forEach((cur: any) => {
        const dateVal = period !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
        const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
        if (foundIndex >= 0) {
          totalSum += Number(cur.value) / 1000
          switch (cur.type) {
            case 'steam-deposit':
              monthData[foundIndex].value[0] = Number(monthData[foundIndex].value[0]) + (Number(cur.value) / 1000)
              break
            case 'deposit-giftcards':
              monthData[foundIndex].value[2] = Number(monthData[foundIndex].value[2]) + (Number(cur.value) / 1000)
              break
            case 'coinflip-sell':
              monthData[foundIndex].value[3] = Number(monthData[foundIndex].value[3]) + (Number(cur.value) / 1000)
              break
            default:
              monthData[foundIndex].value[1] = Number(monthData[foundIndex].value[1]) + (Number(cur.value) / 1000)
              break
          }
        }
      })
      setDataDeposit((prev) => {
        return {
          ...prev,
          data: monthData
        }
      })
      console.log('dataDeposit', dataDeposit);
      
      setTitleData(prev => [{ ...prev[0], value: totalSum }])
    }
  }, [state])

  return (
    <>
      <Graph data={dataDeposit.data} names={titleData} labels={dataDeposit.labels} />
    </>
  )
}

export default DepositGraph
