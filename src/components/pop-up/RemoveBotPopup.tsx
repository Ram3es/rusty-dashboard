import { FC, useEffect, useState } from 'react'
import PopupWrapper from '../base/PopupWrapper'
import { Bot } from '../../types/Bot'
import Button from '../base/Button'
interface IRemoveBotPrpops {
  bot?: Bot
  onClose: Function
}

const RemoveBotPopup: FC<IRemoveBotPrpops> = ({ bot, onClose }) => {
  const [isOpenPopup, setOpenPopup] = useState(false)

  const closePopup = () => {
    setOpenPopup(false)
    onClose()
  }

  useEffect(() => {
    bot && setOpenPopup(true)
  }, [bot])

  return (isOpenPopup
    ? <PopupWrapper closePopup={closePopup}>
        <div className={ 'flex flex-col items-center'}>
          <h4 className='text-white uppercase text-3xl font-medium mb-2'>Confirmation Required</h4>
          <p className="mb-12 text-gray-6">Are you sure you want to remove and permanently delete the bot “{bot?.user.name}” which is a “{bot?.type}”?</p>
          <div className='flex gap-2 w-full max-w-md'>
            <Button text='Cancel' color='default' submitFunction={() => closePopup()} />
            <Button text='Delete' submitFunction={() => { console.log('remove', bot) }} />
          </div>
        </div>
      </PopupWrapper>
    : null
  )
}

export default RemoveBotPopup
