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

export const getLabelsArray = (mode: string | undefined) => {
  switch (mode) {
    case 'coinflip':
      return [
        <span key="dataCoinflip">Coinflip</span>
      ]
    case 'jackpot':
      return [
        <span key="dataJackpot">Jackpot</span>
      ]
    case 'mines':
      return [
        <span key="dataMines">Mines</span>
      ]
    case 'plinko':
      return [
        <span key="dataPlinko">Plinko</span>
      ]
    case 'pvp-mines':
      return [
        <span key="dataPvpMines">Pvp-Mines</span>
      ]
    case 'upgrader':
      return [
        <span key="dataUpgrader">Upgrader</span>
      ]
    case 'wheel':
      return [
        <span key="dataWheel">Wheel</span>
      ]
    case 'all':
      return [
        <span key="dataCoinflip">Coinflip</span>,
        <span key="dataJackpot">Jackpot</span>,
        <span key="dataMines">Mines</span>,
        <span key="dataPlinko">Plinko</span>,
        <span key="dataPvpMines">Pvp-Mines</span>,
        <span key="dataUpgrader">Upgrader</span>,
        <span key="dataWheel">Wheel</span>
      ]
  }
}

export const getColorsArray = (mode: string | undefined) => {
  switch (mode) {
    case 'coinflip':
      return [
        {
          postitveColor: '#5F13AC',
          negativeColor: '#AF0A3B'
        }
      ]
    case 'jackpot':
      return [
        {
          postitveColor: '#3791D4',
          negativeColor: '#AF0A3B'
        }
      ]
    case 'mines':
      return [
        {
          postitveColor: '#EA174B',
          negativeColor: '#AF0A3B'
        }
      ]
    case 'plinko':
      return [
        {
          postitveColor: '#C737D4',
          negativeColor: '#AF0A3B'
        }
      ]
    case 'pvp-mines':
      return [
        {
          postitveColor: '#80EA17',
          negativeColor: '#AF0A3B'
        }
      ]
    case 'upgrader':
      return [
        {
          postitveColor: '#FA9F14',
          negativeColor: '#AF0A3B'
        }
      ]
    case 'wheel':
      return [
        {
          postitveColor: '#364BD1',
          negativeColor: '#AF0A3B'
        }
      ]
    case 'all':
      return [
        {
          postitveColor: '#5F13AC',
          negativeColor: '#5F13AC'
        },
        {
          postitveColor: '#3791D4',
          negativeColor: '#3791D4'
        },
        {
          postitveColor: '#EA174B',
          negativeColor: '#EA174B'
        },
        {
          postitveColor: '#C737D4',
          negativeColor: '#C737D4'
        },
        {
          postitveColor: '#80EA17',
          negativeColor: '#80EA17'
        },
        {
          postitveColor: '#FA9F14',
          negativeColor: '#FA9F14'
        },
        {
          postitveColor: '#364BD1',
          negativeColor: '#364BD1'
        }
      ]
  }
}

export const getGameIndex = (mode: string | undefined, gamePeack: string | undefined): number => {
  if (mode !== 'all') {
    return 0
  } else {
    switch (gamePeack) {
      case 'coinflip':
        return 0
      case 'jackpot':
        return 1
      case 'mines':
        return 2
      case 'plinko':
        return 3
      case 'pvp-mines':
        return 4
      case 'upgrader':
        return 5
      case 'wheel':
        return 6
      default:
        return 0
    }
  }
}
