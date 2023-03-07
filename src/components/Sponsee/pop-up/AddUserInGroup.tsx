import React, { FC, useMemo, useState } from 'react'
import { useUserContext } from '../../../store/UserStore'
import Button from '../../base/Button'
import InputWithLabel from '../../base/InputWithLabel'
import PopupWrapper from '../../base/PopupWrapper'
import Table from '../../base/Table'
import UserAvatarWithName from '../../base/UserAvatarWithName'
import UserSearch from '../../users/UserSearch'

interface ISearchUsersProps {
  isOpenPopup: boolean
  closePopup: Function
  groupToEdit?: { name: string, id: string }
  onSubmit: ({ user_id, group_id }: { user_id: string, group_id: string }) => void
}

interface DataToAdd { user_id: string, group_id: string }

const AddUserInGroup: FC<ISearchUsersProps> = ({ isOpenPopup, closePopup, groupToEdit, onSubmit }) => {
  const [popupPermissinStage, setpopupPermissionStage] = useState<number>(1)
  const [selectedUser, setSelectedUser] = useState<DataToAdd>()
  const [user, setUser] = useState<{ name: string, avatar: string, id: string }>()
  const [searchUser, setSearchUser] = useState<Array<{ name: string, avatar: string, id: string, steamid: string }>>([])
  const [globulUser] = useUserContext()

  const handleCheckBox = (item: { user_id: string, group_id: string }) => {
    if (selectedUser?.user_id === item.user_id) {
      setSelectedUser(undefined)
    } else {
      setSelectedUser(item)
    }
  }

  const submitFunction = () => {
    if (selectedUser) {
      setpopupPermissionStage(2)
      const userToAdd = searchUser.find(user => user.id === selectedUser.user_id)
      if (userToAdd) {
        setUser({ ...userToAdd, name: userToAdd.name })
      }
      console.log(user)
    }
  }

  const cancelConfimation = () => {
    setpopupPermissionStage(1)
  }

  const submitConfirmation = () => {
    if (selectedUser) {
      onSubmit(selectedUser)
      setSelectedUser(undefined)
      setSearchUser([])
      setpopupPermissionStage(1)
      closePopup()
    }
  }

  const userSearch = (data: Record<string, string>) => {
    const keys = Object.keys(data)
    globulUser.socket?.emit('admin:groups:users', { type: keys[0], search: data[keys[0]] }, (data: any) => {
      console.log(data)
      if (!data.error) {
        setSearchUser(data.data)
      }
    })
  }

  const getCheckBoxComponent = (props: { group_id: string, user_id: string }) => {
    return (<InputWithLabel
      type='checkbox'
      name='user'
      value={selectedUser?.user_id === props.user_id}
      labelClasses='flex items-center justify-center'
      inputClasses='px-3 py-2  accent-yellow-f rounded text-white w-5 h-5 '
      changeFunction={() => handleCheckBox(props)} />)
  }

  const getGivenPermissionPopup = () => {
    switch (popupPermissinStage) {
      case 1:
        return (
        <>
          <div className=' flex flex-col '>
          <h4 className='text-white uppercase  text-3xl font-medium mb-8'>Add users to “{groupToEdit?.name}” Grouping</h4>
            <UserSearch submitFn={userSearch} />
            <Table columns={columns} data={data} />
            <div className='flex justify-center gap-5 w-full [&>button]:max-w-[140px] mt-12' >
              <Button text='Cancel' color='default' submitFunction={closePopup} />
              <Button text='Add' submitFunction={() => { submitFunction() }} />
            </div>
        </div>
      </>
        )
      case 2:
        return (
          <div className=' flex flex-col items-center w-[700px] '>
            <h4 className='text-white uppercase  text-3xl font-medium mb-3  '>Confirmation Required</h4>
            <div className='flex'>
              <p className='text-center text-gray-6 font-normal text-sm leading-5 p-2'>Are you sure you want to add the user</p>
                <UserAvatarWithName
                  user={user}
                  avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 '/>
            </div>
            <p className='text-center text-gray-6 font-normal text-sm leading-5 '>to the group “{groupToEdit?.name}”</p>
            <div className='flex justify-center gap-5 w-full [&>button]:max-w-[140px] mt-12' >
              <Button text='Cancel' color='default' submitFunction={cancelConfimation} />
              <Button text='Update' submitFunction={() => { submitConfirmation() }} />
            </div>
          </div>
        )
    }
  }

  const columns = useMemo(
    () => [
      {
        header: '',
        accessor: 'col1',
        Cell: (props: any) => getCheckBoxComponent(props.value)
      },
      {
        header: 'User',
        accessor: 'col2',
        Cell: (props: any) => {
          return <UserAvatarWithName user={{ ...props.value }} />
        }
      },
      {
        header: 'Steam 64',
        accessor: 'col3'
      },
      {
        header: 'UID',
        accessor: 'col4'
      }
    ],
    [selectedUser]
  )

  const data = useMemo(
    () => searchUser.map(user => ({
      col1: {
        group_id: groupToEdit?.id,
        user_id: user.id
      },
      col2: {
        name: user.name,
        avatar: user.avatar
      },
      col3: user.steamid,
      col4: user.id
    })),
    [searchUser]
  )

  return (isOpenPopup
    ? <PopupWrapper closePopup={closePopup}>
       {getGivenPermissionPopup()}
        </PopupWrapper>
    : null)
}

export default AddUserInGroup
