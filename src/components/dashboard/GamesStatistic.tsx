import { useState } from 'react'
import Graph from '../base/Graph'
import AllGamesIcon from '../icons/AllGamesIcon'
import CoinFlipIcon from '../icons/CoinFlipIcon'
import JackpotIcon from '../icons/JackpotIcon'
import MinesIcon from '../icons/MinesIcon'
import PlinkoIcon from '../icons/PlinkoIcon'
import PvpMinesIcon from '../icons/PvpMinesIcon'
import UpgraderIcon from '../icons/UpgraderIcon'
import WheelIcon from '../icons/WheelIcon'

const gameModes = [
  {
    name: 'all',
    icon: <AllGamesIcon iconCalsses="h-5" />
  },
  {
    name: 'jackpot',
    icon: <JackpotIcon iconCalsses="h-5" />
  },
  {
    name: 'coin flip',
    icon: <CoinFlipIcon iconCalsses="h-5" />
  },
  {
    name: 'mines',
    icon: <MinesIcon iconCalsses="h-5" />
  },
  {
    name: 'pvp mines',
    icon: <PvpMinesIcon iconCalsses="h-5" />
  },
  {
    name: 'plinko',
    icon: <PlinkoIcon iconCalsses="h-5" />
  },
  {
    name: 'wheel',
    icon: <WheelIcon iconCalsses="h-5" />
  },
  {
    name: 'upgrader',
    icon: <UpgraderIcon iconCalsses="h-5" />
  }
]

const dataWagers = {
  name: 'Wagers',
  labels: [
    <span key="dataWagers">dataWagers</span>
  ],
  data: [
    {
      name: '14.11',
      value: [-1100],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '15.11',
      value: [500],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '16.11',
      value: [2100],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '17.11',
      value: [3000],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '18.11',
      value: [-2100],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '19.11',
      value: [1000],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    }
  ]
}

const dataProfit = {
  name: 'PROFIT',
  labels: [
    <span key="dataProfit">dataProfit</span>
  ],
  data: [
    {
      name: '14.11',
      value: [-1100],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '15.11',
      value: [500],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '16.11',
      value: [2100],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '17.11',
      value: [3000],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '18.11',
      value: [-2100],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    },
    {
      name: '19.11',
      value: [1000],
      colors: [
        {
          postitveColor: '#2E72C9',
          negativeColor: '#AF0A3B'
        }
      ]
    }
  ]
}

const GamesStatistic = ({ periodOptions, currentGame, setCurrentGame }: { periodOptions: any[], currentGame: string, setCurrentGame: Function }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(periodOptions[0])

  return (
    <div className="flex flex-col">
      <div className="p-5 flex flex-wrap justify-around gap-4 2xl:gap-10 bg-dark-171">
        {gameModes.map((item, index) => <div
            key={index}
            className={`flex flex-col cursor-pointer justify-center items-center gap-3 ${currentGame === item.name ? 'text-white' : 'text-gray-6'}`}
            onClick={() => setCurrentGame(item.name)}
          >
            <div>{item.icon}</div>
            <div className="uppercase text-sm">{item.name}</div>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between'>
        <Graph timePeriodOptions={periodOptions} currentTimePeriod={selectedPeriod} changeTimePeriod={setSelectedPeriod} data={dataWagers.data} names={[{ name: dataWagers.name, value: 1000, color: 'green' }]} labels={dataWagers.labels} />
        <Graph timePeriodOptions={periodOptions} currentTimePeriod={selectedPeriod} changeTimePeriod={setSelectedPeriod} data={dataProfit.data} names={[{ name: dataProfit.name, value: 1000, color: 'green' }]} labels={dataProfit.labels} />
      </div>
    </div>
  )
}

export default GamesStatistic
