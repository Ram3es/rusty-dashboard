import { HashRouter } from 'react-router-dom'
import MenuDesktop from './components/nav/MenuDesktop'
import DashboardIcon from './components/icons/DashboardIcon'
import UsersIcon from './components/icons/UsersIcon'
import RoutersContainer from './components/RoutersContainer'
import Store from './store/GlobalStatisticStore'
import StaffIcon from './components/icons/StaffIcon'
import AffiliatesIcon from './components/icons/AffiliatesIcon'
import BotsIcon from './components/icons/BotsIcon'
import SponseeIcon from './components/icons/SponseeIcon'
import GamesIcon from './components/icons/GamesIcon'
import JackpotIcon from './components/icons/JackpotIcon'
import CoinFlipIcon from './components/icons/CoinFlipIcon'
import MinesIcon from './components/icons/MinesIcon'
import PvpMinesIcon from './components/icons/PvpMinesIcon'
import PlinkoIcon from './components/icons/PlinkoIcon'
import WheelIcon from './components/icons/WheelIcon'
import UpgraderIcon from './components/icons/UpgraderIcon'
import UserStore from './store/UserStore'

const navigation = [
  { name: 'Home', href: '/', icon: <DashboardIcon iconCalsses='w-4 h-4' /> },
  { name: 'Users', href: '/users', icon: <UsersIcon iconCalsses='h-4' /> },
  { name: 'Staff', href: '/staff', icon: <StaffIcon iconCalsses='w-4' /> },
  { name: 'Affiliates', href: '/affiliates', icon: <AffiliatesIcon iconCalsses='w-4' /> },
  { name: 'Bots', href: '/bots', icon: <BotsIcon iconCalsses='w-4' /> },
  { name: 'Sponsee', href: '/sponsee', icon: <SponseeIcon iconCalsses='w-4' /> },
  {
    name: 'Games',
    icon: <GamesIcon iconCalsses='w-4' />,
    subNavigation: [
      { name: 'Jackpot', href: '/game/jackpot', icon: <JackpotIcon iconCalsses='w-4' /> },
      { name: 'Coinflip', href: '/game/coinflip', icon: <CoinFlipIcon iconCalsses='w-4' /> },
      { name: 'Mines', href: '/game/mines', icon: <MinesIcon iconCalsses='w-4' /> },
      { name: 'PVP Mines', href: '/game/pvp-mines', icon: <PvpMinesIcon iconCalsses='w-4' /> },
      { name: 'Plinko', href: '/game/plinko', icon: <PlinkoIcon iconCalsses='w-4' /> },
      { name: 'Wheel', href: '/game/wheel', icon: <WheelIcon iconCalsses='w-4' /> },
      { name: 'Upgrader', href: '/game/upgrader', icon: <UpgraderIcon iconCalsses='w-4' /> }
    ]
  }
]

function App (): JSX.Element {
  return (
    <HashRouter>
      <UserStore>
        <>
          <MenuDesktop navigation={navigation} />
          <Store>
            <RoutersContainer />
          </Store>
        </>
      </UserStore>
    </HashRouter>
  )
}

export default App
