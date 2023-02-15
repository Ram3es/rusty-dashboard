import { FC, useEffect, useState } from 'react'
import { User } from '../../../types/User'
import Button from '../../base/Button'
import PopupWrapper from '../../base/PopupWrapper'
import UserAvatarWithName from '../../base/UserAvatarWithName'
import ConfirmationRequired from '../../pop-up/templates/ConfirmationRequired'

interface IRemovePopupProps {
  removeItem?: { user?: User, groupName: string, groupId: string }
  submitFunction: Function
}

const RemovePopup: FC<IRemovePopupProps> = ({ removeItem, submitFunction }) => {
  const [isOpenPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    removeItem && setOpenPopup(true)
  }, [removeItem])

  return (isOpenPopup
    ? <PopupWrapper closePopup={() => setOpenPopup(false)} >
        {removeItem?.user
          ? (
           <div className=' flex flex-col items-center w-[700px] '>
              <h4 className='text-white uppercase  text-3xl font-medium mb-3  '>Confirmation Required</h4>
              <div className='flex'>
                <p className='text-center text-gray-6 font-normal text-sm leading-5 p-2'>Are you sure you want to remove the user</p>
                <UserAvatarWithName
                user={removeItem?.user}
                avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 '/>
              </div>
              <p className='text-center text-gray-6 font-normal text-sm leading-5 '>from the group “{removeItem?.groupName}”</p>
              <div className='flex justify-center gap-5 w-full [&>button]:max-w-[140px] mt-12' >
                <Button text='Cancel' color='default' submitFunction={() => setOpenPopup(false)} />
                <Button text='Remove' submitFunction={submitFunction} />
              </div>
          </div>)
          : (
             <ConfirmationRequired
             description={`Are you sure you want to remove the group ${removeItem?.groupName ?? ''}`}
             cancelFunction={() => setOpenPopup(false)}
             submitFunction={submitFunction} />

            )}

          </PopupWrapper>
    : null)
}

export default RemovePopup
