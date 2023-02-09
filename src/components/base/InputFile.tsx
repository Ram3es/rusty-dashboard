import { FC, ChangeEvent, LegacyRef } from 'react'

interface InpputFileProps {
  inputRef: LegacyRef<HTMLInputElement>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputFile: FC<InpputFileProps> = ({ inputRef, onChange }) => {
  return (
        <input
        type='file'
        id='upload-file'
        ref={inputRef}
        onChange={onChange}
        style={{ display: 'none' }}
        />
  )
}

export default InputFile
