import { useMemo } from 'react'
import { User } from '../../types/User'
import Select from '../base/Select'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import UserAvatarWithName from '../base/UserAvatarWithName'

const options = [
  { id: 1, name: 'Show 10', unavailable: false },
  { id: 2, name: 'Show 15', unavailable: false },
  { id: 3, name: 'Show 25', unavailable: false }
]

const AffilateUserStatistics = () => {
  const onSelected = (option: string) => {
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
    () => [
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '34523423',
        col3: '4,631,203,301',
        col4: '765,837,203',
        col5: '493,393,734',
        col6: '1,259,230,937'
      },
      {
        col1: { name: 'DerWeißWizard', avatar: '' },
        col2: '34523423',
        col3: '4,631,203,301',
        col4: '765,837,203',
        col5: '493,393,734',
        col6: '1,259,230,937'
      },
      {
        col1: { name: 'Iaharsonnya', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '34523423',
        col3: '4,631,203,301',
        col4: '765,837,203',
        col5: '493,393,734',
        col6: '1,259,230,937'
      },
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '34523423',
        col3: '4,631,203,301',
        col4: '765,837,203',
        col5: '493,393,734',
        col6: '1,259,230,937'
      },
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '34523423',
        col3: '4,631,203,301',
        col4: '765,837,203',
        col5: '493,393,734',
        col6: '1,259,230,937'
      },
      {
        col1: { name: 'DerWeißWizard' },
        col2: '34523423',
        col3: '4,631,203,301',
        col4: '765,837,203',
        col5: '493,393,734',
        col6: '1,259,230,937'
      },
      {
        col1: { name: 'DerWeißWizard' },
        col2: '34523423',
        col3: '4,631,203,301',
        col4: '765,837,203',
        col5: '493,393,734',
        col6: '1,259,230,937'
      }
    ],
    []
  )

  return (
    <div>
      <div className='flex justify-between'>
        <h4 className='text-white uppercase text-2xl'>Affiliate user statistics</h4>
        <Select options={options} onChange={onSelected} />
      </div>
      <div className='w-full flex flex-col mb-4'>
        <Table columns={columns} data={data} />
      </div>
</div>
  )
}
export default AffilateUserStatistics
