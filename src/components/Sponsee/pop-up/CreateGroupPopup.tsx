import React, { FC, useState } from 'react'
import Button from '../../base/Button'
import InputWithLabel from '../../base/InputWithLabel'
import PopupWrapper from '../../base/PopupWrapper'

interface ISearchUsersProps {
  onGroupCreate: Function
  isPopupOpen: boolean
}

const CreateGroupPopup: FC<ISearchUsersProps> = ({ onGroupCreate, isPopupOpen }) => {
  const [groupName, setGroupName] = useState<string>('')
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState<boolean>(isPopupOpen)

  const submitFunction = () => {
    setGroupName('')
    onGroupCreate(groupName)
    setIsCreateGroupOpen(false)
  }

  const cancelConfimation = () => {
    setGroupName('')
    onGroupCreate(groupName)
  }

  return (
    isCreateGroupOpen
      ? <PopupWrapper closePopup={() => setIsCreateGroupOpen(false)}>
      <div>
        <h4 className='text-white uppercase text-2xl mb-4'>Create Grouping</h4>
        <InputWithLabel
          value={groupName}
          name="rounds"
          changeFunction={(name: any, value: string) => setGroupName(value)}
          type='text'
          placeholder='Enter group name'
        />
        <div className='mt-10 flex justify-center items-center gap-4'>
          <Button color='gray' text='Cancel' submitFunction={() => cancelConfimation()} />
          <Button text='Create' submitFunction={() => submitFunction()} />
        </div>
      </div>
    </PopupWrapper>
      : null
  )
}

export default CreateGroupPopup
