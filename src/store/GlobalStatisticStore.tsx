import { createContext, ReactElement, useEffect, useMemo, useReducer } from 'react'
import Reducer from './GlobalStatisticReducer'
import { useUserContext } from './UserStore'

const initialState = {}

export const Context = createContext(initialState)

const Store = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  const [user] = useUserContext()

  useEffect(() => {
    if (user.isSystemConnect && Object.keys(state).length === 0) {
      user.socket?.emit('admin:connect', {}, (data: any) => {
        console.log(data, 'ADMIN CONNEC ')
        dispatch({ type: 'UPDATE', payload: data })
      })
    }
  }, [user.isSystemConnect])

  const value = useMemo(() => state, [state])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Context.Provider value={[value]}>
        {children}
    </Context.Provider>
  )
}

export default Store
