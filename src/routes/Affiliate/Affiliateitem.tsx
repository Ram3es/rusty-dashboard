import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import AffilateUserStatistics from '../../components/affiliate/AffiliateUserStatistics'
import AffiliateMainItemStatistics from '../../components/affiliate/AffiliateMainItemStatistics'
import DepositBreakdown from '../../components/affiliate/DepositBreakdown'
// import DepositAndWithdrawPipeChart from '../../components/dashboard/DepositAndWithdrawPipeChart'
// import Graph from '../../components/base/Graph'
import UserSearch from '../../components/users/UserSearch'
import { useUserContext } from '../../store/UserStore'
import { affiliateDataObj, depositType, gameModes } from '../../types/Afiliates'
import { TIME_OPTIONS_AFFILIEATES } from '../../constants'
import { TimeOption } from '../../types/TimeOption'
import dayjs from 'dayjs'
import Graph from '../../components/base/Graph'
import { DepositBase } from '../../types/Deposit'
import PipeChartWithTable from '../../components/PipeChartWithTable'

interface IData {
  name: string
  value: number[]
  colors: Array<{ postitveColor: string }>
}

interface IGrapgNames {
  name: string
  value: string | number
  color: string
  withIcon?: boolean | undefined
}

const Affiliateitem = () => {
  const [user] = useUserContext()
  const params = useParams()
  const [userData, setUserData] = useState<affiliateDataObj>()
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(TIME_OPTIONS_AFFILIEATES[0])

  const foundUser = (obj: Record<string, string>) => {
    const keys = Object.keys(obj)
    if (user.isSystemConnect && keys[0] && obj[keys[0]]) {
      user.socket?.emit('admin:affiliate:get', { type: keys[0], value: obj[keys[0]], qty: 999 }, (data: affiliateDataObj) => {
        if (!data?.error && data.data) {
          setUserData(data)
        } else {
          console.log(data.msg)
          setUserData(undefined)
        }
      })
    }
  }

  const chandeAfiliateCode = (userId: string, newCode: string) => {
    if (user.isSystemConnect) {
      user.socket?.emit('admin:affiliate:edit', { userid: userId, code: newCode.toUpperCase() }, (data: any) => {
        if (!data?.error) {
          setUserData(prev => {
            if (prev?.data) {
              const newUser = { ...prev }
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              newUser.data!.codeData[0].code = newCode.toUpperCase()
              return newUser
            }
          })
        } else {
          console.log(data.msg)
        }
      })
    }
  }

  useEffect(() => {
    if (params.type && params.value) foundUser({ [params.type]: params.value })
  }, [params, selectedGeneralStatisticPeriod])

  const dataCodeDepositors: { names: IGrapgNames[], values: IData[] } = useMemo(() => {
    const monthData: IData[] = []
    switch (selectedGeneralStatisticPeriod.name) {
      case 'Day':
        for (let i = 0; i <= 24; i++) {
          monthData.push({
            name: dayjs().add(-24, 'hour').add(i, 'hour').format('MM/DD/YYYY HH'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#FCA213'
              },
              {
                postitveColor: '#3790D4'
              }
            ]
          })
        }
        break
      case 'Week':
        for (let i = 0; i <= 7; i++) {
          monthData.push({
            name: dayjs().add(-7, 'day').add(i, 'day').format('MM/DD/YYYY'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#FCA213'
              },
              {
                postitveColor: '#3790D4'
              }
            ]
          })
        }
        break
      default:
        for (let i = 0; i <= 30; i++) {
          monthData.push({
            name: dayjs().add(-30, 'day').add(i, 'day').format('MM/DD/YYYY'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#FCA213'
              },
              {
                postitveColor: '#3790D4'
              }
            ]
          })
        }
        break
    }
    let claimedTotal = 0
    let depositorsTotal = 0

    Array.isArray(userData?.data?.claimed) && userData?.data?.claimed?.forEach((cur) => {
      const dateVal = selectedGeneralStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        claimedTotal += 1
        monthData[foundIndex].value[0] = (monthData[foundIndex].value[0] + 1)
      }
    })

    Array.isArray(userData?.data?.users) && userData?.data?.users?.forEach((cur) => {
      const dateVal = selectedGeneralStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        depositorsTotal += 1
        monthData[foundIndex].value[1] = (monthData[foundIndex].value[1] + 1)
      }
    })

    return {
      names: [{ name: 'Code Claims -', value: claimedTotal, color: '#FCA213' }, { name: 'Depositors -', value: depositorsTotal, color: '#3790D4' }],
      values: monthData
    }
  }, [userData])
  const dataWagersAndDeposits: { names: IGrapgNames[], values: IData[] } = useMemo(() => {
    const monthData: IData[] = []
    switch (selectedGeneralStatisticPeriod.name) {
      case 'Day':
        for (let i = 0; i <= 24; i++) {
          monthData.push({
            name: dayjs().add(-24, 'hour').add(i, 'hour').format('MM/DD/YYYY HH'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#E4164A'
              },
              {
                postitveColor: '#374CD4'
              }
            ]
          })
        }
        break
      case 'Week':
        for (let i = 0; i <= 7; i++) {
          monthData.push({
            name: dayjs().add(-7, 'day').add(i, 'day').format('MM/DD/YYYY'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#E4164A'
              },
              {
                postitveColor: '#374CD4'
              }
            ]
          })
        }
        break
      default:
        for (let i = 0; i <= 30; i++) {
          monthData.push({
            name: dayjs().add(-30, 'day').add(i, 'day').format('MM/DD/YYYY'),
            value: [0, 0],
            colors: [
              {
                postitveColor: '#E4164A'
              },
              {
                postitveColor: '#374CD4'
              }
            ]
          })
        }
        break
    }
    let wagerTotal = 0
    let depositTotal = 0
    Array.isArray(userData?.data?.giftcardAndDeposit) && userData?.data?.giftcardAndDeposit?.forEach((cur) => {
      const dateVal = selectedGeneralStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        depositTotal += cur.value / 1000
        monthData[foundIndex].value[1] = (monthData[foundIndex].value[0] + cur.value) / 1000
      }
    })
    Array.isArray(userData?.data?.cryptoRes) && userData?.data?.cryptoRes?.forEach((cur) => {
      const dateVal = selectedGeneralStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        depositTotal += cur.value / 1000
        monthData[foundIndex].value[1] = (monthData[foundIndex].value[0] + cur.value) / 1000
      }
    })
    Array.isArray(userData?.data?.coinflipAndJackpots) && userData?.data?.coinflipAndJackpots?.forEach((cur) => {
      const dateVal = selectedGeneralStatisticPeriod.name !== 'Day' ? dayjs(cur.timestamp).format('MM/DD/YYYY') : dayjs(cur.timestamp).format('MM/DD/YYYY HH')
      const foundIndex = monthData?.findIndex((item: any) => item.name === dateVal)
      if (foundIndex >= 0) {
        wagerTotal += cur.bet_value / 1000
        monthData[foundIndex].value[0] = (monthData[foundIndex].value[1] + cur.bet_value) / 1000
      }
    })
    return {
      names: [{ name: 'Wagers -', value: wagerTotal, color: '#E4164A', withIcon: true }, { name: 'Deposited -', value: depositTotal, color: '#374CD4', withIcon: true }],
      values: monthData
    }
  }, [userData])
  const depositData: DepositBase[] = useMemo(() => {
    const [gifts, steam] = Array.isArray(userData?.data?.giftcardAndDeposit) && userData?.data?.giftcardAndDeposit
      ? userData?.data?.giftcardAndDeposit.reduce((prev, t) => {
        if (t.type === depositType.GIFTCARD) {
          prev[0] += t.value
          return prev
        } else {
          prev[1] += t.value
          return prev
        }
      }, [0, 0])
      : [0, 0]
    return [{
      name: 'skins',
      value: steam / 1000
    },
    {
      name: 'gift cards',
      value: gifts / 1000
    },
    {
      name: 'crypto',
      value: (Array.isArray(userData?.data?.cryptoRes) && userData?.data?.cryptoRes ? userData?.data?.cryptoRes.reduce((prev, item) => (prev += item.value), 0) : 0) / 1000
    }]
  }, [userData])

  const depositStatistic = useMemo(() => {
    const [jackpotDeposit, coinflipDeposit]: [number, number] = Array.isArray(userData?.data?.coinflipAndJackpots)
      ? userData?.data?.coinflipAndJackpots.reduce((prev, item) => {
        if (item.mode === gameModes.JACKPOT) {
          prev[0] = prev[0] + item.bet_value
        } else if (item.mode === gameModes.COINFLIP) {
          prev[1] = prev[1] + item.bet_value
        }
        return prev
      }, [0, 0]) ?? [0, 0]
      : [0, 0]
    const [steamDeposit, giftcardpDeposit]: [number, number] = Array.isArray(userData?.data?.giftcardAndDeposit)
      ? userData?.data?.giftcardAndDeposit.reduce((prev, item) => {
        if (item.type === depositType.STEAM) {
          prev[0] = prev[0] + item.value
        } else {
          prev[1] = prev[1] + item.value
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
  }, [userData])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <AffiliateMainItemStatistics
            userInfo={userData}
            selectedPeriod={selectedGeneralStatisticPeriod}
            changePeriod={(option: TimeOption) => setSelectedGeneralStatisticPeriod(option)}
            onCodeChange={chandeAfiliateCode}
          />
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <Graph
            data={dataCodeDepositors.values}
            labels={[]}
            names={dataCodeDepositors.names}
          />
        </div>
        <div className='col-span-6 2xl:col-span-3 rounded-lg bg-dark-1 p-8'>
        { depositData.length > 0
          ? <PipeChartWithTable
          depositData={depositData}
          currentDepositSelect={'deposit'}
        />
          : ''}
        </div>
        <div className="col-span-6 2xl:col-span-3 rounded-lg bg-dark-1">
          <Graph
            data={dataWagersAndDeposits.values}
            labels={[]}
            names={dataWagersAndDeposits.names}
          />
        </div>
        <div className='col-span-6 2xl:col-span-3  rounded-lg bg-dark-1 p-8'>
          <DepositBreakdown data={depositStatistic} />
        </div>
        <div className='col-span-6 rounded-lg bg-dark-1 p-8'>
          <AffilateUserStatistics userData={userData} />
        </div>
      </div>
    </>
  )
}

export default Affiliateitem
