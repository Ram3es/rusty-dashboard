import { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import ArrowIcon from '../components/icons/ArrowIcon'
import { StatisticCartItem } from '../types/StatisticCartItem'
import StatisticCart from '../components/base/StatisticCart'
import SessionIcon from '../components/icons/SessionIcon'
import UsersIcon from '../components/icons/UsersIcon'
import DepositIcon from '../components/icons/DepositIcon'
import DiceIcon from '../components/icons/DiceIcon'
import StatisticIcon from '../components/icons/StatisticIcon'
import MinesIson from '../components/icons/MinesIson'

const people = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const Dashboard = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [generalStatistic, setGeneralStatistic] = useState<StatisticCartItem[]>([])

  useEffect(() => {
    setGeneralStatistic([
      {
        icon: <SessionIcon iconCalsses='w-3' />,
        text: '62,833',
        subtext: 'Sessions',
        percent: 10.3
      },
      {
        icon: <UsersIcon iconCalsses='w-4' />,
        text: '469',
        subtext: 'New Sign Ups',
        percent: -4.2
      },
      {
        icon: <DepositIcon iconCalsses='w-5' />,
        text: '$42.23',
        subtext: 'Avg. Deposit',
        percent: 34.9
      },
      {
        icon: <DiceIcon iconCalsses='w-4' />,
        text: '3,233',
        subtext: 'Avg. Bet Amount',
        percent: 43.2,
        isCoinceValue: true
      },
      {
        icon: <StatisticIcon iconCalsses='w-4' />,
        text: '12.98%',
        subtext: 'Conversion',
        percent: 6.7
      },
      {
        icon: <MinesIson iconCalsses='w-6' />,
        text: 'Mines',
        subtext: 'Top Game'
      }
    ])
  }, [])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <div className="flex justify-between w-full mb-6">
            <h3 className="uppercase text-2xl text-white">GENERAL STATISTICS</h3>
            <div className="relative">
              <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                {({ open }) => (
                  <>
                    <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                      <span>{selectedPerson.name}</span>
                      <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                    </Listbox.Button>
                    <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded">
                      {people.map((person) => (
                        <Listbox.Option
                          className="cursor-pointer text-gray-6 hover:text-white"
                          key={person.id}
                          value={person}
                          disabled={person.unavailable}
                        >
                          {person.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <div className='flex gap-10 flex-wrap'>
              {generalStatistic.map((item, index) => <StatisticCart key={index} item={item} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
