import { useMemo, useState } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import Table from '../base/Table'
import dayjs from 'dayjs'
import { User } from '../../types/User'
import Button from '../base/Button'
import CoinceImage from '../../assets/coins.png'
import EditIcon from '../icons/EditIcon'
import LockIcon from '../icons/LockIcon'
import EditPermissions from '../pop-up/EditPermissions'
import UserAvatarWithName from '../base/UserAvatarWithName'
import InviteAccount from '../pop-up/InviteAccount'
import ViewEditsPopup from '../pop-up/ViewEditsPopup'

dayjs.extend(relativeTime)

const BackendAccounts = ({ name }: { name: string }) => {
  const [userToPermissionEdit, setUserToPermissionEdit] = useState<User>()
  const [userToEdit, setUserToEdit] = useState<User>()
  const [isOpenPopupAddUser, setOpenPopupAddUser] = useState<boolean>(false)

  const togglePopupAddUser = () => {
    setOpenPopupAddUser(prev => !prev)
  }

  const getUserComponent = (user: User) => {
    return <UserAvatarWithName user={user}/>
  }

  const getPermisionsEditButton = (id: string) => {
    const mock = { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' }
    return (
      <div className='flex gap-3 cursor-pointer items-center text-yellow-f' onClick={() => { console.log('edit permissions ', id); setUserToEdit(mock) } }>
        <EditIcon iconCalsses='w-5' />
        View Edits
      </div>
    )
  }

  const getPermisionsPopup = (user: User) => {
    const mock = { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' }
    return (
      <div className='flex gap-3 cursor-pointer items-center text-yellow-f' onClick={() => { console.log('View Permissions ', user); setUserToPermissionEdit(mock) }}>
        <LockIcon />
        View Permissions
      </div>
    )
  }

  const getPriceFormated = (price: number) => {
    return (<div className='flex items-center gap-2 text-white'><img src={CoinceImage} /> <span>{price}</span></div>)
  }

  const columns = useMemo(
    () => [
      {
        header: 'User',
        accessor: 'col1',
        Cell: (props: any) => getUserComponent(props.value)
      },
      {
        header: 'Permisions',
        accessor: 'col2',
        Cell: (props: any) => getPermisionsEditButton(props.value)
      },
      {
        header: 'Credits left',
        accessor: 'col3',
        Cell: (props: any) => getPriceFormated(props.value)
      },
      {
        header: 'Permisions',
        accessor: 'col4',
        Cell: (props: any) => getPermisionsPopup(props.value)
      },
      {
        header: 'Last Updated',
        accessor: 'col5',
        Cell: (props: any) => dayjs(props.value).format('DD.MM.YY - HH:mm')
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '1',
        col3: '1000',
        col4: '1',
        col5: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '2',
        col3: '1000',
        col4: '2',
        col5: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '3',
        col3: '1000',
        col4: '3',
        col5: new Date('2023-01-12T16:51:16.919Z')
      }
    ],
    []
  )

  const submitPermission = () => {
    console.log('submited')
  }

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1 px-8 py-10'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>{name}</h4>
            <div className='flex gap-6'>
              <Button text='Add User' submitFunction={() => { console.log('add'); togglePopupAddUser() }} color="gray" />
            </div>
          </div>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} />
          </div>
          <EditPermissions
            title='Edit Permission'
            isEdit
            user={userToPermissionEdit}
            submitFunction={submitPermission} />
          <InviteAccount isOpenPopupAddUser={isOpenPopupAddUser} onClosePopup={togglePopupAddUser} />
          <ViewEditsPopup user={userToEdit} />
        </div>
      </div>
    </>
  )
}

export default BackendAccounts
