import React, { FC, useMemo, useState } from 'react'
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
}

const AddUserInGroup: FC<ISearchUsersProps> = ({ isOpenPopup, closePopup, groupToEdit }) => {
  const [popupPermissinStage, setpopupPermissionStage] = useState<number>(1)
  const [isChecked, setChecked] = useState({ user: false })
  const [user, setUser] = useState<{ name: string, avatar: string }>()

  const handleCheckBox = (name: string, isChecked: boolean) => {
    setChecked(prev => ({ ...prev, [name]: isChecked }))
  }

  const submitFunction = () => {
    const selected = { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' }
    console.log('submited', groupToEdit)
    setpopupPermissionStage(2)
    setUser(selected)
  }

  const cancelConfimation = () => {
    setpopupPermissionStage(1)
  }

  const submitConfirmation = () => {
    setpopupPermissionStage(1)
    closePopup()
  }

  const getCheckBoxComponent = () => (
    <InputWithLabel
      type='checkbox'
      name='user'
      value={isChecked.user}
      labelClasses='flex items-center justify-center'
      inputClasses='px-3 py-2  accent-yellow-f rounded text-white w-5 h-5 '
      changeFunction={handleCheckBox} />
  )

  const getGivenPermissionPopup = () => {
    switch (popupPermissinStage) {
      case 1:
        return (
        <>
          <div className=' flex flex-col '>
          <h4 className='text-white uppercase  text-3xl font-medium mb-8'>Add users to “{groupToEdit?.name}” Grouping</h4>
            <UserSearch submitFn={() => { '' }} />
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
        Cell: (props: any) => getCheckBoxComponent()
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
    [isChecked]
  )

  const data = useMemo(
    () => [
      {
        col2: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col3: '7182317182913',
        col4: '9821'

      },
      {
        col2: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col3: '7182317182913',
        col4: '9821'
      },
      {
        col2: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col3: '7182317182913',
        col4: '9821'
      }
    ],
    []
  )

  return (isOpenPopup
    ? <PopupWrapper closePopup={closePopup}>
       {getGivenPermissionPopup()}
        </PopupWrapper>
    : null)
}

export default AddUserInGroup