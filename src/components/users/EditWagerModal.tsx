import React, { FC, useEffect, useState } from 'react'
import { UserWithBalance } from '../../types/User'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import PopupWrapper from '../base/PopupWrapper'
import UserAvatarWithName from '../base/UserAvatarWithName'
import CoinceImage from '../../assets/coins.png'

interface IEditCode {
  user?: UserWithBalance
}

const EditWagerModal: FC<IEditCode> = ({ user }) => {
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<number>(0)
  const [newBalance, setNewBalance] = useState<number>(0)
  const [editCodePopupStage, seteditCodeStage] = useState<number>(1)

  const toggleModal = () => {
    setOpenPopup(state => !state)
    seteditCodeStage(1)
    setInputValue(0)
    setNewBalance(0)
  }

  const onChange = (name: string, value: number) => {
    setInputValue(value)
  }

  const addNewBalance = () => {
    setInputValue(0)
    setNewBalance(inputValue)
  }

  const onChangeStage = () => {
    seteditCodeStage(2)
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
            <div className='flex flex-col gap-5 items-center w-[600px] text-dark-1'>
              <h4 className='text-white uppercase text-3xl font-medium'>EDIT Wager Requirement</h4>
              <UserAvatarWithName
                user={user}
                avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 pl-3'
                isBorderShown />

              <div className='flex items-end gap-2 [&>button]:w-[120px]'>
                <InputWithLabel
                  type='number'
                  label='Add or subtract balance'
                  value={inputValue}
                  name={''}
                  placeholder='Enter amount'
                  labelClasses="flex flex-col w-full text-gray-6 text-x"
                  inputClasses='px-3 py-2 bg-dark-17 rounded text-white h-11'
                  changeFunction={onChange} />
                <Button text='Add' submitFunction={addNewBalance} />
              </div>
              <div className='flex gap-7 items-center'>
                <div className='flex flex-col gap-2 p-7 bg-dark-1c'>
                  <div className='text-white text-2xl flex gap-2 items-center'>
                    <span>{user?.balance}</span>
                    <img src={CoinceImage} alt="CoinceImage" />
                  </div>
                  <div className='text-gray-7 text-base'>Current wager requirement</div>
                </div>
                <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.7281 0H8.08984L15.3621 8.93447L8.08984 17.8274H18.7281L26.0003 8.93447L18.7281 0Z" fill="url(#paint0_linear_991_10098)"/>
                  <path d="M3.49068 0H0L7.27224 8.93447L0 17.8274H3.49068L10.7214 8.93447L3.49068 0Z" fill="url(#paint1_linear_991_10098)"/>
                  <defs>
                  <linearGradient id="paint0_linear_991_10098" x1="17.0451" y1="0" x2="17.0451" y2="17.8274" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFC239"/>
                  <stop offset="1" stopColor="#F1A026"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_991_10098" x1="5.36068" y1="0" x2="5.36068" y2="17.8274" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFC239"/>
                  <stop offset="1" stopColor="#F1A026"/>
                  </linearGradient>
                  </defs>
                </svg>
                <div className='flex flex-col gap-2 p-7 bg-dark-1c'>
                  <div className='text-white text-2xl flex gap-2 items-center'>
                    <span>{newBalance}</span>
                    <img src={CoinceImage} alt="CoinceImage" />
                  </div>
                  <div className='text-gray-7 text-base'>New wager requirement</div>
                </div>
              </div>
              <div className='flex justify-center gap-5 w-full [&>button]:max-w-[140px] mt-12' >
                <Button text='Confirm' submitFunction={onChangeStage} />
              </div>
            </div>
        )
      case 2:
        return (
            <div className=' flex flex-col items-center w-[700px] gap-3'>
            <h4 className='text-white uppercase  text-3xl font-medium'>Confirmation Required</h4>
            <div className='flex'>
              <p className='text-center text-gray-6 font-normal text-sm leading-5 p-2'>Are you sure you want to change the user</p>
                <UserAvatarWithName
                user={user}
                avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 '/>
            </div>
            <div className='flex flex-col gap-2 p-7 bg-dark-1c'>
              <div className='text-white text-2xl flex gap-2 items-center'>
                <span>{newBalance}</span>
                <img src={CoinceImage} alt="CoinceImage" />
              </div>
              <div className='text-gray-7 text-base'>New wager requirement</div>
            </div>
            <div className='flex justify-center gap-5 w-full [&>button]:max-w-[140px] pt-5' >
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

export default EditWagerModal
