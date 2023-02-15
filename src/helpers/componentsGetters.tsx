import CoinFlipIcon from '../components/icons/CoinFlipIcon'
import JackpotIcon from '../components/icons/JackpotIcon'
import MinesIcon from '../components/icons/MinesIcon'
import PlinkoIcon from '../components/icons/PlinkoIcon'
import PvpMinesIcon from '../components/icons/PvpMinesIcon'
import UpgraderIcon from '../components/icons/UpgraderIcon'
import WheelIcon from '../components/icons/WheelIcon'

export const getGameIcon = (mode: string | undefined) => {
  switch (mode) {
    case 'coinflip':
      return <CoinFlipIcon iconCalsses='w-6' />
    case 'jackpot':
      return <JackpotIcon iconCalsses='w-6' />
    case 'mines':
      return <MinesIcon iconCalsses='w-6' />
    case 'plinko':
      return <PlinkoIcon iconCalsses='w-6' />
    case 'pvp-mines':
      return <PvpMinesIcon iconCalsses='w-6' />
    case 'upgrader':
      return <UpgraderIcon iconCalsses='w-6' />
    case 'wheel':
      return <WheelIcon iconCalsses='w-6' />
    default:
      return undefined
  }
}
