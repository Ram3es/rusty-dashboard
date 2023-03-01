import { useMemo, useState } from 'react'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import InputWithLabel from '../base/InputWithLabel'
import { Link } from 'react-router-dom'

const AffiliateStatistics = ({ name }: { name: string }) => {
  const [searchObj, setSearchObj] = useState<{ col3: string | number }>({
    col3: ''
  })

  const updateSearch = (name: string, value: string | number) => {
    setSearchObj(() => {
      return { col3: value }
    })
  }

  const getCodeWithLink = (value: string) => {
    return <Link to={`/affiliates/${value}`}>{value}</Link>
  }

  const getPriceFormated = (value: number) => {
    return (<div className='flex items-center gap-2 text-white'><img src={CoinceImage} /> <span>{value}</span></div>)
  }

  const columns = useMemo(
    () => [
      {
        header: 'Code name',
        accessor: 'col1',
        Cell: (props: any) => getCodeWithLink(props.value)
      },
      {
        header: 'Code Claims',
        accessor: 'col2'
      },
      {
        header: 'Depositors',
        accessor: 'col3'
      },
      {
        header: 'Wagered',
        accessor: 'col4',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Game Deposits',
        accessor: 'col5',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Shop Deposits',
        accessor: 'col6',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Total Deposits',
        accessor: 'col7',
        Cell: (props: any) => getPriceFormated(props.value)
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        col1: 'SebManChild1',
        col2: 13430,
        col3: 31462,
        col4: '4,631,203,301',
        col5: '765,837,203',
        col6: '493,393,734',
        col7: '1,259,230,937'
      },
      {
        col1: 'SebManChild2',
        col2: 13430,
        col3: 31462,
        col4: '4,631,203,301',
        col5: '765,837,203',
        col6: '493,393,734',
        col7: '1,259,230,937'
      },
      {
        col1: 'SebManChild',
        col2: 13430,
        col3: 31462,
        col4: '4,631,203,301',
        col5: '765,837,203',
        col6: '493,393,734',
        col7: '1,259,230,937'
      },
      {
        col1: 'SebManChild',
        col2: 13430,
        col3: 31462,
        col4: '4,631,203,301',
        col5: '765,837,203',
        col6: '493,393,734',
        col7: '1,259,230,937'
      },
      {
        col1: 'SebManChild',
        col2: 13430,
        col3: 31462,
        col4: '4,631,203,301',
        col5: '765,837,203',
        col6: '493,393,734',
        col7: '1,259,230,937'
      },
      {
        col1: 'SebManChild',
        col2: 13430,
        col3: 31462,
        col4: '4,631,203,301',
        col5: '765,837,203',
        col6: '493,393,734',
        col7: '1,259,230,937'
      },
      {
        col1: 'SebManChild',
        col2: 13430,
        col3: 31462,
        col4: '4,631,203,301',
        col5: '765,837,203',
        col6: '493,393,734',
        col7: '1,259,230,937'
      }
    ],
    []
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1 px-8 py-10'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>{name}</h4>
            <div className='flex gap-6'>
              <InputWithLabel type='text' value={searchObj.col3} name="steamId" changeFunction={updateSearch} placeholder="Search By Steam ID" />
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

export default AffiliateStatistics
