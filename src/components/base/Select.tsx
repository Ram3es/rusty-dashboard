import { Listbox } from '@headlessui/react'
import { FC, useEffect, useState } from 'react'
import { TimeOption } from '../../types/TimeOption'
import ArrowIcon from '../icons/ArrowIcon'

interface ISelectProps {
  options?: TimeOption[]
  selectedOption?: string
  onChange: Function
}
const timePeriodOptions: TimeOption[] = [
  { id: 1, name: 'Day', unavailable: false },
  { id: 2, name: 'This Week', unavailable: false },
  { id: 3, name: 'This Month', unavailable: false }
]

const Select: FC<ISelectProps> = ({ options = timePeriodOptions, selectedOption, onChange }) => {
  const [selected, setSelected] = useState<string>(selectedOption ?? options[0].name)

  useEffect(() => onChange(selected), [selected])

  return (
        <div className='relative'>
        <Listbox value={selected} onChange={(option) => setSelected(option) }>
          {({ open }) => (
            <>
              <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                <span>{selected}</span>
                <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
              </Listbox.Button>
              <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded z-20">
                {options.map((option) => (
                  <Listbox.Option
                    className="cursor-pointer text-gray-6 hover:text-white"
                    key={option.id}
                    value={option.name}
                    disabled={option.unavailable}
                  >
                    {option.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          )}
        </Listbox>
      </div>
  )
}
export default Select
