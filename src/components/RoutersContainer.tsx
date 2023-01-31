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
        <Route path="/" element={<Dashboard data={state} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/affiliates/:name" element={<Affiliateitem />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/sponsee" element={<Sponsee />} />
      </Routes>
    </>
  )
}

export default RoutersContainer
