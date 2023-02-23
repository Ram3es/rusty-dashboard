import { useEffect, useState, useContext } from 'react'
import { DepositBase } from '../../types/Deposit'
import { TimeOption } from '../../types/TimeOption'
import { Context } from '../../store/GlobalStatisticStore'
import PipeChartWithTable from '../PipeChartWithTable'
import sortDataByDate from '../../helpers/sotingByDate'
import { TIME_OPTIONS } from '../../constants'

const depositOptions = ['deposit', 'withdraw']

const DepositAndWithdrawPipeChart = () => {
  const [depositData, setDepositData] = useState<DepositBase[]>([])
  const [selectedDepositPeriod, setSelectedDepositPeriod] = useState(TIME_OPTIONS[0])
  const [currentDepositSelect, setCurrentDepositSelect] = useState<string>(depositOptions[0])
  /** @ts-expect-error */
  const [state] = useContext(Context)

  useEffect(() => {
    if (state?.data?.data) {
      const { crypto, depositsItems, giftcards, trades } = state.data.data
      if (currentDepositSelect === 'deposit') {
        const cryptoSortedByDate = sortDataByDate(selectedDepositPeriod.name, crypto)
        const depositsSortedByDate = sortDataByDate(selectedDepositPeriod.name, depositsItems)
        const giftcardsSortedByDate = sortDataByDate(selectedDepositPeriod.name, giftcards)
        console.log('cryptoSortedByDate', cryptoSortedByDate, depositsSortedByDate, giftcardsSortedByDate)
        setDepositData([
          {
            name: 'skins',
            value: depositsSortedByDate.currentPeriod.reduce((prev, cur) => {
              const total = parseInt(cur.value) / 1000 + parseInt(prev)
              return total
            }, 0)
          },
          {
            name: 'gift cards',
            value: giftcardsSortedByDate.currentPeriod.reduce((prev, cur) => {
              const total = parseInt(cur.value) / 1000 + parseInt(prev)
              return total
            }, 0)
          },
          {
            name: 'crypto',
            value: cryptoSortedByDate.currentPeriod.reduce((prev, cur) => {
              const total = parseInt(cur.value) / 1000 + parseInt(prev)
              return total
            }, 0)
          }
        ])
      } else {
        const tragesSortedByDate = sortDataByDate(selectedDepositPeriod.name, trades)
        setDepositData([
          {
            name: 'skins',
            value: tragesSortedByDate.currentPeriod.reduce((prev, cur) => {
              const total = cur.type === 'withdraw' ? parseInt(cur.value) / 1000 + parseInt(prev) : parseInt(prev)
              return total
            }, 0)
          }
        ])
      }
    } else {
      if (currentDepositSelect === 'deposit') {
        setDepositData([
          {
            name: 'skins',
            value: 20
          },
          {
            name: 'crypto',
            value: 40
          },
          {
            name: 'gift cards',
            value: 55.8
          }
        ])
      } else {
        setDepositData([{
          name: 'skins',
          value: 20
        }])
      }
    }
  }, [state, selectedDepositPeriod, currentDepositSelect])

  return (
    <>
      { depositData.length > 0
        ? <PipeChartWithTable
        periodOptions={TIME_OPTIONS}
        depositData={depositData}
        selectedPeriod={selectedDepositPeriod}
        setSelectedDepositPeriod={(val: TimeOption) => setSelectedDepositPeriod(val)}
        currentDepositSelect={currentDepositSelect}
        setCurrentDepositSelect={(val: string) => setCurrentDepositSelect(val)}
        depositOptions={depositOptions}
      />
        : ''}
    </>
  )
}

export default DepositAndWithdrawPipeChart
