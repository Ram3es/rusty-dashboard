import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Table from '../base/Table'
import UserAvatarWithName from '../base/UserAvatarWithName'
import EditIcon from '../icons/EditIcon'

const RecentStaffEdits = () => {
  const [searchObj, setSearchObj] = useState<{ name: string | number }>({
    name: ''
  })

  const updateSearch = (name: string, value: string) => {
    setSearchObj(() => {
      return { name: value }
    })
  }

  const getType = (type: string) => {
    switch (type) {
      case 'Edit Balance':
        return <div className='flex items-center gap-2'>
          <EditIcon />
          Edit Balance
        </div>
      case 'Withdraw Status':
        return <div className='flex items-center gap-2'>
          <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.26473 17.3685V7.64731L4.00772 10.9043C3.74161 11.1704 3.31023 11.1704 3.04412 10.9043C2.778 10.6382 2.778 10.2066 3.04412 9.94052L7.4644 5.5203C7.73051 5.2542 8.16204 5.25418 8.42801 5.5203C8.42801 5.52031 8.42802 5.52031 8.42802 5.52031L12.8483 9.94052C12.9813 10.0736 13.048 10.2481 13.048 10.4225C13.048 10.5967 12.9813 10.7712 12.8483 10.9043C12.5822 11.1704 12.1507 11.1704 11.8847 10.9043C11.8847 10.9043 11.8847 10.9043 11.8847 10.9043L8.62767 7.64731V17.3685C8.62767 17.7447 8.32255 18.05 7.9462 18.05C7.56986 18.05 7.26473 17.7449 7.26473 17.3685Z" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
            <rect x="-0.05" y="0.05" width="13.9922" height="1.36293" rx="0.681464" transform="matrix(1 0 0 -1 1 1.73794)" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
          </svg>
          Withdraw Status
        </div>
      case 'Deposit Status':
        return <div className='flex items-center gap-2'>
          <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.26473 1.63146V11.3527L4.00772 8.09572C3.74161 7.82961 3.31023 7.82961 3.04412 8.09572C2.778 8.36184 2.778 8.79337 3.04412 9.05948L7.4644 13.4797C7.73051 13.7458 8.16204 13.7458 8.42801 13.4797C8.42801 13.4797 8.42802 13.4797 8.42802 13.4797L12.8483 9.05948C12.9813 8.92644 13.048 8.7519 13.048 8.57752C13.048 8.40329 12.9813 8.22876 12.8483 8.09572C12.5822 7.82962 12.1507 7.8296 11.8847 8.09572C11.8847 8.09573 11.8847 8.09573 11.8847 8.09574L8.62767 11.3527V1.63146C8.62767 1.25529 8.32255 0.95 7.9462 0.95C7.56986 0.95 7.26473 1.25512 7.26473 1.63146Z" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
            <rect x="0.95" y="17.3121" width="13.9922" height="1.36293" rx="0.681464" fill="#666E97" stroke="#6E749C" strokeWidth="0.1"/>
          </svg>
          Deposit Status
        </div>
      case 'Muted':
        return <div className='flex items-center gap-2'>
          <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.2784 18.7718C12.1312 18.7715 11.9875 18.7261 11.8668 18.6418L4.64454 13.5863C4.54887 13.5199 4.47067 13.4314 4.41659 13.3283C4.36252 13.2252 4.33418 13.1105 4.33398 12.9941V5.77185C4.33418 5.65541 4.36252 5.54075 4.41659 5.43763C4.47067 5.33451 4.54887 5.246 4.64454 5.17963L11.8668 0.124074C11.972 0.0528314 12.0943 0.01064 12.2211 0.00176318C12.3479 -0.00711368 12.4748 0.0176383 12.589 0.0735183C12.7108 0.131518 12.8139 0.222474 12.8867 0.33608C12.9594 0.449685 12.9989 0.581399 13.0007 0.716296V18.0496C13.0009 18.1822 12.9647 18.3124 12.8959 18.4258C12.8271 18.5391 12.7284 18.6314 12.6106 18.6924C12.5079 18.7451 12.3939 18.7723 12.2784 18.7718ZM5.77843 12.6185L11.5562 16.663V2.10296L5.77843 6.14741V12.6185Z" fill="#666E97"/>
            <path d="M5.05555 13.7163H2.16667C1.59203 13.7163 1.04093 13.488 0.634602 13.0817C0.228273 12.6754 0 12.1243 0 11.5496V7.21629C0 6.64165 0.228273 6.09055 0.634602 5.68422C1.04093 5.27789 1.59203 5.04962 2.16667 5.04962H5.05555C5.2471 5.04962 5.4308 5.12571 5.56624 5.26116C5.70169 5.3966 5.77778 5.5803 5.77778 5.77184V12.9941C5.77778 13.1856 5.70169 13.3693 5.56624 13.5048C5.4308 13.6402 5.2471 13.7163 5.05555 13.7163ZM2.16667 6.49407C1.97512 6.49407 1.79142 6.57016 1.65598 6.7056C1.52054 6.84104 1.44444 7.02474 1.44444 7.21629V11.5496C1.44444 11.7412 1.52054 11.9249 1.65598 12.0603C1.79142 12.1958 1.97512 12.2718 2.16667 12.2718H4.33333V6.49407H2.16667Z" fill="#666E97"/>
          </svg>
          Muted
        </div>
      default:
        return type
    }
  }

  const getUserComponent = (props: any) => {
    return <UserAvatarWithName user={props}/>
  }

  const columns = useMemo(
    () => [
      {
        header: 'Staff Name',
        accessor: 'user',
        Cell: (props: any) => getUserComponent(props.value)
      },
      {
        header: 'Type',
        accessor: 'type',
        Cell: (props: any) => getType(props.value)
      },
      {
        header: 'From',
        accessor: 'fromState'
      },
      {
        header: 'To',
        accessor: 'toState'
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
        user: { name: 'Iaharsonnya', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        type: 'Edit Balance',
        fromState: '138,123',
        toState: '0',
        time: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        user: { name: 'Terry', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        type: 'Withdraw Status',
        fromState: 'Disabled',
        toState: 'Active',
        time: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        user: { name: 'Terry', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        type: 'Muted',
        fromState: '138,123',
        toState: '0',
        time: new Date('2023-01-12T16:51:16.919Z')
      }
    ].filter((i) => i.user.name.includes(searchObj.name.toString())),
    [searchObj.name]
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>Recent STAFF EDITS</h4>
            <div className='flex gap-6'>
              <InputWithLabel type='text' value={searchObj.name} name="name" changeFunction={updateSearch} placeholder="Search" />
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

export default RecentStaffEdits
