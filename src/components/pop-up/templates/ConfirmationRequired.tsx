import React, { FC } from 'react'
import Button from '../../base/Button'

interface IConfirmPopupProps {
  description: string
  cancelFunction: Function
  submitFunction: Function
  submitBtnLabel?: string
}

const ConfirmationRequired: FC<IConfirmPopupProps> = ({ description, cancelFunction, submitFunction, submitBtnLabel }) => {
  return (
    <div className={ 'flex flex-col items-center'}>
    <h4 className='text-white uppercase text-3xl font-medium mb-2'>Confirmation Required</h4>
    <p className="mb-12 text-gray-6">{description}</p>
    <div className='flex gap-2 w-full max-w-md'>
      <Button text='Cancel' color='default' submitFunction={cancelFunction} />
      <Button text={submitBtnLabel ?? 'Confirm'} submitFunction={submitFunction} />
    </div>
</div>
  )
}

export default ConfirmationRequired
