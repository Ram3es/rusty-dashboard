import { useEffect, useState } from 'react'
import socket from './Middleware/socket'
import { BrowserRouter } from 'react-router-dom'
import MenuMobile from './components/nav/MenuMobile'
import MenuDesktop from './components/nav/MenuDesktop'
import MenuIcon from './components/icons/MenuIcon'
import DashboardIcon from './components/icons/DashboardIcon'
import UsersIcon from './components/icons/UsersIcon'
import { User } from './types/User'
import RoutersContainer from './components/RoutersContainer'
import Store from './store/GlobalStatisticStore'
import StaffIcon from './components/icons/StaffIcon'
import AffiliatesIcon from './components/icons/AffiliatesIcon'
import BotsIcon from './components/icons/BotsIcon'
import SponseeIcon from './components/icons/SponseeIcon'

const navigation = [
  { name: 'Home', href: '/admin/', icon: <DashboardIcon iconCalsses='w-4 h-4' /> },
  { name: 'Users', href: '/admin/users', icon: <UsersIcon iconCalsses='h-4' /> },
  { name: 'Staff', href: '/admin/staff', icon: <StaffIcon iconCalsses='w-4' /> },
  { name: 'Affiliates', href: '/admin/affiliates', icon: <AffiliatesIcon iconCalsses='w-4' /> },
  { name: 'Bots', href: '/admin/bots', icon: <BotsIcon iconCalsses='w-4' /> },
  { name: 'Sponsee', href: '/admin/sponsee', icon: <SponseeIcon iconCalsses='w-4' /> }
]

function App (): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
      <MenuMobile isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navigation={navigation} />
      <MenuDesktop navigation={navigation} user={user} />
      <div className="flex flex-1 flex-col md:pl-270px">
        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon />
          </button>
        </div>
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
