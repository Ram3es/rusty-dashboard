import React, { FC, useState } from 'react'
import Button from '../../base/Button'
import InputWithLabel from '../../base/InputWithLabel'
import PopupWrapper from '../../base/PopupWrapper'

interface ISearchUsersProps {
  onGroupCreate: Function
  isPopupOpen: boolean
  onClose: Function
}

const CreateGroupPopup: FC<ISearchUsersProps> = ({ onGroupCreate, isPopupOpen, onClose }) => {
  const [groupName, setGroupName] = useState<string>('')
  const submitFunction = () => {
    if (groupName) {
      onGroupCreate(groupName)
      setGroupName('')
      onClose()
    }
  }

  const cancelConfimation = () => {
    setGroupName('')
    onClose()
  }

  return (
    isPopupOpen
      ? <PopupWrapper closePopup={() => onClose()}>
      <div className='flex flex-col items-center w-[350px]'>
        <h4 className='text-white uppercase text-2xl mb-8'>Create Grouping</h4>
        <InputWithLabel
          value={groupName}
          name="rounds"
          changeFunction={(name: any, value: string) => setGroupName(value)}
          type='text'
          placeholder='Enter group name'
        />
        <div className='mt-10 flex justify-center items-center gap-4 w-full'>
          <Button color='gray' text='Cancel' submitFunction={() => cancelConfimation()} />
          <Button text='Create' submitFunction={() => submitFunction()} />
        </div>
      </div>
    </PopupWrapper>
      : null
  )
}

export default CreateGroupPopup
