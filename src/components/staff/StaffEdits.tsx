import { useMemo, useState } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import Table from '../base/Table'
import dayjs from 'dayjs';
import { User } from '../../types/User'
import CoinceImage from '../../assets/coins.png'
import InputWithLabel from '../base/InputWithLabel'

dayjs.extend(relativeTime)

const StaffEdits = ({ name }: { name: string }) => {
  const [searchObj, setSearchObj] = useState<{ col3: string | number }>({
    col3: ''
  })

  const updateSearch = (name: string, value: string | number) => {
    setSearchObj(() => {
      return { col3: value }
    })
  }

  const getUserComponent = (user: User) => {
    return (
      <div className='flex gap-2 items-center'>
        <img className='w-6 rounded-full' src={user.avatar} alt={user.name} />
        <div>{user.name}</div>
      </div>
    )
  }

  const getPriceFormated = ({ value, type }: { value: number | string, type: string }) => {
    if (type === 'Edit Balance') {
      return (<div className='flex items-center gap-2 text-white'><img src={CoinceImage} /> <span>{value}</span></div>)
    } else {
      return (<div className='flex items-center gap-2 text-white'><span>{value}</span></div>)
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'Editor',
        accessor: 'col1',
        Cell: (props: any) => getUserComponent(props.value)
      },
      {
        header: 'Affected',
        accessor: 'col2',
        Cell: (props: any) => getUserComponent(props.value)
      },
      {
        header: 'Steam 64',
        accessor: 'col3'
      },
      {
        header: 'UID',
        accessor: 'col4'
      },
      {
        header: 'Action',
        accessor: 'col5'
      },
      {
        header: 'From',
        accessor: 'col6',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'To',
        accessor: 'col7',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Time',
        accessor: 'col8',
        Cell: (props: any) => dayjs(props.value).format('DD.MM.YY - HH:mm')
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        col1: { name: 'DerWeißWizard 1', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: { name: 'DerWeißWizard 1', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col3: '1',
        col4: '1000',
        col5: 'Edit Balance',
        col6: { value: 1000, type: 'Edit Balance' },
        col7: { value: 1200, type: 'Edit Balance' },
        col8: new Date('2023-01-12T16:51:16.919Z')
      }
    ].filter((i) => i.col3.includes(searchObj.col3.toString())),
    [searchObj.col3]
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

export default StaffEdits
