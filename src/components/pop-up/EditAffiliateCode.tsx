import React, { FC, useEffect, useState } from 'react'
import { User } from '../../types/User'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import PopupWrapper from '../base/PopupWrapper'
import UserAvatarWithName from '../base/UserAvatarWithName'

interface IEditCode {
  user?: User
}

const EditAffiliateCode: FC<IEditCode> = ({ user }) => {
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState('')
  const [editCodePopupStage, seteditCodeStage] = useState<number>(1)

  const toggleModal = () => {
    setOpenPopup(state => !state)
    seteditCodeStage(1)
    setInputValue('')
  }

  const onChange = (name: string, value: string) => {
    setInputValue(value)
  }

  const onChangeStage = () => {
    if (inputValue) {
      seteditCodeStage(2)
    }
  }

  const submitFunction = () => {
    toggleModal()
  }

  useEffect(() => {
    user && toggleModal()
  }, [user])

  const getEditCodePopup = () => {
    switch (editCodePopupStage) {
      case 1:
        return (
            <div className='flex flex-col items-center w-[600px] text-dark-1'>
              <h4 className='text-white uppercase text-3xl font-medium mb-5'>Edit affiliate code</h4>
              <UserAvatarWithName
                user={user}
                avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 pl-3'
                isBorderShown />

              <div className='flex flex-col items-center w-[300px] [&>button]:w-[120px] mt-8'>
                <InputWithLabel
                  type='text'
                  label='New Code'
                  value={inputValue}
                  name={''}
                  placeholder='Enter new code'
                  inputClasses='px-3 py-2 bg-dark-17 rounded text-white h-11 mt-2 mb-8'
                  changeFunction={onChange} />
                  <Button text='Confirm' submitFunction={onChangeStage} />
                </div>
            </div>
        )
      case 2:
        return (
            <div className=' flex flex-col items-center w-[700px] '>
            <h4 className='text-white uppercase  text-3xl font-medium mb-3  '>Confirmation Required</h4>
            <div className='flex'>
              <p className='text-center text-gray-6 font-normal text-sm leading-5 p-2'>Are you sure you want to push the change</p>
                <UserAvatarWithName
                user={user}
                avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 '/>
            </div>
            <p className='text-center text-gray-6 font-normal text-sm leading-5 '>affiliate code from “Terry” to “Alex”?  </p>
            <div className='flex justify-center gap-5 w-full [&>button]:max-w-[140px] mt-12' >
              <Button text='Cancel' color='default' submitFunction={() => seteditCodeStage(1)} />
              <Button text='Change' submitFunction={submitFunction} />
            </div>
          </div>)
    }
  }

  return (isOpenPopup
    ? <PopupWrapper closePopup={toggleModal}>
        {getEditCodePopup()}
        </PopupWrapper>
    : null)
}

export default EditAffiliateCode
