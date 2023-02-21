import { useEffect, useState } from 'react'
import { StatisticCartItem } from '../../types/StatisticCartItem'
import { TimeOption } from '../../types/TimeOption'
import { UserWithBalance } from '../../types/User'
import CardsStatistic from '../CardsStatistic'
import CheckIcon from '../icons/CheckIcon'
import DownloadIcon from '../icons/DownloadIcon'
import SponseeIcon from '../icons/SponseeIcon'
import UploadIcon from '../icons/UploadIcon'
import WalletIcon from '../icons/WalletIcon'
import EditBalanceModal from './EditBalanceModal'
import EditWagerModal from './EditWagerModal'

const MainStatistic = ({ timePeriodOptions }: { timePeriodOptions: any[] }) => {
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(timePeriodOptions[0])
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])
  const [editedUserBalanceItem, setEditedUserBalanceItem] = useState<UserWithBalance>()
  const [editedUserWagerItem, setEditedUserWagerItem] = useState<UserWithBalance>()

  const editBalance = () => {
    setEditedUserBalanceItem({
      name: 'Some user',
      email: 'test@test.test',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      balance: 10000,
      wager: 100000
    })
  }

  const editWager = () => {
    setEditedUserWagerItem({
      name: 'Some user',
      email: 'test@test.test',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      balance: 10000,
      wager: 100000
    })
  }

  useEffect(() => {
    setGeneralStatistic([
      {
        text: '1,386,222',
        subtext: 'Balance',
        icon: <WalletIcon iconCalsses='w-5' />,
        canEdit: true,
        isCoinceValue: true,
        editFunction: () => editBalance()
      },
      {
        text: '100,000',
        subtext: 'Wager Requirement',
        icon: <CheckIcon iconCalsses='w-5' />,
        canEdit: true,
        isCoinceValue: true,
        editFunction: () => editWager()
      },
      {
        text: '831,386,222',
        subtext: 'Total Wagered',
        icon: <SponseeIcon iconCalsses='w-8' />,
        isCoinceValue: true
      },
      {
        text: '101,386,222',
        subtext: 'Total Deposited',
        icon: <DownloadIcon iconCalsses='w-4' />,
        isCoinceValue: true
      },
      {
        text: '93,386,222',
        subtext: 'Total Withdrawn',
        icon: <UploadIcon iconCalsses='w-4' />,
        isCoinceValue: true
      }
    ])
  }, [])

  return (
    <>
      <CardsStatistic
        title="Statistics"
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
      <EditBalanceModal user={editedUserBalanceItem} />
      <EditWagerModal user={editedUserWagerItem} />
    </>
  )
}

export default MainStatistic
