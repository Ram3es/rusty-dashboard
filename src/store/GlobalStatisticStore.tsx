import { createContext, ReactElement, useReducer } from 'react'
import Reducer from './GlobalStatisticReducer'

const initialState = {
  data: {}
}

export const Context = createContext(initialState)

const Store = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Context.Provider value={[state, dispatch]}>
        {children}
    </Context.Provider>
  )
}

export default Store
