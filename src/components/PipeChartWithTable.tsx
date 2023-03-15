// import { Listbox } from '@headlessui/react'
import { FC, useEffect, useState } from 'react'
import { Deposit } from '../types/Deposit'
// import ArrowIcon from './icons/ArrowIcon'
import CryptoIcon from './icons/CryptoIcon'
import GiftCardsIcon from './icons/GiftCardsIcon'
import SkinsIcon from './icons/SkinsIcon'
import { PieChart, Pie, Cell } from 'recharts'
import ButtonsToggle from './base/ButtonsToggle'
import { TimeOption } from '../types/TimeOption'

const colorAndIconPeaker = (item: any) => {
  switch (item.name) {
    case 'skins':
      return {
        ...item,
        color: 'radial-gradient(50% 50% at 50% 50%, #EB184C 55.21%, #AE0A3A 100%)',
        chartColor: '#AE0A3A',
        icon: <SkinsIcon iconCalsses='w-4' />
      }
    case 'gift cards':
      return {
        ...item,
        color: 'radial-gradient(50% 50% at 50% 50%, #3790D4 64.06%, #2E72C9 100%)',
        chartColor: '#2E72C9',
        icon: <GiftCardsIcon iconCalsses='w-4' />
      }
    case 'crypto':
      return {
        ...item,
        color: 'radial-gradient(50% 50% at 50% 50%, #FCA313 64.06%, #FA9215 100%)',
        chartColor: '#FA9215',
        icon: <CryptoIcon iconCalsses='w-4' />
      }
    default:
      return {
        ...item,
        color: 'gray',
        icon: <GiftCardsIcon />
      }
  }
}

interface IPepeChart {
  periodOptions?: any[]
  depositData: any[]
  selectedPeriod?: TimeOption
  setSelectedDepositPeriod?: (value: TimeOption) => void
  depositOptions?: string[]
  currentDepositSelect: string
  setCurrentDepositSelect?: (value: string) => void
}

const PipeChartWithTable: FC<IPepeChart> = ({ periodOptions, depositData, selectedPeriod, depositOptions, setSelectedDepositPeriod, currentDepositSelect, setCurrentDepositSelect }) => {
  const [statisticData, setStatisticData] = useState<Deposit[]>([])
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    setTotal(() => depositData.reduce((prev, cur) => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      prev += cur.value
      return prev
    }, 0))

    setStatisticData(() => {
      return depositData.map(item => {
        const statisticItem = colorAndIconPeaker(item)
        statisticItem.percent = item.value ? (item.value / total) * 100 : 0
        return statisticItem
      })
    })
  }, [depositData, periodOptions, total])

  return (
    <div className='flex gap-10 flex-wrap justify-around relative'>
      <div className="relative">
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2'>
          <div className='text-white text-2xl'>${total.toFixed(2)}</div>
          <div className='text-gray-7 capitalize text-base'>total {currentDepositSelect}</div>
        </div>
        <PieChart width={279} height={279}>
          <Pie data={depositData} dataKey="value" cx="50%" cy="50%" innerRadius={90} outerRadius={130} fill="#82ca9d">
            {statisticData.map((entry, index) => (
              <Cell key={`cell-${index}`} stroke="#1B2130" strokeWidth="4" fill={entry.chartColor} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex gap-5 justify-between items-end'>
          <div className='flex flex-col gap-5'>
            <div className="uppercase text-white text-2xl">{currentDepositSelect}</div>
            {depositOptions && setCurrentDepositSelect
              ? <ButtonsToggle options={depositOptions} currentSelect={currentDepositSelect} peackFunction={setCurrentDepositSelect} />
              : ''
            }
          </div>
          {/* <div className="relative">
              <Listbox value={selectedPeriod} onChange={setSelectedDepositPeriod}>
                {({ open }) => (
                  <>
                    <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                      <span>{selectedPeriod.name}</span>
                      <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                    </Listbox.Button>
                    <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded">
                      {periodOptions.map((option) => (
                        <Listbox.Option
                          className="cursor-pointer text-gray-6 hover:text-white"
                          key={option.id}
                          value={option}
                          disabled={option.unavailable}
                        >
                          {option.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </>
                )}
              </Listbox>
          </div> */}
        </div>
        <div className='flex flex-col w-full'>
          {statisticData.map((item, index) => <div
            key={index}
            className={`grid grid-cols-4 text-white text-base capitalize ${index !== 0 ? 'border-t border-dark-25' : ''}`}
          >
              <div className='col-span-2 flex gap-3 p-3'>
                <div
                  className='w-7 h-7 rounded-full flex justify-center items-center'
                  style={{
                    background: item.color
                  }}
                >
                  {item.icon}
                </div>
                {item.name}
              </div>
              <div className='col-span-1 p-3'>
                {Number.isInteger(item.percent) ? item.percent : item.percent.toFixed(1)}%
              </div>
              <div className='col-span-1 p-3'>
                ${item.value.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PipeChartWithTable
