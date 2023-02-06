import React, { FC } from 'react'
import PopupWrapper from '../base/PopupWrapper'
import UserSearch from '../users/UserSearch'

interface ISearchUsersProps {
  isOpenPopup: boolean
  closePopup: Function
}

const SearchForUsersPopup: FC<ISearchUsersProps> = ({ isOpenPopup, closePopup }) => {
  return (isOpenPopup
    ? <PopupWrapper closePopup={closePopup}>
        <div className=' flex flex-col items-center '>
          <h4 className='text-white uppercase text-3xl font-medium mb-2'>Search for users</h4>
            <UserSearch submitFn={() => { '' }} />
            <div className='flex justify-start w-full mt-5'>
               <h6 className='text-white text-base '>Select Permission</h6>
            </div>
        </div>
        </PopupWrapper>
    : null)
}

export default SearchForUsersPopup
