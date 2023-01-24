import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../routes/Dashboard'
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
      </Routes>
    </>
  )
}

export default RoutersContainer
