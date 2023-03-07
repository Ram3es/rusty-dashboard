import { useContext, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import { API_URLS } from '../constants'
import Affiliateitem from '../routes/Affiliate/Affiliateitem'
import Affiliates from '../routes/Affiliate/Affiliates'
import Bots from '../routes/Bots'
import Dashboard from '../routes/Dashboard'
import Game from '../routes/Games/Game'
import Sponsee from '../routes/Sponsee'
import Staff from '../routes/Staff'
import Users from '../routes/Users'
import { Context } from '../store/GlobalStatisticStore'
import { useUserContext } from '../store/UserStore'
import Login from './login/Login'

let wasSocketCreated = false

const RoutersContainer = () => {
  /** @ts-expect-error */
  const [state, dispatch] = useContext(Context)
  const [user, setUser] = useUserContext()
  const location = useLocation()

  useEffect(() => {
    if (user.isSystemConnect && Object.keys(state).length === 0) {
      user.socket?.emit('admin:connect', {}, (data: any) => {
        console.log(data, 'ADMIN CONNEC ')
        dispatch({ type: 'UPDATE', payload: data })
      })
    }
  }, [user.isSystemConnect])

  const verifyUser = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return await fetch(`${API_URLS.API_URL}/admin/verify`, {
        method: 'GET',
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          Authorization: `bearer ${user.token}`
        }
      })
        .then(async data => await data.json())
        .then((data) => {
          if (!user.email && !wasSocketCreated && user.token) {
            console.log('user', user)
            wasSocketCreated = true
            setUser((prev: any) => {
              return {
                ...prev,
                email: data.email,
                socket: io(API_URLS.API_URL, {
                  path: '/dashboard',
                  transports: ['websocket', 'polling'],
                  upgrade: true,
                  auth: {
                    token: user.token
                  }
                })
              }
            })
          }
        })
    } catch (e) {
      setUser({})
      console.error(e)
    }
  }

  const verify = async () => {
    await verifyUser()
    console.log('verify')
  }

  useEffect(() => {
    void verify()
  }, [location])

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (user.token) {
      return children
    } else {
      return <Navigate to="/login" replace />
    }
  }

  return (
    <div className={`flex flex-1 flex-col ${user.token ? 'pl-270px' : ''}`}>
      <main className="flex-1 min-h-screen">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard data={state} /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          <Route path="/affiliates" element={<ProtectedRoute><Affiliates /></ProtectedRoute>} />
          <Route path="/affiliates/:name" element={<ProtectedRoute><Affiliateitem /></ProtectedRoute>} />
          <Route path="/bots" element={<ProtectedRoute><Bots /></ProtectedRoute>} />
          <Route path="/sponsee" element={<ProtectedRoute><Sponsee /></ProtectedRoute>} />
          <Route path="/game/:game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default RoutersContainer
