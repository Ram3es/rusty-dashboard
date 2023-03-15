import { useMemo, useState } from 'react'
import { User } from '../../types/User'
import Select from '../base/Select'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import UserAvatarWithName from '../base/UserAvatarWithName'
import { affiliateDataObj, gameModes } from '../../types/Afiliates'

const options = [
  { id: 1, name: 'Show 10', unavailable: false, length: 10 },
  { id: 2, name: 'Show 25', unavailable: false, length: 25 },
  { id: 3, name: 'Show 50', unavailable: false, length: 50 },
  { id: 4, name: 'Show 100', unavailable: false, length: 100 }
]

const AffilateUserStatistics = ({ userData }: { userData?: affiliateDataObj }) => {
  const [tableLength, setTableLength] = useState<number>(10)
  const onSelected = (option: string) => {
    setTableLength(options.find(item => item.name === option)?.length ?? 0)
  }
  const getUserComponent = (user: User) => <UserAvatarWithName user={user}/>

  const getPriceFormated = (value: number) => {
    return (
      <div className='flex items-center gap-2 text-white'>
        <img src={CoinceImage} />
        <span>{value}</span></div>)
  }

  const columns = useMemo(() => [
    {
      header: 'Steam Name',
      accessor: 'col1',
      Cell: (props: any) => getUserComponent(props.value)
    },
    {
      header: 'UID',
      accessor: 'col2'
    },
    {
      header: 'Wagered',
      accessor: 'col3',
      Cell: (props: any) => getPriceFormated(props.value)
    },
    {
      header: 'Game Deposits',
      accessor: 'col4',
      Cell: (props: any) => getPriceFormated(props.value)
    },
    {
      header: 'Shop Deposits',
      accessor: 'col5',
      Cell: (props: any) => getPriceFormated(props.value)
    },
    {
      header: 'Total Deposits',
      accessor: 'col6',
      Cell: (props: any) => getPriceFormated(props.value)
    }
  ], [])

  const data = useMemo(
    () => Array.isArray(userData?.data?.claimed)
      ? userData?.data?.claimed.map(user => {
        const shopDeposits: number = userData?.data?.giftcardAndDeposit && Array.isArray(userData?.data?.giftcardAndDeposit)
          ? [...userData?.data?.giftcardAndDeposit]
              .filter(deposit => user.id === deposit.userid)
              .reduce((prev, deposit) => (prev += deposit.value), 0)
          : 0
        const jackpotAndCoinflipDeposits = userData?.data?.coinflipAndJackpots && Array.isArray(userData?.data?.coinflipAndJackpots)
          ? [...userData?.data?.coinflipAndJackpots]
              .filter(game => (game.mode === gameModes.COINFLIP || game.mode === gameModes.JACKPOT) && game.userid === user.id)
              .reduce((prev, game) => (prev += game.bet_value), 0)
          : 0
        const cryptoDeposit: number = userData?.data && Array.isArray(userData?.data?.cryptoRes)
          ? [...userData?.data?.cryptoRes]
              .filter(deposit => user.id === deposit.user_id)
              .reduce((prev, deposit) => (prev += deposit.value), 0)
          : 0
        return {
          col1: {
            name: user.username,
            avatar: user.avatar
          },
          col2: user.id,
          col3: userData?.data?.coinflipAndJackpots && Array.isArray(userData?.data?.coinflipAndJackpots)
            ? userData?.data?.coinflipAndJackpots
              .reduce((prev, game) => game.userid === user.id ? (prev += game.bet_value) : prev, 0)
              .toLocaleString('en-US')
            : 0,
          col4: jackpotAndCoinflipDeposits.toLocaleString('en-US'),
          col5: (shopDeposits + cryptoDeposit).toLocaleString('en-US'),
          col6: (shopDeposits + cryptoDeposit + jackpotAndCoinflipDeposits).toLocaleString('en-US')
        }
      }) ?? []
      : [],
    [userData]
  )

  return (
    <div>
      <div className='flex justify-between'>
        <h4 className='text-white uppercase text-2xl'>Affiliate user statistics</h4>
        <Select options={options} onChange={onSelected} />
      </div>
      <div className='w-full flex flex-col mb-4'>
        <Table columns={columns} data={data} itemsNumberOnPage={tableLength} />
      </div>
</div>
  )
}
export default AffilateUserStatistics
