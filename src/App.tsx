import { useEffect, useState } from 'react'
import socket from './Middleware/socket'
import { BrowserRouter } from 'react-router-dom'
import MenuDesktop from './components/nav/MenuDesktop'
import DashboardIcon from './components/icons/DashboardIcon'
import UsersIcon from './components/icons/UsersIcon'
import { User } from './types/User'
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

const navigation = [
  { name: 'Home', href: '/admin/', icon: <DashboardIcon iconCalsses='w-4 h-4' /> },
  { name: 'Users', href: '/admin/users', icon: <UsersIcon iconCalsses='h-4' /> },
  { name: 'Staff', href: '/admin/staff', icon: <StaffIcon iconCalsses='w-4' /> },
  { name: 'Affiliates', href: '/admin/affiliates', icon: <AffiliatesIcon iconCalsses='w-4' /> },
  { name: 'Bots', href: '/admin/bots', icon: <BotsIcon iconCalsses='w-4' /> },
  { name: 'Sponsee', href: '/admin/sponsee', icon: <SponseeIcon iconCalsses='w-4' /> },
  {
    name: 'Games',
    icon: <GamesIcon iconCalsses='w-4' />,
    subNavigation: [
      { name: 'Jackpot', href: '/admin/game/jackpot', icon: <JackpotIcon iconCalsses='w-4' /> },
      { name: 'Coinflip', href: '/admin/game/coinflip', icon: <CoinFlipIcon iconCalsses='w-4' /> },
      { name: 'Mines', href: '/admin/game/mines', icon: <MinesIcon iconCalsses='w-4' /> },
      { name: 'PVP Mines', href: '/admin/game/pvp-mines', icon: <PvpMinesIcon iconCalsses='w-4' /> },
      { name: 'Plinko', href: '/admin/game/plinko', icon: <PlinkoIcon iconCalsses='w-4' /> },
      { name: 'Wheel', href: '/admin/game/wheel', icon: <WheelIcon iconCalsses='w-4' /> },
      { name: 'Upgrader', href: '/admin/game/upgrader', icon: <UpgraderIcon iconCalsses='w-4' /> }
    ]
  }
]

function App (): JSX.Element {
  const [user, setUser] = useState<User>({
    name: 'Some user',
    email: 'test@test.test',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  })

  useEffect(() => {
    socket.on('system:connect', (data: { error: boolean, user: { data: any } }) => {
      console.log(data, 'system CONNEC ')
      if (!data.error) {
        setUser({
          name: data.user.data.username,
          avatar: data.user.data.avatar
        })
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <MenuDesktop navigation={navigation} user={user} />
      <div className="flex flex-1 flex-col md:pl-270px">
        <main className="flex-1 min-h-screen">
          <Store>
            <RoutersContainer socket={socket} />
          </Store>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
