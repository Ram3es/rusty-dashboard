import { ChangeEvent, useRef, useState } from 'react'
import Button from '../base/Button'
import InputFile from '../base/InputFile'
import InputWithLabel from '../base/InputWithLabel'

const inputsLabel = [
  { label: 'Username', placeholder: 'Account Username' },
  { label: 'Password', placeholder: 'Account Password' },
  { label: 'Proxy', placeholder: 'Proxy' },
  { label: 'Port', placeholder: 'Port' },
  { label: 'User', placeholder: 'Proxy Username' },
  { label: 'Proxy-Password', placeholder: 'Proxy Password' }
]

const initState = inputsLabel.reduce((state: Record<string, string>, item) => {
  state[item.label.toLocaleLowerCase()] = ''
  return state
}, {})

const AddBotsForm = () => {
  const [inputsValue, setInputsValue] = useState(initState)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onChange = (name: string, value: string) => {
    setInputsValue(state => ({ ...state, [name]: value }))
  }

  const onChangeInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event?.target?.files?.[0]
    console.log(fileUploaded)
  }

  const uploadFile = () => {
    console.log(inputRef?.current)
    inputRef?.current?.click()
  }

  const submitFunction = () => {
    if (Object.values(inputsValue).every(val => Boolean(val))) {
      setInputsValue(initState)
      console.log(inputsValue, 'inputsValue')
    }
  }
  return (
     <div className='col-span-6 py-8 px-16 bg-dark-1 rounded-lg '>
     <h4 className='text-white uppercase text-2xl mb-6'>Add bots</h4>
     <div className='grid 2xl:grid-cols-8 lg:grid-cols-3 md:grid-cols-2  gap-4'>
         {inputsLabel.map(({ label, placeholder }) => {
           const name = label.toLowerCase()
           return (
          <div className='col-span-1' key={label}>
           <InputWithLabel
             type='text'
             name={name}
             label={label}
             placeholder={placeholder}
             inputClasses='px-3 py-2 bg-dark-17 rounded text-sm text-white h-11 mt-2 w-full'
             value={inputsValue[name]}
             changeFunction={onChange} />
             </div>
           )
         }) }
          <div className='col-span-1 flex flex-col'>
           <span className=' text-gray-6 text-xs mb-2'>.Ma File</span>
           <Button text='Select' color='default' submitFunction={uploadFile} />
        </div>
        <div className='col-span-1 flex flex-col pt-6'>
            <Button text='Create' submitFunction={submitFunction} />
        </div>
     </div>
        <InputFile inputRef={inputRef} onChange={onChangeInputFile} />
   </div>
  )
}
export default AddBotsForm
