import { useEffect, useState, useContext } from 'react'
import { DepositBase } from '../../types/Deposit'
// import { TimeOption } from '../../types/TimeOption'
import { Context } from '../../store/GlobalStatisticStore'
import PipeChartWithTable from '../PipeChartWithTable'
// import { TIME_OPTIONS } from '../../constants'

const depositOptions = ['deposit', 'withdraw']

const DepositAndWithdrawPipeChart = () => {
  const [depositData, setDepositData] = useState<DepositBase[]>([])
  // const [selectedDepositPeriod, setSelectedDepositPeriod] = useState(TIME_OPTIONS[0])
  const [currentDepositSelect, setCurrentDepositSelect] = useState<string>(depositOptions[0])
  /** @ts-expect-error */
  const [state] = useContext(Context)

  useEffect(() => {
    if (state?.dataCurrentPeriod) {
      console.log('state.dataCurrentPeriod', state.dataCurrentPeriod)
      const { crypto, depositsItems, giftcards, trades, sellWinningsDeposits } = state.dataCurrentPeriod
      if (currentDepositSelect === 'deposit') {
        console.log('deposits in pie chart', depositsItems)
        setDepositData([
          {
            name: 'skins',
            value: depositsItems.reduce((prev: any, cur: { value: any }) => {
              const total = Number(cur.value) / 1000 + Number(prev)
              return total
            }, 0)
          },
          {
            name: 'gift cards',
            value: giftcards.reduce((prev: any, cur: { value: any }) => {
              const total = Number(cur.value) / 1000 + Number(prev)
              return total
            }, 0)
          },
          {
            name: 'crypto',
            value: crypto.reduce((prev: any, cur: { value: any }) => {
              const total = Number(cur.value) / 1000 + Number(prev)
              return total
            }, 0)
          },
          {
            name: 'sell winnings',
            value: sellWinningsDeposits.reduce((prev: any, cur: { value: any }) => {
              const total = Number(cur.value) / 1000 + Number(prev)
              return total
            }, 0)
          }
        ])
      } else {
        setDepositData([
          {
            name: 'skins',
            value: trades.reduce((prev: any, cur: { type: string, value: any }) => {
              const total = cur.type === 'withdraw' ? Number(cur.value) / 1000 + Number(prev) : Number(prev)
              return total
            }, 0)
          }
        ])
      }
    }
  }, [state, currentDepositSelect])

  return (
    <>
      { depositData.length > 0
        ? <PipeChartWithTable
        depositData={depositData}
        currentDepositSelect={currentDepositSelect}
        setCurrentDepositSelect={(val: string) => setCurrentDepositSelect(val)}
        depositOptions={depositOptions}
      />
        : ''}
    </>
  )
}

export default DepositAndWithdrawPipeChart
