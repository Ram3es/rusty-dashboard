import { useEffect, useState } from 'react'
import { TIME_OPTIONS } from '../../constants'
import { StatisticCartItem } from '../../types/StatisticCartItem'
import { TimeOption } from '../../types/TimeOption'
import { User } from '../../types/User'
import CardsStatistic from '../CardsStatistic'
import CheckIcon from '../icons/CheckIcon'
import CoinceIcon from '../icons/CoinceIcon'
import DownloadIcon from '../icons/DownloadIcon'
import LinkIcon from '../icons/LinkIcon'
import SponseeIcon from '../icons/SponseeIcon'
import WalletIcon from '../icons/WalletIcon'
import EditAffiliateCode from '../pop-up/EditAffiliateCode'

const AffiliateMainItemStatistics = () => {
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(TIME_OPTIONS[0])
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [editedUser, setEditedUSer] = useState<User>()

  const editFunction = () => {
    setEditedUSer({
      name: 'Some user',
      email: 'test@test.test',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    })
  }

  useEffect(() => {
    setGeneralStatistic([
      {
        text: 'Grodslaktaren',
        subtext: 'Code',
        icon: <LinkIcon iconCalsses='w-4'/>,
        canEdit: true,
        editFunction: () => editFunction()
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
        subtext: 'Total Deposited',
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

  return (<>
    <CardsStatistic
      title="AFFILIATE Statistics"
      periodOptions={TIME_OPTIONS}
      selectedPeriod={selectedGeneralStatisticPeriod}
      changePeriod={(option: TimeOption) => setSelectedGeneralStatisticPeriod(option)}
      items={generalStatistic}
      user={{
        name: 'Some user',
        email: 'test@test.test',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }}
    />
    <EditAffiliateCode user={editedUser} />
    </>
  )
}

export default AffiliateMainItemStatistics
