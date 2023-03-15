import { useMemo } from 'react'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import { Link } from 'react-router-dom'

export interface affiliateStatisticItem {
  codeName: {
    name: string
    id: string
  }
  codeClaims: number
  depositors: number
  wagered: number
  gameDeposits: number
  shopDeposits: number
  totalDeposits: number
}

const AffiliateStatistics = ({ affiliatesData }: { affiliatesData: affiliateStatisticItem[] }) => {
  // const [searchObj, setSearchObj] = useState<{ col3: string | number }>({
  //   col3: ''
  // })

  // const updateSearch = (name: string, value: string | number) => {
  //   setSearchObj(() => {
  //     return { col3: value }
  //   })
  // }

  const getCodeWithLink = (value: {
    name: string
    id: string
  }) => {
    return <Link to={`/affiliates/id/${value.id}`}>{value.name}</Link>
  }

  const getPriceFormated = (value: number) => {
    return (<div className='flex items-center gap-2 text-white'><img src={CoinceImage} /> <span>{value.toLocaleString('en-US')}</span></div>)
  }

  const columns = useMemo(
    () => [
      {
        header: 'Code name',
        accessor: 'codeName',
        Cell: (props: any) => getCodeWithLink(props.value)
      },
      {
        header: 'Code Claims',
        accessor: 'codeClaims'
      },
      {
        header: 'Depositors',
        accessor: 'depositors'
      },
      {
        header: 'Wagered',
        accessor: 'wagered',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Game Deposits',
        accessor: 'gameDeposits',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Shop Deposits',
        accessor: 'shopDeposits',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Total Deposits',
        accessor: 'totalDeposits',
        Cell: (props: any) => getPriceFormated(props.value)
      }
    ],
    []
  )

  const data = useMemo(
    (): affiliateStatisticItem[] => affiliatesData,
    [affiliatesData]
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>AFFILIATE STATISTICS</h4>
            {/* <div className='flex gap-6'>
              <InputWithLabel type='text' value={searchObj.col3} name="steamId" changeFunction={updateSearch} placeholder="Search By Steam ID" />
            </div> */}
          </div>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} itemsNumberOnPage={10} />
          </div>
        </div>
      </div>
    </>
  )
}

export default AffiliateStatistics
