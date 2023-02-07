import { useState } from 'react'
import Button from '../base/Button'
import ButtonsToggle from '../base/ButtonsToggle'
import InputWithLabel from '../base/InputWithLabel'

const searchOptions = ['Discord', 'Username', 'UID', 'Steam-64']

const UserSearch = ({ submitFn }: { submitFn: Function }) => {
  const [userSearchParametr, setUserSearchParametr] = useState<Record<string, string>>({})
  const [currentSearchSelect, setCurrentSearchSelect] = useState<string>(searchOptions[0])

  const searchParametrsUpdate = (name: string, value: string) => {
    setUserSearchParametr(() => {
      const parametr: Record<string, any> = {}
      parametr[name.toLocaleLowerCase()] = value
      return parametr
    })
  }

  return (
    <>
      <div className='flex gap-5'>
        <ButtonsToggle
          options={searchOptions}
          currentSelect={currentSearchSelect}
          peackFunction={setCurrentSearchSelect}
        />
        <div className='grow relative'>
          <InputWithLabel
            type="text"
            name={currentSearchSelect.toLowerCase()}
            placeholder={currentSearchSelect}
            value={userSearchParametr[currentSearchSelect.toLocaleLowerCase()] ?? ''}
            changeFunction={searchParametrsUpdate}
          />
          <svg className='absolute right-2 top-1/2 transform -translate-y-2/3 z-20' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 0C10.4777 0 13.5 3.02232 13.5 6.75C13.5 8.30982 12.9662 9.74138 12.0774 10.8844L17.7525 16.5594C17.9173 16.7243 18 16.9397 18 17.1562C18 17.3722 17.9173 17.5882 17.7525 17.7531C17.5882 17.9179 17.3723 18 17.1562 18C16.9402 18 16.7242 17.9179 16.56 17.7531L10.8844 12.0774C9.74138 12.9662 8.30979 13.5 6.75 13.5C3.02232 13.5 0 10.4777 0 6.75C0 3.02232 3.02232 0 6.75 0ZM6.75 11.8125C9.54168 11.8125 11.8125 9.54168 11.8125 6.75C11.8125 3.95832 9.54168 1.6875 6.75 1.6875C3.95832 1.6875 1.6875 3.95832 1.6875 6.75C1.6875 9.54168 3.95832 11.8125 6.75 11.8125Z" fill="#666E97"/>
          </svg>
        </div>
        <div className='w-44'>
          <Button text='Show Results' submitFunction={() => submitFn(userSearchParametr)} />
        </div>
      </div>
    </>
  )
}

export default UserSearch
