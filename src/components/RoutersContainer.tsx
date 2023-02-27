import { useContext, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
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

const RoutersContainer = () => {
  /** @ts-expect-error */
  const [state, dispatch] = useContext(Context)
  const location = useLocation()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    user.socket?.emit('admin:connect', {}, (data: any) => {
      console.log(data, 'ADMIN CONNEC ')
      dispatch({ type: 'UPDATE', payload: data })
    })
  }, [user.socket])

  const verifyUser = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return await fetch(`${API_URLS.API_URL}/admin/verify`, {
        method: 'GET',
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          Authorization: `bearer ${user.tocken}`
        }
      })
        .then(async data => await data.json())
        .then((data) => {
          setUser((prev: any) => {
            return { ...prev, email: data.email }
          })
        })
    } catch (e) {
      setUser({})
      console.error(e)
    }
  }

  useEffect(() => {
    const verify = async () => {
      const res = await verifyUser()
      console.log('verify', res)
    }
    if (user.tocken) {
      void verify()
    }
  }, [location])

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!user.tocken) {
      return <Navigate to="/admin/login" replace />
    }
    return children
  }

  return (
    <div className={`flex flex-1 flex-col ${Object.keys(user).length > 0 ? 'pl-270px' : ''}`}>
      <main className="flex-1 min-h-screen">
        <Routes>
          <Route path="/admin/" element={<ProtectedRoute><Dashboard data={state} /></ProtectedRoute>} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/admin/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          <Route path="/admin/affiliates" element={<ProtectedRoute><Affiliates /></ProtectedRoute>} />
          <Route path="/admin/affiliates/:name" element={<ProtectedRoute><Affiliateitem /></ProtectedRoute>} />
          <Route path="/admin/bots" element={<ProtectedRoute><Bots /></ProtectedRoute>} />
          <Route path="/admin/sponsee" element={<ProtectedRoute><Sponsee /></ProtectedRoute>} />
          <Route path="/admin/game/:game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}

export default RoutersContainer
