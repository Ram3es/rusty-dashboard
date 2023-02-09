import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Table from '../base/Table'
import CoinFlipIcon from '../icons/CoinFlipIcon'
import JackpotIcon from '../icons/JackpotIcon'
import MinesIcon from '../icons/MinesIcon'
import PlinkoIcon from '../icons/PlinkoIcon'
import PvpMinesIcon from '../icons/PvpMinesIcon'
import UpgraderIcon from '../icons/UpgraderIcon'
import WheelIcon from '../icons/WheelIcon'
import CoinceImage from '../../assets/coins.png'

const RecentWagers = () => {
  const [searchObj, setSearchObj] = useState<{ game: string }>({
    game: ''
  })

  const updateSearch = (name: string, value: string) => {
    setSearchObj(() => {
      return { game: value }
    })
  }

  const getGame = (game: string) => {
    switch (game) {
      case 'coinflip':
        return <CoinFlipIcon iconCalsses='w-6' />
      case 'jackpot':
        return <JackpotIcon iconCalsses='w-6' />
      case 'mines':
        return <MinesIcon iconCalsses='w-6' />
      case 'plinko':
        return <PlinkoIcon iconCalsses='w-6' />
      case 'pvp-mines':
        return <PvpMinesIcon iconCalsses='w-6' />
      case 'upgrader':
        return <UpgraderIcon iconCalsses='w-6' />
      case 'wheel':
        return <WheelIcon iconCalsses='w-6' />
      default:
        return undefined
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'Game',
        accessor: 'game',
        Cell: (props: any) => <div className='flex items-center gap-2'>{getGame(props.value)}<span>{props.value}</span></div>
      },
      {
        header: 'Value',
        accessor: 'value',
        Cell: (props: any) => <div className='flex items-center flex-2 gap-2'><img className='w-7 h-3' src={CoinceImage} alt="CoinceImage" /><span className='text-white text-lg'>{props.value}</span></div>
      },
      {
        header: 'Result',
        accessor: 'result',
        Cell: (props: any) => <div className='flex items-center flex-2 gap-2'><img className='w-7 h-3' src={CoinceImage} alt="CoinceImage" /><span className={`${props.value >= 0 ? 'text-green-500' : 'text-red-500'} text-lg`}>{props.value}</span></div>
      },
      {
        header: 'Time',
        accessor: 'time',
        Cell: (props: any) => dayjs(props.value).format('DD.MM.YY - HH:mm')
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        game: 'mines',
        value: 500300,
        result: 693283,
        time: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        game: 'jackpot',
        value: 500300,
        result: -693283,
        time: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        game: 'plinko',
        value: 500300,
        result: 693283,
        time: new Date('2023-01-12T16:51:16.919Z')
      }
    ].filter((i) => i.game.includes(searchObj.game.toString())),
    [searchObj.game]
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>Recent STAFF EDITS</h4>
            <div className='flex gap-6'>
              <InputWithLabel type='text' value={searchObj.game} name="game" changeFunction={updateSearch} placeholder="Search" />
            </div>
          </div>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecentWagers
