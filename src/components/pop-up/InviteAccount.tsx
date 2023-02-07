import React, { FC, useState } from 'react'
import { User } from '../../types/User'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import PopupWrapper from '../base/PopupWrapper'
import PermissionTemplate from './templates/PermissionTemplate'
import Divider from '../base/Divider'

interface IInviteAccountProps {
  isOpenPopupAddUser: boolean
  onClosePopup: () => void
}

const initialStateInput = { email: '', name: '', password: '' }
const InviteAccount: FC<IInviteAccountProps> = ({ isOpenPopupAddUser, onClosePopup }) => {
  const [inputsValues, setInputsValue] = useState(initialStateInput)
  const [createAccountStage, setCreateAccountStage] = useState<number>(1)
  const [user, setUser] = useState<User>()

  const handleChange = (name: string, value: string) => {
    setInputsValue(prev => ({ ...prev, [name]: value }))
  }

  const submitInvite = () => {
    if (inputsValues.email && inputsValues.name && inputsValues.password) {
      console.log(inputsValues)
      setUser({ ...inputsValues, avatar: '' })
      setCreateAccountStage(2)
    }
  }
  const submitCreateAccount = () => {
    console.log('submited')
    onClosePopup()
    setInputsValue(initialStateInput)
    setCreateAccountStage(1)
  }
  const cancelInvite = () => {
    onClosePopup()
    setInputsValue(initialStateInput)
  }

  const cancelSubmit = () => {
    setCreateAccountStage(1)
  }

  const getCreateAccountPopup = () => {
    switch (createAccountStage) {
      case 1:
        return (
    <div className=' flex flex-col items-center w-[450px]'>
      <h4 className='text-white uppercase text-3xl font-medium mb-2'>Invite Dashboard Account</h4>
      <p className='text-center text-gray-6 font-normal text-sm leading-5 px-14'>A user will be able to login to the dashboard withthe following details you create below</p>
      <Divider />
        <div className=' w-[300px] mt-[100px]'>
          <form className='w-full [&>label]:mb-4'>
            <InputWithLabel
               type='text'
               name='email'
               label='Email'
               placeholder='Enter email'
               value={inputsValues.email}
               changeFunction={handleChange} />

            <InputWithLabel
               type='text'
               name='name'
               label='Username'
               placeholder='Enter username'
               value={inputsValues.name}
               changeFunction={handleChange} />

            <InputWithLabel
              type='password'
              name='password'
              label='Password'
              placeholder='Enter password'
              value={inputsValues.password}
              changeFunction={handleChange} />
           </form>
        <div className='flex w-full gap-5 mt-20' >
          <Button text='Cancel' color='default' submitFunction={cancelInvite} />
          <Button text='Confirm' submitFunction={submitInvite} />
        </div>

     </div>
    </div>
        )
      case 2:
        return (
       <PermissionTemplate
            user={user}
            title={'Create Dashboard Account'}
            submitFunction={submitCreateAccount}
            togglePopup={cancelSubmit}
            popupClasses='flex flex-col items-center w-[450px] h-[520px] [&>p]:mb-[80px]' />)
    }
  }

  return (isOpenPopupAddUser
    ? <PopupWrapper closePopup={onClosePopup}>{getCreateAccountPopup()}</PopupWrapper>
    : null)
}

export default InviteAccount
