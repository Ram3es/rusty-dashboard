
import { useMemo } from 'react'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import JackpotIcon from '../icons/JackpotIcon'
import CoinFlipIcon from '../icons/CoinFlipIcon'
import DownloadIcon from '../icons/DownloadIcon'

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

const DepositBreakdown = ({ data }: { data: Array<{ col1: string, col2: string }> }) => {
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

  return (
        <div>
            <div className='flex justify-between'>
              <h4 className='text-white uppercase text-2xl'>Deposit Breakdown</h4>
            </div>
            <div className='w-full flex flex-col mb-4'>
              <Table columns={columns} data={data} />
            </div>
        </div>
  )
}

export default DepositBreakdown
