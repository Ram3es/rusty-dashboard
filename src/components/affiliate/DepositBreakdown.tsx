
import { useMemo, useState } from 'react'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import JackpotIcon from '../icons/JackpotIcon'
import CoinFlipIcon from '../icons/CoinFlipIcon'
import DownloadIcon from '../icons/DownloadIcon'
import { affiliateDataObj, depositType, gameModes } from '../../types/Afiliates'
import { Listbox } from '@headlessui/react'
import ArrowIcon from '../icons/ArrowIcon'
import { TIME_OPTIONS_AFFILIEATES } from '../../constants'
import dayjs from 'dayjs'

const icons = [{
  name: 'jack',
  icon: <JackpotIcon iconCalsses="h-5" />
},
{
  name: 'coin',
  icon: <CoinFlipIcon iconCalsses="h-5" />
},
{
  name: 'shop',
  icon: <DownloadIcon iconCalsses="h-5" />
}
]

const DepositBreakdown = ({ userData }: { userData?: affiliateDataObj }) => {
  const [selectedlStatisticPeriod, setSelectedStatisticPeriod] = useState(TIME_OPTIONS_AFFILIEATES[0])

  const getMethod = (value: string) => {
    const icon = icons.find(item => value.toLowerCase().startsWith(item.name))?.icon
    return (
      <>
      <div className='flex gap-2'>
        {icon}
        <span>{value}</span>
      </div>
      </>
    )
  }
  const getAmountWithIcon = (value: string) => (
    <div className='flex items-center gap-2 text-white'>
       <img src={CoinceImage} />
       <span>{value}</span>
    </div>
  )

  const columns = useMemo(() => [
    {
      header: 'Method',
      accessor: 'col1',
      Cell: (props: any) => getMethod(props.value)
    },
    {
      header: 'Amount',
      accessor: 'col2',
      Cell: (props: any) => getAmountWithIcon(props.value)
    }

  ], [])

  const changeTimePeriod = (option: any) => setSelectedStatisticPeriod(option)

  const depositStatistic = useMemo(() => {
    const [jackpotDeposit, coinflipDeposit]: [number, number] = Array.isArray(userData?.data?.coinflipAndJackpots)
      ? userData?.data?.coinflipAndJackpots.reduce((prev, item) => {
        const compareDate = dayjs(item.timestamp)
        if (selectedlStatisticPeriod.days && compareDate.isAfter(dayjs().add(-(selectedlStatisticPeriod.days), 'day')) && compareDate.isBefore(dayjs())) {
          if (item.mode === gameModes.JACKPOT) {
            prev[0] = prev[0] + item.bet_value
          } else if (item.mode === gameModes.COINFLIP) {
            prev[1] = prev[1] + item.bet_value
          }
        }
        return prev
      }, [0, 0]) ?? [0, 0]
      : [0, 0]
    const [steamDeposit, giftcardpDeposit]: [number, number] = Array.isArray(userData?.data?.giftcardAndDeposit)
      ? userData?.data?.giftcardAndDeposit.reduce((prev, item) => {
        const compareDate = dayjs(item.timestamp)
        if (selectedlStatisticPeriod.days && compareDate.isAfter(dayjs().add(-(selectedlStatisticPeriod.days), 'day')) && compareDate.isBefore(dayjs())) {
          if (item.type === depositType.STEAM) {
            prev[0] = prev[0] + item.value
          } else {
            prev[1] = prev[1] + item.value
          }
        }
        return prev
      }, [0, 0]) ?? [0, 0]
      : [0, 0]
    return [
      {
        col1: 'Jackpot Deposit',
        col2: jackpotDeposit.toLocaleString('en-US')
      },
      {
        col1: 'Coinflip Despoit',
        col2: coinflipDeposit.toLocaleString('en-US')
      },
      {
        col1: 'Shop Deposit Rust Skins',
        col2: steamDeposit.toLocaleString('en-US')
      },
      {
        col1: 'Shop Deposits Cryptocurrency',
        col2: Array.isArray(userData?.data?.cryptoRes) ? userData?.data?.cryptoRes.reduce((prev, t) => (prev += t.value), 0).toLocaleString('en-US') ?? '0' : '0'
      },
      {
        col1: 'Shop Deposits Giftcards',
        col2: giftcardpDeposit.toLocaleString('en-US')
      }
    ]
  }, [userData, selectedlStatisticPeriod])

  return (
        <div>
            <div className='flex justify-between'>
              <h4 className='text-white uppercase text-2xl'>Deposit Breakdown</h4>
              <div className='relative'>
                <Listbox value={selectedlStatisticPeriod.name} onChange={(option) => changeTimePeriod(option)}>
                  {({ open }) => (
                    <>
                      <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                        <span>{selectedlStatisticPeriod.name}</span>
                        <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                      </Listbox.Button>
                      <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded z-20">
                        {TIME_OPTIONS_AFFILIEATES.map((option) => (
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
              </div>
            </div>
            <div className='w-full flex flex-col mb-4'>
              <Table columns={columns} data={depositStatistic} />
            </div>
        </div>
  )
}

export default DepositBreakdown
