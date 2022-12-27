import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { API_URLS } from './constants'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import MenuMobile from './components/nav/MenuMobile'
import MenuDesktop from './components/nav/MenuDesktop'
import MenuIcon from './components/icons/MenuIcon'

const socket = io(API_URLS.API_URL, {
  transports: ['websocket', 'polling'],
  upgrade: true
})

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Test', href: '/test' }
]

function App (): JSX.Element {
  // const [isConnected, setIsConnected] = useState(socket.connected)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    socket.emit('admin:game:get', {}, (data: any) => {
      console.log(data, 'games')
    })
  }, [])

  return (
    <BrowserRouter>
      <MenuMobile isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navigation={navigation} />
      <MenuDesktop navigation={navigation} />
      <div className="flex flex-1 flex-col md:pl-64">
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
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
