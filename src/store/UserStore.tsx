import { createContext, ReactElement, useContext, useState } from 'react'

const token = sessionStorage.getItem('token')
const initialState: any = { token }

const UserContext = createContext(initialState)

const UserStore = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState(initialState)

  return (
    <UserContext.Provider value={[user, setUser]}>
        {children}
    </UserContext.Provider>
  )
}

export default UserStore

export const useUserContext = () => useContext(UserContext)
