import { FC, ChangeEvent, useRef } from 'react'
import Button from './Button'

interface InpputFileProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputFile: FC<InpputFileProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const uploadFile = () => {
    inputRef?.current?.click()
  }
  return (
    <span className='py-2'>
      <Button text='Select' color='default' submitFunction={uploadFile} />
      <input
        id='upload-file'
        type='file'
        ref={inputRef}
        onChange={onChange}
        style={{ display: 'none' }}
      />
    </span>
  )
}

export default InputFile
