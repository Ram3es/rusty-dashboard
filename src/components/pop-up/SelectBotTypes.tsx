import { FC, useEffect, useState } from 'react'
import { Bot } from '../../types/Bot'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import PopupWrapper from '../base/PopupWrapper'
import ConfirmationRequired from './templates/ConfirmationRequired'

interface IBotPopup {
  bot: Bot | undefined
  onClose: Function
  updateBot: Function
}

const typesOfBot = ['Mule', 'Jackpot', 'Coinflip', 'Vault']

const SelectBotType: FC<IBotPopup> = ({ bot, onClose, updateBot }) => {
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false)
  const [pushBotPopupStage, setPushBotStage] = useState<number>(1)
  const [selectedTypeOfBot, setSelected] = useState<string>()

  const closePopup = () => {
    setOpenPopup(false)
    setPushBotStage(1)
    onClose()
  }

  const onChange = (name: string) => setSelected(name)
  const cancelConfirm = () => setPushBotStage(1)

  const submitFunction = () => {
    updateBot({ ...bot, type: selectedTypeOfBot })
    closePopup()
    setPushBotStage(1)
  }
  useEffect(() => {
    setSelected(typesOfBot[0])
  }, [isOpenPopup])

  useEffect(() => {
    bot && setOpenPopup(true)
  }, [bot])

  const getStagedPopup = () => {
    switch (pushBotPopupStage) {
      case 1:
        return (
        <div className={ 'flex flex-col items-center'}>
           <h4 className='text-white uppercase text-3xl font-medium mb-2'>Pushing a bot</h4>
           <p className="mb-8 text-gray-6 text-center w-[430px] ">Before pushing the bot “{bot?.user?.name}” to be an active bot please select the type of bot “{bot?.user?.name}” should be.</p>
           <h6 className='text-white text-base'>Type of bot</h6>
           <div className='py-6'>
               {typesOfBot.map(item => {
                 return (
                   <InputWithLabel
                     key={item}
                     type='radio'
                     name={item}
                     label={item}
                     labelClasses={`flex flex-row-reverse justify-end items-center w-full mb-3 ${selectedTypeOfBot === item ? 'text-white' : 'text-gray-6'} `}
                     inputClasses='px-3 py-4 accent-yellow-f rounded text-white w-5 h-5 mr-3'
                     value={item === selectedTypeOfBot}
                     changeFunction={onChange}
                      />)
               })}
           </div>
           <div className='flex gap-2 w-full max-w-md mt-4'>
               <Button text='Cancel' color='default' submitFunction={closePopup} />
               <Button text='Push' submitFunction={() => { setPushBotStage(2); setSelected(selectedTypeOfBot) }} />
             </div>
         </div>)
      case 2:
        return (
        <ConfirmationRequired
          description={`Are you sure you want to push the bot “${bot?.user?.name ?? ''}” which is a “${selectedTypeOfBot ?? ''}” to the active bots?`}
          cancelFunction={cancelConfirm}
          submitFunction={submitFunction} />
        )
    }
  }
  return (isOpenPopup
    ? <PopupWrapper closePopup={closePopup}>
        { bot?.type !== 'N/A'
          ? (
          <ConfirmationRequired
            cancelFunction={cancelConfirm}
            submitFunction={submitFunction}
            description={`Are you sure you want to push the bot “${bot?.user?.name ?? ''}” which is a “${bot?.type ?? ''}”to the reserve bots? `}
           />
            )
          : getStagedPopup()}
       {}
     </PopupWrapper>
    : null)
}

export default SelectBotType
