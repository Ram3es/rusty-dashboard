import CoinFlipIcon from '../icons/CoinFlipIcon'
import JackpotIcon from '../icons/JackpotIcon'
import MinesIcon from '../icons/MinesIcon'
import PlinkoIcon from '../icons/PlinkoIcon'
import PvpMinesIcon from '../icons/PvpMinesIcon'
import UpgraderIcon from '../icons/UpgraderIcon'
import WheelIcon from '../icons/WheelIcon'

const gameModes = [
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

const GamesStatistic = ({ currentGame, setCurrentGame }: { currentGame: string, setCurrentGame: Function }) => {
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
      <div>Statistic</div>
    </div>
  )
}

export default GamesStatistic