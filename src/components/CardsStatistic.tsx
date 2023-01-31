import { Listbox } from '@headlessui/react'
import { StatisticCartItem } from '../types/StatisticCartItem'
import { TimeOption } from '../types/TimeOption'

import StatisticCart from './base/StatisticCart'
import ArrowIcon from './icons/ArrowIcon'

const CardsStatistic = ({ title, periodOptions, selectedPeriod, changePeriod, items }: { title: string, periodOptions: TimeOption[], selectedPeriod: TimeOption, changePeriod: any, items: StatisticCartItem[] }) => {
  return (
    <>
      <div className="flex justify-between w-full mb-6">
        <h3 className="uppercase text-2xl text-white">{title}</h3>
        <div className="relative">
          <Listbox value={selectedPeriod} onChange={changePeriod}>
            {({ open }) => (
              <>
                <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                  <span>{selectedPeriod.name}</span>
                  <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                </Listbox.Button>
                <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded">
                  {periodOptions.map((option) => (
                    <Listbox.Option
                      className="cursor-pointer text-gray-6 hover:text-white"
                      key={option.id}
                      value={option}
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
      </div>
      <div className='flex gap-10 flex-wrap justify-between'>
          {items.map((item, index) => <StatisticCart key={index} item={item} />)}
      </div>
    </>
  )
}

export default CardsStatistic
