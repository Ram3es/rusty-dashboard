import { useEffect, useState } from 'react'
import { StatisticCartItem } from '../../types/StatisticCartItem'
import { TimeOption } from '../../types/TimeOption'
import CardsStatistic from '../CardsStatistic'
import CheckIcon from '../icons/CheckIcon'
import CoinceIcon from '../icons/CoinceIcon'
import DownloadIcon from '../icons/DownloadIcon'
import LinkIcon from '../icons/LinkIcon'
import SponseeIcon from '../icons/SponseeIcon'
import WalletIcon from '../icons/WalletIcon'

const timePeriodOptions: TimeOption[] = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const AffiliateMainItemStatistics = () => {
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(timePeriodOptions[0])
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])

  useEffect(() => {
    setGeneralStatistic([
      {
        text: 'Grodslaktaren',
        subtext: 'Code',
        icon: <LinkIcon iconCalsses='w-4'/>,
        canEdit: true,
        editFunction: () => console.log('open edit popup')
      },
      {
        text: '21 355',
        subtext: 'Claims',
        icon: <CheckIcon iconCalsses='w-5'/>
      },
      {
        text: '14 324',
        subtext: 'Depositors',
        icon: <SponseeIcon iconCalsses='w-7'/>
      },
      {
        text: '101,386,222',
        isCoinceValue: true,
        subtext: 'Code',
        icon: <DownloadIcon iconCalsses='w-4'/>
      },
      {
        text: '101,386',
        isCoinceValue: true,
        subtext: 'Earnings',
        icon: <CoinceIcon iconCalsses='w-5'/>
      },
      {
        text: '351,386',
        isCoinceValue: true,
        subtext: 'Current Balance',
        icon: <WalletIcon iconCalsses='w-5'/>
      }
    ])
  }, [])

  return (
    <CardsStatistic
      title="AFFILIATE Statistics"
      periodOptions={timePeriodOptions}
      selectedPeriod={selectedGeneralStatisticPeriod}
      changePeriod={(option: TimeOption) => setSelectedGeneralStatisticPeriod(option)}
      items={generalStatistic}
      user={{
        name: 'Some user',
        email: 'test@test.test',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }}
    />
  )
}

export default AffiliateMainItemStatistics
