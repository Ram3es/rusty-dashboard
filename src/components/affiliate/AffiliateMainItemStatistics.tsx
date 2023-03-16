import { FC, useEffect, useMemo, useState } from 'react'
import { StatisticCartItem } from '../../types/StatisticCartItem'
import { User } from '../../types/User'
import CardsStatistic from '../CardsStatistic'
import CheckIcon from '../icons/CheckIcon'
import CoinceIcon from '../icons/CoinceIcon'
import DownloadIcon from '../icons/DownloadIcon'
import LinkIcon from '../icons/LinkIcon'
import SponseeIcon from '../icons/SponseeIcon'
import WalletIcon from '../icons/WalletIcon'
import EditAffiliateCode from '../pop-up/EditAffiliateCode'
import { affiliateDataObj, generalInfoObj } from '../../types/Afiliates'

interface IAffiliateGeneralProps {
  userInfo?: affiliateDataObj
  onCodeChange: (userId: string, newCode: string) => void
}

const AffiliateMainItemStatistics: FC<IAffiliateGeneralProps> = ({ userInfo, onCodeChange }): JSX.Element => {
  const [editedUser, setEditedUSer] = useState<User>()
  const [generalInfo, setGeneralInfo] = useState<generalInfoObj>()

  useEffect(() => {
    if (userInfo?.data && Array.isArray(userInfo.data.codeData)) {
      console.log(userInfo.data)
      setGeneralInfo({
        user: {
          avatar: userInfo.data.codeData[0].avatar || '',
          name: userInfo.data.codeData[0].username || '',
          id: userInfo.data.codeData[0].owner.toString() || ''
        },
        statistic: {
          code: userInfo.data.codeData[0].code ?? '',
          claims: Array.isArray(userInfo.data?.claimed) ? userInfo.data.claimed?.length.toString() || '0' : '0',
          depositors: Array.isArray(userInfo.data.claimed) ? [...userInfo.data.claimed].reduce((cur, user) => Array.isArray(userInfo.data?.users) && userInfo?.data?.users && userInfo.data.users.findIndex(deposit => deposit.userid === user.id) >= 0 ? ++cur : cur, 0).toString() : '0',
          totalDeposited: userInfo.data.codeData[0].wager.toString() ?? '0',
          earnings: userInfo.data.codeData[0].earnings.toString() ?? '0',
          currentBalance: userInfo.data.codeData[0].balance.toString() ?? '0'
        }
      })
    }
  }, [userInfo])

  const editFunction = () => {
    if (generalInfo) {
      setEditedUSer(generalInfo.user)
    }
  }

  const submitFunction = (userId: string, newCode: string) => {
    setEditedUSer(undefined)
    onCodeChange(userId, newCode)
  }

  const generalStatistic = useMemo((): StatisticCartItem[] => generalInfo
    ? [
        {
          text: generalInfo.statistic.code,
          subtext: 'Code',
          icon: <LinkIcon iconCalsses='w-4'/>,
          canEdit: true,
          editFunction: () => editFunction()
        },
        {
          text: generalInfo.statistic.claims,
          subtext: 'Claims',
          icon: <CheckIcon iconCalsses='w-5'/>
        },
        {
          text: generalInfo.statistic.depositors,
          subtext: 'Depositors',
          icon: <SponseeIcon iconCalsses='w-7'/>
        },
        {
          text: generalInfo.statistic.totalDeposited,
          isCoinceValue: true,
          subtext: 'Total Deposited',
          icon: <DownloadIcon iconCalsses='w-4'/>
        },
        {
          text: generalInfo.statistic.earnings,
          isCoinceValue: true,
          subtext: 'Earnings',
          icon: <CoinceIcon iconCalsses='w-5'/>
        },
        {
          text: generalInfo.statistic.currentBalance,
          isCoinceValue: true,
          subtext: 'Current Balance',
          icon: <WalletIcon iconCalsses='w-5'/>
        }
      ]
    : [], [generalInfo])

  return (<>
    <CardsStatistic
      title="AFFILIATE Statistics"
      items={generalStatistic}
      user={generalInfo?.user}
    />
    <EditAffiliateCode user={editedUser} onCodeChange={submitFunction} oldCode={generalInfo?.statistic.code ?? ''} onClose={() => setEditedUSer(undefined)} />
    </>
  )
}

export default AffiliateMainItemStatistics
