import { useMemo, useState } from 'react'
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
import { generalInfoObj } from '../../types/Afiliates'

const AffiliateMainItemStatistics = ({ generalInfoObj }: { generalInfoObj: generalInfoObj }): JSX.Element => {
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(TIME_OPTIONS[0])
  const [editedUser, setEditedUSer] = useState<User>()

  const editFunction = () => {
    setEditedUSer(generalInfoObj.user)
  }

  const generalStatistic = useMemo((): StatisticCartItem[] => [
    {
      text: generalInfoObj.statistic.code,
      subtext: 'Code',
      icon: <LinkIcon iconCalsses='w-4'/>,
      canEdit: true,
      editFunction: () => editFunction()
    },
    {
      text: generalInfoObj.statistic.claims,
      subtext: 'Claims',
      icon: <CheckIcon iconCalsses='w-5'/>
    },
    {
      text: generalInfoObj.statistic.depositors,
      subtext: 'Depositors',
      icon: <SponseeIcon iconCalsses='w-7'/>
    },
    {
      text: generalInfoObj.statistic.totalDeposited,
      isCoinceValue: true,
      subtext: 'Total Deposited',
      icon: <DownloadIcon iconCalsses='w-4'/>
    },
    {
      text: generalInfoObj.statistic.earnings,
      isCoinceValue: true,
      subtext: 'Earnings',
      icon: <CoinceIcon iconCalsses='w-5'/>
    },
    {
      text: generalInfoObj.statistic.currentBalance,
      isCoinceValue: true,
      subtext: 'Current Balance',
      icon: <WalletIcon iconCalsses='w-5'/>
    }
  ], [generalInfoObj])

  return (<>
    <CardsStatistic
      title="AFFILIATE Statistics"
      periodOptions={TIME_OPTIONS}
      selectedPeriod={selectedGeneralStatisticPeriod}
      changePeriod={(option: TimeOption) => setSelectedGeneralStatisticPeriod(option)}
      items={generalStatistic}
      user={generalInfoObj.user}
    />
    <EditAffiliateCode user={editedUser} />
    </>
  )
}

export default AffiliateMainItemStatistics
