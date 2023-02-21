import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import Image from '../../assets/RustylootLogo.png'
import ButtonsToggle from '../base/ButtonsToggle'

const RecentTrades = () => {
  const tradesVariants = ['Deposits', 'Withdrawls']
  const [currentTradeVariant, setCurrentTradeVariant] = useState<string>(tradesVariants[0])

  const getStatus = ({ status, id }: { status: string, id: string }) => {
    switch (status) {
      case 'pending':
        return (<div className='flex gap-2 items-center'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.997 7.34876 18.9424 4.80697 17.0677 2.93226C15.193 1.05755 12.6512 0.00301416 10 0Z" fill="#FFC239"/>
            <circle cx="5.24354" cy="9.99964" r="1.53846" fill="#1B2130"/>
            <circle cx="9.99745" cy="9.99964" r="1.53846" fill="#1B2130"/>
            <circle cx="14.7553" cy="9.99964" r="1.53846" fill="#1B2130"/>
          </svg>
          {id}
        </div>)
      case 'bad':
        return (<div className='flex gap-2 items-center'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.997 7.34876 18.9424 4.80697 17.0677 2.93226C15.193 1.05755 12.6512 0.00301416 10 0Z" fill="#E21649"/>
            <path d="M10.2857 16C10.9958 16 11.5714 15.4244 11.5714 14.7143C11.5714 14.0042 10.9958 13.4286 10.2857 13.4286C9.57563 13.4286 9 14.0042 9 14.7143C9 15.4244 9.57563 16 10.2857 16Z" fill="#1B2130"/>
            <path d="M10.2638 11.7143C10.0237 11.7145 9.7928 11.6365 9.61912 11.4964C9.44543 11.3564 9.34236 11.1651 9.33135 10.9625L9.00112 5.13C8.99388 4.98357 9.02182 4.83741 9.08328 4.70036C9.14473 4.56331 9.23841 4.43821 9.35867 4.3326C9.47893 4.22699 9.62327 4.14307 9.78297 4.08591C9.94267 4.02875 10.1144 3.99952 10.2879 4.00001C10.4616 4.00002 10.6335 4.02983 10.7932 4.08763C10.9529 4.14543 11.0971 4.23003 11.2169 4.33629C11.3368 4.44256 11.4299 4.56827 11.4906 4.70583C11.5513 4.84339 11.5783 4.98993 11.57 5.13656L11.1915 10.9677C11.179 11.1688 11.0759 11.3581 10.9034 11.497C10.7309 11.6358 10.502 11.7136 10.2638 11.7143Z" fill="#1B2130"/>
          </svg>
          {id}
        </div>)
      case 'good':
        return (<div className='flex gap-2 items-center'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.997 7.34876 18.9424 4.80697 17.0677 2.93226C15.193 1.05755 12.6512 0.00301416 10 0Z" fill="#39C89D"/>
            <path d="M6.11572 9.12019L6.11579 9.12026C6.21522 9.2089 6.31461 9.29753 6.41398 9.38615C7.11145 10.0081 7.808 10.6293 8.50964 11.2449L8.5097 11.245C8.57971 11.3064 8.66851 11.3544 8.74417 11.372C8.81989 11.3896 8.89965 11.3676 9.00005 11.2573C9.75271 10.4305 10.5067 9.60467 11.2605 8.77915C11.3482 8.68303 11.436 8.58692 11.5237 8.49081L6.11572 9.12019ZM6.11572 9.12019C5.98644 9.00504 5.79965 8.86958 5.54818 8.87688C5.15918 8.87803 4.8354 9.13474 4.76437 9.51374L6.11572 9.12019ZM14.6734 5.8133L14.6734 5.81331C14.9668 5.93576 15.2001 6.24383 15.141 6.60495C15.1139 6.7705 15.034 6.94868 14.9161 7.07929C14.1441 7.93549 13.3672 8.78734 12.5907 9.6387C12.398 9.84999 12.2053 10.0613 12.0127 10.2726C11.1442 11.2255 10.2754 12.1784 9.40662 13.1314L9.40654 13.1314C9.2408 13.3131 9.03843 13.4389 8.80349 13.4493C8.56812 13.4598 8.35624 13.352 8.17707 13.1851C7.95124 12.9748 7.72545 12.7645 7.49966 12.5543C6.67796 11.7891 5.85635 11.024 5.03369 10.26C5.03369 10.26 5.03369 10.26 5.03368 10.26L5.2038 10.0768L14.6734 5.8133ZM14.6734 5.8133C14.3487 5.67784 14.0132 5.76405 13.7725 6.02731L14.6734 5.8133ZM11.9732 7.99803C12.5726 7.34095 13.1721 6.68372 13.7724 6.02735L11.9732 7.99803ZM11.9732 7.99803C11.8234 8.16228 11.6736 8.32652 11.5238 8.49074L11.9732 7.99803Z" fill="#1B2130" stroke="#1B2130" strokeWidth="0.5"/>
          </svg>
          {id}
        </div>)
    }
  }

  const getItems = (items: any[]) => {
    return (<div className='flex items-center gap-2'>
      {items.slice(0, 2).map((item, index) => (
        <div key={index} className='relative group'>
          <img className='w-8' src={item.image} />
          <div className='absolute hidden group-hover:flex bottom-full mb-2 left-1/2 w-max p-4 transform -translate-x-1/2 cursor-pointer flex-col items-center gap-2 bg-dark-22 border border-dark-1f'>
            <svg className='absolute top-full left-1/2 w-max p-4 transform -translate-x-1/2' width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0H0L9.5 8L19 0Z" fill="#373D54"/>
            </svg>
            <span>{item.name}</span>
            <div className='flex items-center gap-2 text-white'><img src={CoinceImage} /> <span>{item.price}</span></div>
          </div>
        </div>
      ))}
      {items.length > 2 &&
        <div className='w-8 h-8 bg-dark-1 flex justify-center items-center text-white text-sm rounded-full'>
          +{items.length - 2}
        </div>}
    </div>)
  }

  const getType = (type: string) => {
    switch (type) {
      case 'withdraw':
        return <div className='flex items-center gap-2'>
          <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.26473 17.3685V7.64731L4.00772 10.9043C3.74161 11.1704 3.31023 11.1704 3.04412 10.9043C2.778 10.6382 2.778 10.2066 3.04412 9.94052L7.4644 5.5203C7.73051 5.2542 8.16204 5.25418 8.42801 5.5203C8.42801 5.52031 8.42802 5.52031 8.42802 5.52031L12.8483 9.94052C12.9813 10.0736 13.048 10.2481 13.048 10.4225C13.048 10.5967 12.9813 10.7712 12.8483 10.9043C12.5822 11.1704 12.1507 11.1704 11.8847 10.9043C11.8847 10.9043 11.8847 10.9043 11.8847 10.9043L8.62767 7.64731V17.3685C8.62767 17.7447 8.32255 18.05 7.9462 18.05C7.56986 18.05 7.26473 17.7449 7.26473 17.3685Z" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
            <rect x="-0.05" y="0.05" width="13.9922" height="1.36293" rx="0.681464" transform="matrix(1 0 0 -1 1 1.73794)" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
          </svg>
          Withdraw
        </div>
      case 'deposit':
        return <div className='flex items-center gap-2'>
          <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.26473 1.63146V11.3527L4.00772 8.09572C3.74161 7.82961 3.31023 7.82961 3.04412 8.09572C2.778 8.36184 2.778 8.79337 3.04412 9.05948L7.4644 13.4797C7.73051 13.7458 8.16204 13.7458 8.42801 13.4797C8.42801 13.4797 8.42802 13.4797 8.42802 13.4797L12.8483 9.05948C12.9813 8.92644 13.048 8.7519 13.048 8.57752C13.048 8.40329 12.9813 8.22876 12.8483 8.09572C12.5822 7.82962 12.1507 7.8296 11.8847 8.09572C11.8847 8.09573 11.8847 8.09573 11.8847 8.09574L8.62767 11.3527V1.63146C8.62767 1.25529 8.32255 0.95 7.9462 0.95C7.56986 0.95 7.26473 1.25512 7.26473 1.63146Z" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
            <rect x="0.95" y="17.3121" width="13.9922" height="1.36293" rx="0.681464" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
          </svg>
          Deposit
        </div>
      default:
        return type
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'Items',
        accessor: 'items',
        Cell: (props: any) => getItems(props.value)
      },
      {
        header: 'Value',
        accessor: 'value',
        Cell: (props: any) => <div className='flex items-center flex-2 gap-2'><img className='w-7 h-3' src={CoinceImage} alt="CoinceImage" /><span className='text-white text-lg'>{props.value}</span></div>
      },
      {
        header: 'Time',
        accessor: 'time',
        Cell: (props: any) => dayjs(props.value).format('DD.MM.YY - HH:mm')
      },
      {
        header: 'Type',
        accessor: 'type',
        Cell: (props: any) => getType(props.value)
      },
      {
        header: 'Status and ID',
        accessor: 'status',
        Cell: (props: any) => getStatus(props.value)
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        items: [
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image }
        ],
        value: 500300,
        time: new Date('2023-01-12T16:51:16.919Z'),
        type: 'withdraw',
        status: {
          status: 'pending',
          id: '1234'
        }
      },
      {
        items: [
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image },
          { name: 'Neon Pumpkin Metal Double Door', price: '43801', image: Image }
        ],
        value: 500300,
        time: new Date('2023-01-12T16:51:16.919Z'),
        type: 'deposit',
        status: {
          status: 'bad',
          id: '5678'
        }
      }
    ].filter((i) => i.type.includes(currentTradeVariant === 'Withdrawls' ? 'withdraw' : 'deposit')),
    [currentTradeVariant]
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>Recent Trades</h4>
            <div className='flex gap-6'>
              <ButtonsToggle options={tradesVariants} currentSelect={currentTradeVariant} peackFunction={setCurrentTradeVariant} />
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

export default RecentTrades
