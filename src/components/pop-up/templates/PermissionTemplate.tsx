import React, { FC, useState } from 'react'

import { User } from '../../../types/User'
import InputWithLabel from '../../base/InputWithLabel'
import UserAvatarWithName from '../../base/UserAvatarWithName'
import 'react-tooltip/dist/react-tooltip.css'
import ButtonsToggle from '../../base/ButtonsToggle'
import Button from '../../base/Button'
import QuestionMarkRounded from '../../icons/QuestionMarkRounded'
import TooltipElement from '../../base/TooltipWrapper'
import Divider from '../../base/Divider'

interface ICheckBoxState {
  dashboard: boolean
  staff: boolean
  bots: boolean
  games: boolean
  users: boolean
}

interface IPermissionProps {
  user?: User
  title: string
  isEdit?: boolean
  submitFunction: Function
  togglePopup: Function
  popupClasses?: string
}

const label = ['Dashboard', 'Staff', 'Bots', 'Games', 'Users']
const options = ['View Access', 'Edit Access']

const PermissionTemplate: FC<IPermissionProps> = ({ title, isEdit, user, submitFunction, togglePopup, popupClasses }) => {
  const [isChecked, setChecked] = useState<ICheckBoxState>({ dashboard: false, staff: true, bots: true, games: false, users: false })
  const [currentSelected, setCurrentSelect] = useState(options[0])

  const handleCheckBox = (name: string, isChecked: boolean) => {
    setChecked(prev => ({ ...prev, [name]: isChecked }))
  }

  return (
        <div className={popupClasses ?? 'flex flex-col items-center w-[400px] '}>
        <h4 className='text-white uppercase text-3xl font-medium mb-2'>{title}</h4>
        <p className='text-center text-gray-6 font-normal text-sm leading-5 px-10'>Select the pages which this user can view as well as their permissions</p>
        {isEdit
          ? (
          <div className='flex items-center pt-5'>
            <UserAvatarWithName user={user} isBorderShown avatarClasses='flex gap-2 items-center text-base font-semibold text-gray-6 pl-3' />
          </div>)
          : (
            <Divider
            progressClasses='absolute h-[100%] w-2/3 left-0' />
            )}

        <h6 className='text-white text-base  mt-8'>Pages</h6>
        <div className='grid grid-cols-2 gap-x-[120px] gap-y-4 mt-2' >
          {label.map((item) => {
            const key = item.toLowerCase() as keyof ICheckBoxState
            return (
                <InputWithLabel
                 key={key}
                 name={key}
                 type='checkbox'
                 labelClasses={`flex flex-row-reverse justify-end items-center w-full ${isChecked[key] ? 'text-white' : 'text-gray-6'} `}
                 inputClasses='px-3 py-2  accent-yellow-f rounded text-white w-5 h-5 mr-2 '
                 label={item}
                 value={isChecked[key]}
                 changeFunction={ handleCheckBox }/>)
          })}
        </div>
          <TooltipElement anchorId='tooltip-permission' >
            <p className='text-gray-8 text-sm'>View Access only allows the user to view pages but not edit anything. Edit access allows the user to view the page and edit it.</p>
          </TooltipElement>
        <div className='flex items-center mt-3 gap-2' >
          <h6 className='text-white text-base '>Permissions</h6>
          <QuestionMarkRounded tooltipId='tooltip-permission' />
        </div>
        <div className='mt-3'>
          <span className='text-gray-500 text-xs'>Tab Bar AutoWidth</span>
        <ButtonsToggle options={options} currentSelect={currentSelected} peackFunction={setCurrentSelect} />
        </div>
        <div className='flex w-[80%] gap-5 mt-6' >
        <Button text='Cancel' color='default' submitFunction={togglePopup} />
        <Button text='Confirm' submitFunction={() => { submitFunction(); togglePopup() }} />
        </div>
      </div>
  )
}

export default PermissionTemplate
