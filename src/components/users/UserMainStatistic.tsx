import { Listbox } from '@headlessui/react'
import { useState } from 'react'
import ArrowIcon from '../icons/ArrowIcon'

const UserMainStatistic = ({ timePeriodOptions }: { timePeriodOptions: any[] }) => {
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(timePeriodOptions[0])

  return (
    <>
      <div className="flex justify-between w-full mb-6">
        <h3 className="uppercase text-2xl text-white">Statistics</h3>
        <div className="relative">
          <Listbox value={selectedGeneralStatisticPeriod} onChange={setSelectedGeneralStatisticPeriod}>
            {({ open }) => (
              <>
                <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                  <span>{selectedGeneralStatisticPeriod.name}</span>
                  <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                </Listbox.Button>
                <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded">
                  {timePeriodOptions.map((option) => (
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
      {/* <div className='flex gap-10 flex-wrap justify-between'>
          {generalStatistic.map((item, index) => <StatisticCart key={index} item={item} />)}
      </div> */}
    </>
  )
}

export default UserMainStatistic
