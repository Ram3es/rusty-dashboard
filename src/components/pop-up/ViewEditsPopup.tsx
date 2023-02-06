import React, { FC, useEffect, useMemo, useState } from 'react'
import { User } from '../../types/User'
import PopupWrapper from '../base/PopupWrapper'
import Table from '../base/Table'
import UserAvatarWithName from '../base/UserAvatarWithName'
import CoinceImage from '../../assets/coins.png'
import dayjs from 'dayjs'
interface IViewEditPrpops {
  user?: User
}

const ViewEditsPopup: FC<IViewEditPrpops> = ({ user }) => {
  const [isOpenPopup, setOpenPopup] = useState(false)

  const closePopup = () => {
    setOpenPopup(false)
  }

  useEffect(() => {
    user && setOpenPopup(true)
  }, [user])

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
      },
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
    ], []
  )

  return (isOpenPopup
    ? <PopupWrapper closePopup={closePopup}>
        <div className={ 'flex flex-col items-start'}>
          <h4 className='text-white uppercase text-3xl font-medium mb-2'>Edits</h4>
          <UserAvatarWithName
            user={user}
            avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 mt-4'
            isBorderShown />
            <Table columns={columns} data={data} />
        </div>
        </PopupWrapper>
    : null
  )
}

export default ViewEditsPopup
