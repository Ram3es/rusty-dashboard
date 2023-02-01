import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Affiliateitem from '../routes/Affiliate/Affiliateitem'
import Affiliates from '../routes/Affiliate/Affiliates'
import Bots from '../routes/Bots'
import Dashboard from '../routes/Dashboard'
import Sponsee from '../routes/Sponsee'
import Staff from '../routes/Staff'
import Users from '../routes/Users'
import { Context } from '../store/GlobalStatisticStore'

const RoutersContainer = ({ socket }: { socket: any }) => {
  /** @ts-expect-error */
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    console.log('socket', socket)
    socket.emit('admin:connect', {}, (data: any) => {
      console.log(data, 'ADMIN CONNEC ')
      dispatch({ type: 'UPDATE', payload: data })
    })

    console.log(state)
  }, [])

  return (
    <>
      <Routes>
        <Route path="/admin/" element={<Dashboard data={state} />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/staff" element={<Staff />} />
        <Route path="/admin/affiliates" element={<Affiliates />} />
        <Route path="/admin/affiliates/:name" element={<Affiliateitem />} />
        <Route path="/admin/bots" element={<Bots />} />
        <Route path="/admin/sponsee" element={<Sponsee />} />
      </Routes>
    </>
  )
}

export default RoutersContainer
